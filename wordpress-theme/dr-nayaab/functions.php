<?php
/**
 * Dr. Nayaab theme functions.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'DR_NAYAAB_VERSION', '1.0' );

/* -------------------------------------------------------------------------
 * Theme setup
 * ---------------------------------------------------------------------- */
function dr_nayaab_setup() {
	load_theme_textdomain( 'dr-nayaab', get_template_directory() . '/languages' );

	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'automatic-feed-links' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'align-wide' );
	add_theme_support( 'custom-logo', array(
		'height'      => 120,
		'width'       => 400,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script' ) );

	register_nav_menus( array(
		'primary'      => __( 'Primary Navigation', 'dr-nayaab' ),
		'footer_pages' => __( 'Footer — Company', 'dr-nayaab' ),
		'footer_legal' => __( 'Footer — Legal', 'dr-nayaab' ),
	) );

	add_image_size( 'dr-nayaab-card', 800, 500, true );
	add_image_size( 'dr-nayaab-product', 900, 900, false );
}
add_action( 'after_setup_theme', 'dr_nayaab_setup' );

function dr_nayaab_content_width() {
	$GLOBALS['content_width'] = 1320;
}
add_action( 'after_setup_theme', 'dr_nayaab_content_width', 0 );

/* -------------------------------------------------------------------------
 * Assets
 * ---------------------------------------------------------------------- */
function dr_nayaab_assets() {
	wp_enqueue_style(
		'dr-nayaab-fonts',
		'https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap',
		array(),
		null
	);
	wp_enqueue_style( 'dr-nayaab-theme', get_template_directory_uri() . '/assets/css/theme.css', array(), DR_NAYAAB_VERSION );
	wp_enqueue_style( 'dr-nayaab-style', get_stylesheet_uri(), array( 'dr-nayaab-theme' ), DR_NAYAAB_VERSION );

	wp_enqueue_script( 'dr-nayaab-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), DR_NAYAAB_VERSION, true );
	wp_localize_script( 'dr-nayaab-theme', 'drNayaab', array(
		'whatsapp'        => dr_nayaab_option( 'whatsapp_url', 'https://wa.me/919998569923' ),
		'whatsappMessage' => dr_nayaab_option( 'whatsapp_message', 'Hello Dr. Nayaab team, I would like to enquire about your pharmaceutical products and business partnership opportunities.' ),
	) );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'dr_nayaab_assets' );

/* -------------------------------------------------------------------------
 * Includes
 * ---------------------------------------------------------------------- */
require_once get_template_directory() . '/inc/template-tags.php';
require_once get_template_directory() . '/inc/post-types.php';
require_once get_template_directory() . '/inc/meta-boxes.php';
require_once get_template_directory() . '/inc/customizer.php';
require_once get_template_directory() . '/inc/enquiry.php';
require_once get_template_directory() . '/inc/seo.php';
require_once get_template_directory() . '/inc/setup-wizard.php';

/* -------------------------------------------------------------------------
 * Options helper — Customizer first, safe defaults second.
 * Works with or without Advanced Custom Fields (ACF is NOT required).
 * ---------------------------------------------------------------------- */
function dr_nayaab_option( $key, $default = '' ) {
	$value = get_theme_mod( 'dr_nayaab_' . $key, null );
	if ( null === $value || '' === $value ) {
		return $default;
	}
	return $value;
}

/* -------------------------------------------------------------------------
 * Widgets
 * ---------------------------------------------------------------------- */
function dr_nayaab_widgets() {
	register_sidebar( array(
		'name'          => __( 'Footer Contact Column', 'dr-nayaab' ),
		'id'            => 'footer-contact',
		'description'   => __( 'Optional extra content shown in the footer contact column.', 'dr-nayaab' ),
		'before_widget' => '<div class="footer-widget %2$s">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
	) );
}
add_action( 'widgets_init', 'dr_nayaab_widgets' );

/* -------------------------------------------------------------------------
 * Excerpt
 * ---------------------------------------------------------------------- */
function dr_nayaab_excerpt_length() {
	return 28;
}
add_filter( 'excerpt_length', 'dr_nayaab_excerpt_length' );

function dr_nayaab_excerpt_more() {
	return '&hellip;';
}
add_filter( 'excerpt_more', 'dr_nayaab_excerpt_more' );

/* -------------------------------------------------------------------------
 * WooCommerce (optional) — catalogue-only mode.
 * The theme works perfectly without WooCommerce; when it is active we strip
 * every shop behaviour so the site stays strictly B2B.
 * ---------------------------------------------------------------------- */
function dr_nayaab_woocommerce_support() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}
	add_theme_support( 'woocommerce' );
	add_theme_support( 'wc-product-gallery-zoom' );
	add_theme_support( 'wc-product-gallery-lightbox' );
	add_theme_support( 'wc-product-gallery-slider' );
}
add_action( 'after_setup_theme', 'dr_nayaab_woocommerce_support' );

function dr_nayaab_woocommerce_catalogue_only() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		return;
	}
	// Remove prices everywhere.
	add_filter( 'woocommerce_get_price_html', '__return_empty_string' );
	add_filter( 'woocommerce_product_is_visible', '__return_true' );
	remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );
	remove_action( 'woocommerce_after_shop_loop_item_title', 'woocommerce_template_loop_price', 10 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
	remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_rating', 10 );
	remove_action( 'woocommerce_after_single_product_summary', 'woocommerce_output_product_data_tabs', 10 );
	// Replace buying actions with the enquiry action.
	add_action( 'woocommerce_single_product_summary', 'dr_nayaab_wc_enquiry_actions', 30 );
	add_action( 'woocommerce_after_shop_loop_item', 'dr_nayaab_wc_enquiry_actions', 10 );
	// Disable cart, checkout and purchasing entirely.
	add_filter( 'woocommerce_is_purchasable', '__return_false' );
	add_filter( 'woocommerce_add_to_cart_validation', '__return_false' );
	add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
	add_filter( 'woocommerce_product_tabs', '__return_empty_array' );
	add_filter( 'wc_get_template', 'dr_nayaab_block_wc_cart_templates', 10, 2 );
}
add_action( 'init', 'dr_nayaab_woocommerce_catalogue_only' );

function dr_nayaab_block_wc_cart_templates( $template, $template_name ) {
	$blocked = array( 'cart/cart.php', 'checkout/form-checkout.php', 'cart/mini-cart.php' );
	if ( in_array( $template_name, $blocked, true ) ) {
		return get_template_directory() . '/template-parts/wc-disabled.php';
	}
	return $template;
}

function dr_nayaab_wc_enquiry_actions() {
	global $product;
	if ( ! $product ) {
		return;
	}
	dr_nayaab_enquiry_buttons(
		$product->get_id(),
		$product->get_name(),
		'',
		wp_get_attachment_image_url( $product->get_image_id(), 'thumbnail' )
	);
}

/* -------------------------------------------------------------------------
 * Performance: lazy loading and clean head
 * ---------------------------------------------------------------------- */
add_filter( 'wp_lazy_loading_enabled', '__return_true' );
remove_action( 'wp_head', 'wp_generator' );
remove_action( 'wp_head', 'wlwmanifest_link' );
remove_action( 'wp_head', 'rsd_link' );

function dr_nayaab_body_classes( $classes ) {
	if ( ! is_singular() ) {
		$classes[] = 'hfeed';
	}
	return $classes;
}
add_filter( 'body_class', 'dr_nayaab_body_classes' );
