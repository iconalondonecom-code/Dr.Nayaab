<?php
/**
 * Customizer — every major homepage section, contact detail and footer string
 * is editable from Appearance → Customize → Dr. Nayaab.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_customizer_fields() {
	return array(
		'brand' => array(
			'title'  => __( 'Brand & Contact', 'dr-nayaab' ),
			'fields' => array(
				'tagline_line'     => array( 'label' => __( 'Brand tagline', 'dr-nayaab' ), 'default' => 'Dr. Nayaab — Committed to Care' ),
				'email'            => array( 'label' => __( 'Email', 'dr-nayaab' ), 'default' => 'contact@ronak.global' ),
				'phone'            => array( 'label' => __( 'Phone / WhatsApp', 'dr-nayaab' ), 'default' => '+91 99985 69923' ),
				'whatsapp_url'     => array( 'label' => __( 'WhatsApp link', 'dr-nayaab' ), 'default' => 'https://wa.me/919998569923' ),
				'whatsapp_message' => array( 'label' => __( 'Default WhatsApp message', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Hello Dr. Nayaab team, I would like to enquire about your pharmaceutical products and business partnership opportunities.' ),
				'address'          => array( 'label' => __( 'Address', 'dr-nayaab' ), 'type' => 'textarea', 'default' => "Ronak Group Building\nGotri Road\nNext to Nilgiri Terrace\nGadapura, Hari Nagar\nVadodara, Gujarat 390021\nIndia" ),
				'parent_name'      => array( 'label' => __( 'Parent company', 'dr-nayaab' ), 'default' => 'Ronak Group' ),
				'parent_url'       => array( 'label' => __( 'Parent company website', 'dr-nayaab' ), 'default' => 'https://ronak.global' ),
				'enquiry_email'    => array( 'label' => __( 'Enquiry destination email', 'dr-nayaab' ), 'default' => 'contact@ronak.global' ),
			),
		),
		'hero' => array(
			'title'  => __( 'Homepage — Hero', 'dr-nayaab' ),
			'fields' => array(
				'hero_label'         => array( 'label' => __( 'Hero label', 'dr-nayaab' ), 'default' => 'Dr. Nayaab — Committed to Care' ),
				'hero_heading'       => array( 'label' => __( 'Hero headline', 'dr-nayaab' ), 'default' => 'Healthcare Solutions for Global Markets' ),
				'hero_highlight'     => array( 'label' => __( 'Words highlighted in red', 'dr-nayaab' ), 'default' => 'Global Markets' ),
				'hero_text'          => array( 'label' => __( 'Hero paragraph', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Explore the Dr. Nayaab pharmaceutical portfolio and connect with our team for international business, distribution and product enquiries.' ),
				'hero_btn1_label'    => array( 'label' => __( 'Primary button label', 'dr-nayaab' ), 'default' => 'Explore Products' ),
				'hero_btn1_url'      => array( 'label' => __( 'Primary button URL', 'dr-nayaab' ), 'default' => '/products/' ),
				'hero_btn2_label'    => array( 'label' => __( 'Secondary button label', 'dr-nayaab' ), 'default' => 'Business Enquiry' ),
				'hero_btn2_url'      => array( 'label' => __( 'Secondary button URL', 'dr-nayaab' ), 'default' => '/contact/' ),
				'hero_btn3_label'    => array( 'label' => __( 'Text link label', 'dr-nayaab' ), 'default' => 'Become a Distributor' ),
				'hero_btn3_url'      => array( 'label' => __( 'Text link URL', 'dr-nayaab' ), 'default' => '/global-business/' ),
				'hero_image'         => array( 'label' => __( 'Hero image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
			),
		),
		'trust' => array(
			'title'  => __( 'Homepage — Trust Strip', 'dr-nayaab' ),
			'fields' => array(
				'trust1_title' => array( 'label' => __( 'Item 1 title', 'dr-nayaab' ), 'default' => 'Backed by Ronak Group' ),
				'trust1_text'  => array( 'label' => __( 'Item 1 text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Dr. Nayaab is the pharmaceutical brand of Ronak Group, an established international trading group.' ),
				'trust2_title' => array( 'label' => __( 'Item 2 title', 'dr-nayaab' ), 'default' => 'Consistent Presentation' ),
				'trust2_text'  => array( 'label' => __( 'Item 2 text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'A coherent artwork system across suspensions, syrups, tablets and nutritional care ranges.' ),
				'trust3_title' => array( 'label' => __( 'Item 3 title', 'dr-nayaab' ), 'default' => 'Built for Distributors' ),
				'trust3_text'  => array( 'label' => __( 'Item 3 text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Pack presentations and portfolio structure designed for importers, wholesalers and institutional buyers.' ),
				'trust4_title' => array( 'label' => __( 'Item 4 title', 'dr-nayaab' ), 'default' => 'Direct Business Contact' ),
				'trust4_text'  => array( 'label' => __( 'Item 4 text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Speak with our team by email or WhatsApp — no intermediaries, no consumer sales.' ),
			),
		),
		'sections' => array(
			'title'  => __( 'Homepage — Sections', 'dr-nayaab' ),
			'fields' => array(
				'cats_heading'      => array( 'label' => __( 'Categories heading', 'dr-nayaab' ), 'default' => 'Product Categories' ),
				'cats_text'         => array( 'label' => __( 'Categories intro', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Explore the Dr. Nayaab portfolio by dosage form and care range.' ),
				'featured_heading'  => array( 'label' => __( 'Featured products heading', 'dr-nayaab' ), 'default' => 'From the Portfolio' ),
				'featured_text'     => array( 'label' => __( 'Featured products intro', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'A selection of current Dr. Nayaab pack presentations. Add products to your enquiry list as you browse.' ),
				'featured_count'    => array( 'label' => __( 'Number of featured products', 'dr-nayaab' ), 'default' => '8' ),
				'quality_heading'   => array( 'label' => __( 'Quality heading', 'dr-nayaab' ), 'default' => 'Quality and Precision in Every Pack' ),
				'quality_text'      => array( 'label' => __( 'Quality text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Every Dr. Nayaab presentation follows one artwork discipline: clear product identification, readable strength and dosage form, and packaging built for international distribution.' ),
				'quality_image'     => array( 'label' => __( 'Quality image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
				'global_heading'    => array( 'label' => __( 'Global business heading', 'dr-nayaab' ), 'default' => 'Global Business & Distribution' ),
				'global_text'       => array( 'label' => __( 'Global business text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'We work with importers, distributors, wholesalers and institutional buyers who need a dependable pharmaceutical supply partner.' ),
				'global_image'      => array( 'label' => __( 'Global business image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
				'partner_heading'   => array( 'label' => __( 'Partnership heading', 'dr-nayaab' ), 'default' => 'Business Partnerships' ),
				'partner_text'      => array( 'label' => __( 'Partnership text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Long-term distribution relationships built on clear communication, consistent presentation and responsive business support.' ),
				'partner_image'     => array( 'label' => __( 'Partnership image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
				'ronak_heading'     => array( 'label' => __( 'Ronak Group heading', 'dr-nayaab' ), 'default' => 'Backed by Ronak Group' ),
				'ronak_text'        => array( 'label' => __( 'Ronak Group text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Dr. Nayaab is the pharmaceutical brand of Ronak Group, operating from Vadodara, India, with international business experience across multiple markets.' ),
				'ronak_image'       => array( 'label' => __( 'Ronak Group image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
				'insights_heading'  => array( 'label' => __( 'Insights heading', 'dr-nayaab' ), 'default' => 'Insights' ),
				'insights_text'     => array( 'label' => __( 'Insights intro', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Notes on pharmaceutical distribution, portfolio planning and international business.' ),
				'cta_heading'       => array( 'label' => __( 'Enquiry CTA heading', 'dr-nayaab' ), 'default' => 'Start a Business Enquiry' ),
				'cta_text'          => array( 'label' => __( 'Enquiry CTA text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Tell us about your market and requirements. Our team responds to business, distribution and product enquiries directly.' ),
				'cta_image'         => array( 'label' => __( 'Enquiry CTA background', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
			),
		),
		'footer' => array(
			'title'  => __( 'Footer & Social', 'dr-nayaab' ),
			'fields' => array(
				'footer_text'      => array( 'label' => __( 'Footer intro text', 'dr-nayaab' ), 'type' => 'textarea', 'default' => 'Dr. Nayaab is the pharmaceutical brand of Ronak Group. This website presents our portfolio for business enquiries only — no products are sold online.' ),
				'footer_image'     => array( 'label' => __( 'Footer background image', 'dr-nayaab' ), 'type' => 'image', 'default' => '' ),
				'footer_copyright' => array( 'label' => __( 'Copyright line', 'dr-nayaab' ), 'default' => 'Dr. Nayaab — a brand of Ronak Group. All rights reserved.' ),
				'social_linkedin'  => array( 'label' => __( 'LinkedIn URL', 'dr-nayaab' ), 'default' => '' ),
				'social_facebook'  => array( 'label' => __( 'Facebook URL', 'dr-nayaab' ), 'default' => '' ),
				'social_instagram' => array( 'label' => __( 'Instagram URL', 'dr-nayaab' ), 'default' => '' ),
				'social_x'         => array( 'label' => __( 'X / Twitter URL', 'dr-nayaab' ), 'default' => '' ),
			),
		),
	);
}

function dr_nayaab_customize_register( $wp_customize ) {
	$wp_customize->add_panel( 'dr_nayaab_panel', array(
		'title'    => __( 'Dr. Nayaab', 'dr-nayaab' ),
		'priority' => 20,
	) );

	foreach ( dr_nayaab_customizer_fields() as $section_id => $section ) {
		$wp_customize->add_section( 'dr_nayaab_' . $section_id, array(
			'title' => $section['title'],
			'panel' => 'dr_nayaab_panel',
		) );

		foreach ( $section['fields'] as $key => $field ) {
			$type     = isset( $field['type'] ) ? $field['type'] : 'text';
			$setting  = 'dr_nayaab_' . $key;
			$sanitize = 'image' === $type ? 'esc_url_raw' : ( 'textarea' === $type ? 'sanitize_textarea_field' : 'sanitize_text_field' );

			$wp_customize->add_setting( $setting, array(
				'default'           => $field['default'],
				'sanitize_callback' => $sanitize,
				'transport'         => 'refresh',
			) );

			if ( 'image' === $type ) {
				$wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, $setting, array(
					'label'   => $field['label'],
					'section' => 'dr_nayaab_' . $section_id,
				) ) );
			} else {
				$wp_customize->add_control( $setting, array(
					'label'   => $field['label'],
					'section' => 'dr_nayaab_' . $section_id,
					'type'    => 'textarea' === $type ? 'textarea' : 'text',
				) );
			}
		}
	}
}
add_action( 'customize_register', 'dr_nayaab_customize_register' );
