<?php
/**
 * Products custom post type + product categories taxonomy.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_register_products() {
	register_post_type( 'dn_product', array(
		'labels'             => array(
			'name'               => __( 'Products', 'dr-nayaab' ),
			'singular_name'      => __( 'Product', 'dr-nayaab' ),
			'add_new_item'       => __( 'Add New Product', 'dr-nayaab' ),
			'edit_item'          => __( 'Edit Product', 'dr-nayaab' ),
			'new_item'           => __( 'New Product', 'dr-nayaab' ),
			'view_item'          => __( 'View Product', 'dr-nayaab' ),
			'search_items'       => __( 'Search Products', 'dr-nayaab' ),
			'not_found'          => __( 'No products found', 'dr-nayaab' ),
			'all_items'          => __( 'All Products', 'dr-nayaab' ),
			'menu_name'          => __( 'Products', 'dr-nayaab' ),
		),
		'public'             => true,
		'has_archive'        => 'products',
		'rewrite'            => array( 'slug' => 'products', 'with_front' => false ),
		'menu_icon'          => 'dashicons-products',
		'menu_position'      => 5,
		'supports'           => array( 'title', 'editor', 'excerpt', 'thumbnail', 'revisions', 'page-attributes' ),
		'show_in_rest'       => true,
		'publicly_queryable' => true,
	) );

	register_taxonomy( 'dn_product_cat', array( 'dn_product' ), array(
		'labels'            => array(
			'name'          => __( 'Product Categories', 'dr-nayaab' ),
			'singular_name' => __( 'Product Category', 'dr-nayaab' ),
			'add_new_item'  => __( 'Add New Product Category', 'dr-nayaab' ),
			'menu_name'     => __( 'Categories', 'dr-nayaab' ),
		),
		'hierarchical'      => true,
		'public'            => true,
		'show_admin_column' => true,
		'show_in_rest'      => true,
		'rewrite'           => array( 'slug' => 'product-category', 'with_front' => false ),
	) );
}
add_action( 'init', 'dr_nayaab_register_products' );

/**
 * Flush rewrite rules once after activation so product URLs work immediately.
 */
function dr_nayaab_maybe_flush_rewrites() {
	if ( get_option( 'dr_nayaab_rewrites_flushed' ) !== DR_NAYAAB_VERSION ) {
		dr_nayaab_register_products();
		flush_rewrite_rules();
		update_option( 'dr_nayaab_rewrites_flushed', DR_NAYAAB_VERSION );
	}
}
add_action( 'after_switch_theme', 'dr_nayaab_maybe_flush_rewrites' );
add_action( 'init', 'dr_nayaab_maybe_flush_rewrites', 99 );

/**
 * Hide empty product categories from theme listings.
 */
function dr_nayaab_visible_product_categories() {
	$terms = get_terms( array(
		'taxonomy'   => 'dn_product_cat',
		'hide_empty' => true,
	) );
	if ( is_wp_error( $terms ) ) {
		return array();
	}
	return $terms;
}
