<?php
/**
 * SEO compatibility. Yoast SEO / Rank Math stay in control whenever active;
 * the theme only fills the gaps when no SEO plugin is installed.
 * Structured data never includes prices, offers, ratings or reviews.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_seo_plugin_active() {
	return defined( 'WPSEO_VERSION' ) || class_exists( 'RankMath' ) || defined( 'RANK_MATH_VERSION' );
}

function dr_nayaab_meta_description() {
	if ( is_singular() ) {
		$post = get_queried_object();
		$text = has_excerpt( $post ) ? get_the_excerpt( $post ) : wp_trim_words( wp_strip_all_tags( $post->post_content ), 28, '…' );
		if ( $text ) {
			return $text;
		}
	}
	if ( is_tax() || is_category() ) {
		$desc = term_description();
		if ( $desc ) {
			return wp_strip_all_tags( $desc );
		}
	}
	return get_bloginfo( 'description' ) ? get_bloginfo( 'description' ) : 'Dr. Nayaab pharmaceutical products for international business, distribution and product enquiries. A brand of Ronak Group.';
}

/** Basic description + Open Graph, only without an SEO plugin. */
function dr_nayaab_head_meta() {
	if ( dr_nayaab_seo_plugin_active() ) {
		return;
	}
	$desc  = dr_nayaab_meta_description();
	$title = wp_get_document_title();
	$url   = is_singular() ? get_permalink() : home_url( add_query_arg( array() ) );
	$image = is_singular() && has_post_thumbnail() ? get_the_post_thumbnail_url( null, 'large' ) : dr_nayaab_asset( 'dr-nayaab-02-product-portfolio-desktop.png' );
	$type  = is_singular( 'post' ) ? 'article' : 'website';
	printf( "<meta name=\"description\" content=\"%s\">\n", esc_attr( $desc ) );
	printf( "<meta property=\"og:site_name\" content=\"%s\">\n", esc_attr( get_bloginfo( 'name' ) ) );
	printf( "<meta property=\"og:title\" content=\"%s\">\n", esc_attr( $title ) );
	printf( "<meta property=\"og:description\" content=\"%s\">\n", esc_attr( $desc ) );
	printf( "<meta property=\"og:type\" content=\"%s\">\n", esc_attr( $type ) );
	printf( "<meta property=\"og:url\" content=\"%s\">\n", esc_url( $url ) );
	printf( "<meta property=\"og:image\" content=\"%s\">\n", esc_url( $image ) );
	echo "<meta name=\"twitter:card\" content=\"summary_large_image\">\n";
}
add_action( 'wp_head', 'dr_nayaab_head_meta', 2 );

function dr_nayaab_json_ld( $data ) {
	echo '<script type="application/ld+json">' . wp_json_encode( $data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE ) . "</script>\n";
}

function dr_nayaab_schema() {
	$plugin = dr_nayaab_seo_plugin_active();

	// Organization + Breadcrumbs: SEO plugins already output these.
	if ( ! $plugin ) {
		if ( is_front_page() ) {
			dr_nayaab_json_ld( array(
				'@context'      => 'https://schema.org',
				'@type'         => 'Organization',
				'name'          => 'Dr. Nayaab',
				'slogan'        => 'Committed to Care',
				'url'           => home_url( '/' ),
				'logo'          => dr_nayaab_asset( 'dr-nayaab-logo.png' ),
				'email'         => dr_nayaab_option( 'email', 'contact@ronak.global' ),
				'telephone'     => dr_nayaab_option( 'phone', '+91 99985 69923' ),
				'parentOrganization' => array(
					'@type' => 'Organization',
					'name'  => dr_nayaab_option( 'parent_name', 'Ronak Group' ),
					'url'   => dr_nayaab_option( 'parent_url', 'https://ronak.global' ),
				),
				'address'       => array(
					'@type'           => 'PostalAddress',
					'streetAddress'   => 'Ronak Group Building, Gotri Road, Next to Nilgiri Terrace, Gadapura, Hari Nagar',
					'addressLocality' => 'Vadodara',
					'addressRegion'   => 'Gujarat',
					'postalCode'      => '390021',
					'addressCountry'  => 'IN',
				),
			) );
		}
		$trail = dr_nayaab_breadcrumb_trail();
		if ( count( $trail ) > 1 ) {
			$items = array();
			foreach ( $trail as $i => $crumb ) {
				$items[] = array( '@type' => 'ListItem', 'position' => $i + 1, 'name' => wp_strip_all_tags( $crumb['name'] ), 'item' => $crumb['url'] );
			}
			dr_nayaab_json_ld( array( '@context' => 'https://schema.org', '@type' => 'BreadcrumbList', 'itemListElement' => $items ) );
		}
		if ( is_singular( 'post' ) ) {
			dr_nayaab_json_ld( array(
				'@context'      => 'https://schema.org',
				'@type'         => 'BlogPosting',
				'headline'      => get_the_title(),
				'description'   => get_the_excerpt(),
				'datePublished' => get_the_date( 'c' ),
				'dateModified'  => get_the_modified_date( 'c' ),
				'image'         => get_the_post_thumbnail_url( null, 'large' ),
				'mainEntityOfPage' => get_permalink(),
				'author'        => array( '@type' => 'Organization', 'name' => 'Dr. Nayaab' ),
				'publisher'     => array( '@type' => 'Organization', 'name' => 'Dr. Nayaab', 'logo' => array( '@type' => 'ImageObject', 'url' => dr_nayaab_asset( 'dr-nayaab-logo.png' ) ) ),
			) );
		}
	}

	// Product: plugins do not output this for a custom post type. No offers/ratings.
	if ( is_singular( 'dn_product' ) ) {
		$id     = get_the_ID();
		$meta   = dr_nayaab_product_meta( $id );
		$images = array();
		foreach ( dr_nayaab_product_images( $id ) as $img ) {
			$images[] = wp_get_attachment_image_url( $img, 'full' );
		}
		$terms = dr_nayaab_product_terms( $id );
		dr_nayaab_json_ld( array_filter( array(
			'@context'    => 'https://schema.org',
			'@type'       => 'Product',
			'name'        => get_the_title(),
			'url'         => get_permalink(),
			'image'       => $images,
			'description' => wp_strip_all_tags( get_the_excerpt() ),
			'category'    => $terms ? $terms[0]->name : '',
			'brand'       => array( '@type' => 'Brand', 'name' => 'Dr. Nayaab' ),
			'additionalProperty' => array_values( array_filter( array(
				$meta['strength'] ? array( '@type' => 'PropertyValue', 'name' => 'Strength', 'value' => $meta['strength'] ) : null,
				$meta['form'] ? array( '@type' => 'PropertyValue', 'name' => 'Dosage form', 'value' => $meta['form'] ) : null,
				$meta['pack_size'] ? array( '@type' => 'PropertyValue', 'name' => 'Pack size', 'value' => $meta['pack_size'] ) : null,
			) ) ),
		) ) );
	}
}
add_action( 'wp_head', 'dr_nayaab_schema', 20 );
