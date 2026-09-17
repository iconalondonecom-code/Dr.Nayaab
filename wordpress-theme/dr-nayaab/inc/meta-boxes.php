<?php
/**
 * Product detail fields — native WordPress meta boxes (no plugin required).
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_product_fields() {
	return array(
		'_dn_strength'  => __( 'Strength', 'dr-nayaab' ),
		'_dn_form'      => __( 'Dosage Form', 'dr-nayaab' ),
		'_dn_pack_size' => __( 'Pack Size', 'dr-nayaab' ),
		'_dn_variants'  => __( 'Pack Variants Note', 'dr-nayaab' ),
	);
}

function dr_nayaab_add_meta_boxes() {
	add_meta_box(
		'dr_nayaab_product_details',
		__( 'Product Details', 'dr-nayaab' ),
		'dr_nayaab_product_details_box',
		'dn_product',
		'normal',
		'high'
	);
	add_meta_box(
		'dr_nayaab_product_gallery',
		__( 'Product Gallery', 'dr-nayaab' ),
		'dr_nayaab_product_gallery_box',
		'dn_product',
		'side',
		'default'
	);
}
add_action( 'add_meta_boxes', 'dr_nayaab_add_meta_boxes' );

function dr_nayaab_product_details_box( $post ) {
	wp_nonce_field( 'dr_nayaab_save_product', 'dr_nayaab_product_nonce' );
	echo '<table class="form-table"><tbody>';
	foreach ( dr_nayaab_product_fields() as $key => $label ) {
		$value = get_post_meta( $post->ID, $key, true );
		printf(
			'<tr><th><label for="%1$s">%2$s</label></th><td><input type="text" class="regular-text" id="%1$s" name="%1$s" value="%3$s"></td></tr>',
			esc_attr( $key ),
			esc_html( $label ),
			esc_attr( $value )
		);
	}
	echo '</tbody></table>';
	echo '<p class="description">' . esc_html__( 'Only enter information that is verified on the approved artwork. Never add prices, claims or approvals.', 'dr-nayaab' ) . '</p>';
}

function dr_nayaab_product_gallery_box( $post ) {
	$ids = get_post_meta( $post->ID, '_dn_gallery', true );
	echo '<p><label for="_dn_gallery">' . esc_html__( 'Media Library image IDs, comma separated. Leave empty to show the featured image only.', 'dr-nayaab' ) . '</label></p>';
	printf(
		'<input type="text" class="widefat" id="_dn_gallery" name="_dn_gallery" value="%s">',
		esc_attr( is_string( $ids ) ? $ids : '' )
	);
	echo '<p class="description">' . esc_html__( 'Find an image ID in Media Library → the item URL (item=123).', 'dr-nayaab' ) . '</p>';
}

function dr_nayaab_save_product( $post_id ) {
	if ( ! isset( $_POST['dr_nayaab_product_nonce'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['dr_nayaab_product_nonce'] ) ), 'dr_nayaab_save_product' ) ) {
		return;
	}
	if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
		return;
	}
	if ( ! current_user_can( 'edit_post', $post_id ) ) {
		return;
	}

	foreach ( array_keys( dr_nayaab_product_fields() ) as $key ) {
		$value = isset( $_POST[ $key ] ) ? sanitize_text_field( wp_unslash( $_POST[ $key ] ) ) : '';
		if ( '' === $value ) {
			delete_post_meta( $post_id, $key );
		} else {
			update_post_meta( $post_id, $key, $value );
		}
	}

	$gallery = isset( $_POST['_dn_gallery'] ) ? sanitize_text_field( wp_unslash( $_POST['_dn_gallery'] ) ) : '';
	$gallery = implode( ',', array_filter( array_map( 'absint', explode( ',', $gallery ) ) ) );
	update_post_meta( $post_id, '_dn_gallery', $gallery );
}
add_action( 'save_post_dn_product', 'dr_nayaab_save_product' );
