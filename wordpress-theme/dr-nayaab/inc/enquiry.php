<?php
/**
 * Secure enquiry form handling: nonce, sanitisation, validation, honeypot,
 * simple rate limiting and wp_mail delivery with honest success/error states.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_business_types() {
	return array(
		'Importer',
		'Distributor',
		'Wholesaler',
		'Institutional Buyer',
		'Retail / Pharmacy Business',
		'Healthcare Business',
		'Other',
	);
}

function dr_nayaab_enquiry_state() {
	static $state = null;
	if ( null !== $state ) {
		return $state;
	}
	$state = array(
		'status'  => '',
		'message' => '',
		'errors'  => array(),
		'values'  => array(),
	);
	return $state;
}

/**
 * Handle the POST before anything is rendered.
 */
function dr_nayaab_handle_enquiry() {
	if ( empty( $_POST['dn_enquiry_submit'] ) ) {
		return;
	}

	$state  = &dr_nayaab_enquiry_state();
	$errors = array();

	if ( ! isset( $_POST['dn_enquiry_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dn_enquiry_nonce'] ) ), 'dn_enquiry' ) ) {
		$state['status']  = 'error';
		$state['message'] = __( 'Your session expired. Please reload the page and send the enquiry again.', 'dr-nayaab' );
		return;
	}

	// Honeypot — silently accept but never send.
	if ( ! empty( $_POST['dn_website'] ) ) {
		$state['status']  = 'error';
		$state['message'] = __( 'This enquiry could not be verified. Please try again.', 'dr-nayaab' );
		return;
	}

	// Simple rate limit: one enquiry per IP per 60 seconds.
	$ip  = isset( $_SERVER['REMOTE_ADDR'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REMOTE_ADDR'] ) ) : 'unknown';
	$key = 'dn_enq_' . md5( $ip );
	if ( get_transient( $key ) ) {
		$state['status']  = 'error';
		$state['message'] = __( 'You have just sent an enquiry. Please wait a moment before sending another.', 'dr-nayaab' );
		return;
	}

	$fields = array(
		'name'     => 'sanitize_text_field',
		'company'  => 'sanitize_text_field',
		'email'    => 'sanitize_email',
		'phone'    => 'sanitize_text_field',
		'country'  => 'sanitize_text_field',
		'type'     => 'sanitize_text_field',
		'products' => 'sanitize_textarea_field',
		'message'  => 'sanitize_textarea_field',
		'subject'  => 'sanitize_text_field',
	);
	$values = array();
	foreach ( $fields as $field => $callback ) {
		$raw               = isset( $_POST[ 'dn_' . $field ] ) ? wp_unslash( $_POST[ 'dn_' . $field ] ) : '';
		$values[ $field ]  = call_user_func( $callback, $raw );
	}
	$state['values'] = $values;

	$limits = array( 'name' => 100, 'company' => 120, 'email' => 255, 'phone' => 32, 'country' => 80, 'products' => 600, 'message' => 1500 );
	foreach ( $limits as $field => $max ) {
		if ( mb_strlen( $values[ $field ] ) > $max ) {
			$errors[ $field ] = sprintf( __( 'Please keep this under %d characters.', 'dr-nayaab' ), $max );
		}
	}

	if ( '' === trim( $values['name'] ) ) {
		$errors['name'] = __( 'Please enter your full name.', 'dr-nayaab' );
	}
	if ( '' === trim( $values['email'] ) || ! is_email( $values['email'] ) ) {
		$errors['email'] = __( 'Please enter a valid business email address.', 'dr-nayaab' );
	}
	if ( '' !== $values['phone'] && ! preg_match( '/^[0-9+\-\s()]{6,32}$/', $values['phone'] ) ) {
		$errors['phone'] = __( 'Please enter a valid phone number.', 'dr-nayaab' );
	}
	if ( ! in_array( $values['type'], dr_nayaab_business_types(), true ) ) {
		$errors['type'] = __( 'Please select your business type.', 'dr-nayaab' );
	}
	if ( '' === trim( $values['message'] ) ) {
		$errors['message'] = __( 'Please tell us briefly about your requirement.', 'dr-nayaab' );
	}

	if ( $errors ) {
		$state['status'] = 'error';
		$state['errors'] = $errors;
		$state['message'] = __( 'Please correct the highlighted fields and send the enquiry again.', 'dr-nayaab' );
		return;
	}

	$to      = sanitize_email( dr_nayaab_option( 'enquiry_email', 'contact@ronak.global' ) );
	$subject = sprintf( '[Dr. Nayaab] %s', $values['subject'] ? $values['subject'] : __( 'Business Enquiry', 'dr-nayaab' ) );
	$lines   = array(
		__( 'A new enquiry was submitted on the Dr. Nayaab website.', 'dr-nayaab' ),
		'',
		'Name: ' . $values['name'],
		'Company: ' . $values['company'],
		'Email: ' . $values['email'],
		'Phone / WhatsApp: ' . $values['phone'],
		'Country: ' . $values['country'],
		'Business type: ' . $values['type'],
		'Products of interest: ' . $values['products'],
		'',
		'Message:',
		$values['message'],
		'',
		'Sent from: ' . esc_url_raw( home_url( add_query_arg( array() ) ) ),
	);

	$headers = array(
		'Content-Type: text/plain; charset=UTF-8',
		'Reply-To: ' . $values['name'] . ' <' . $values['email'] . '>',
	);

	$sent = wp_mail( $to, $subject, implode( "\n", $lines ), $headers );

	// Always store the enquiry so nothing is lost if email delivery fails.
	$post_id = wp_insert_post( array(
		'post_type'   => 'dn_enquiry',
		'post_status' => 'publish',
		'post_title'  => $values['name'] . ' — ' . ( $values['company'] ? $values['company'] : $values['country'] ),
		'post_content' => implode( "\n", $lines ),
	) );
	if ( $post_id && ! is_wp_error( $post_id ) ) {
		update_post_meta( $post_id, '_dn_mail_sent', $sent ? 'yes' : 'no' );
	}

	set_transient( $key, 1, 60 );

	if ( $sent ) {
		$state['status']  = 'success';
		$state['message'] = __( 'Thank you. Your enquiry has been sent to our business team and we will respond by email.', 'dr-nayaab' );
		$state['values']  = array();
	} else {
		$state['status']  = 'error';
		$state['message'] = sprintf(
			/* translators: %s: email address */
			__( 'Your enquiry was saved in WordPress but email delivery is not configured on this site, so it was not emailed. Please install an SMTP plugin, or write to %s directly.', 'dr-nayaab' ),
			dr_nayaab_option( 'email', 'contact@ronak.global' )
		);
	}
}
add_action( 'template_redirect', 'dr_nayaab_handle_enquiry' );

/**
 * Store received enquiries privately in the admin.
 */
function dr_nayaab_register_enquiry_cpt() {
	register_post_type( 'dn_enquiry', array(
		'labels'          => array(
			'name'          => __( 'Enquiries', 'dr-nayaab' ),
			'singular_name' => __( 'Enquiry', 'dr-nayaab' ),
			'menu_name'     => __( 'Enquiries', 'dr-nayaab' ),
		),
		'public'          => false,
		'show_ui'         => true,
		'show_in_menu'    => true,
		'menu_icon'       => 'dashicons-email-alt',
		'capability_type' => 'post',
		'capabilities'    => array( 'create_posts' => 'do_not_allow' ),
		'map_meta_cap'    => true,
		'supports'        => array( 'title', 'editor' ),
	) );
}
add_action( 'init', 'dr_nayaab_register_enquiry_cpt' );
