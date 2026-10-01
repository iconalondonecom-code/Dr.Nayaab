<?php
/**
 * One-click content setup: imports the bundled approved images into the
 * Media Library and creates products, categories, pages, Insights posts and
 * menus. Runs from Appearance → Dr. Nayaab Setup. Safe to run more than once
 * (existing items are skipped, nothing is overwritten).
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function dr_nayaab_setup_menu() {
	add_theme_page( __( 'Dr. Nayaab Setup', 'dr-nayaab' ), __( 'Dr. Nayaab Setup', 'dr-nayaab' ), 'manage_options', 'dr-nayaab-setup', 'dr_nayaab_setup_page' );
}
add_action( 'admin_menu', 'dr_nayaab_setup_menu' );

function dr_nayaab_setup_notice() {
	if ( get_option( 'dr_nayaab_demo_imported' ) || ! current_user_can( 'manage_options' ) ) {
		return;
	}
	$screen = get_current_screen();
	if ( $screen && 'appearance_page_dr-nayaab-setup' === $screen->id ) {
		return;
	}
	echo '<div class="notice notice-info"><p><strong>Dr. Nayaab:</strong> ' . esc_html__( 'Import the approved products, images, pages, Insights articles and menus in one click.', 'dr-nayaab' ) . ' <a class="button button-primary" href="' . esc_url( admin_url( 'themes.php?page=dr-nayaab-setup' ) ) . '">' . esc_html__( 'Run setup', 'dr-nayaab' ) . '</a></p></div>';
}
add_action( 'admin_notices', 'dr_nayaab_setup_notice' );

function dr_nayaab_setup_page() {
	$log = array();
	if ( isset( $_POST['dr_nayaab_run_setup'] ) && check_admin_referer( 'dr_nayaab_setup' ) ) {
		$log = dr_nayaab_run_setup();
	}
	echo '<div class="wrap"><h1>' . esc_html__( 'Dr. Nayaab Setup', 'dr-nayaab' ) . '</h1>';
	echo '<p>' . esc_html__( 'This imports the bundled approved images into the Media Library and creates the product catalogue, product categories, pages (About, Categories, Global Business, Contact, Privacy Policy, Terms), Insights articles and navigation menus. Existing content with the same slug is left untouched.', 'dr-nayaab' ) . '</p>';
	if ( $log ) {
		echo '<div class="notice notice-success"><ul style="list-style:disc;padding-left:20px">';
		foreach ( $log as $line ) {
			echo '<li>' . esc_html( $line ) . '</li>';
		}
		echo '</ul></div>';
	}
	echo '<form method="post">';
	wp_nonce_field( 'dr_nayaab_setup' );
	submit_button( __( 'Run setup now', 'dr-nayaab' ), 'primary', 'dr_nayaab_run_setup' );
	echo '</form></div>';
}

/** Import a bundled image into the Media Library once; returns attachment ID. */
function dr_nayaab_import_image( $file, $folder ) {
	$key      = $folder . '/' . $file;
	$existing = get_posts( array( 'post_type' => 'attachment', 'meta_key' => '_dn_source', 'meta_value' => $key, 'fields' => 'ids', 'numberposts' => 1, 'post_status' => 'any' ) );
	if ( $existing ) {
		return (int) $existing[0];
	}
	$path = get_template_directory() . '/assets/images/' . $key;
	if ( ! file_exists( $path ) ) {
		return 0;
	}
	require_once ABSPATH . 'wp-admin/includes/file.php';
	require_once ABSPATH . 'wp-admin/includes/media.php';
	require_once ABSPATH . 'wp-admin/includes/image.php';

	$tmp = wp_tempnam( $file );
	copy( $path, $tmp );
	$id = media_handle_sideload( array( 'name' => sanitize_file_name( $file ), 'tmp_name' => $tmp ), 0, preg_replace( '/\.png$/i', '', $file ) );
	if ( is_wp_error( $id ) ) {
		@unlink( $tmp ); // phpcs:ignore
		return 0;
	}
	update_post_meta( $id, '_dn_source', $key );
	update_post_meta( $id, '_wp_attachment_image_alt', ucwords( strtolower( preg_replace( '/\.png$/i', '', $file ) ) ) );
	return (int) $id;
}

function dr_nayaab_ensure_page( $slug, $title, $content = '' ) {
	$page = get_page_by_path( $slug );
	if ( $page ) {
		return $page->ID;
	}
	return wp_insert_post( array( 'post_type' => 'page', 'post_status' => 'publish', 'post_name' => $slug, 'post_title' => $title, 'post_content' => $content ) );
}

function dr_nayaab_blocks_to_html( $blocks ) {
	$html = '';
	foreach ( $blocks as $b ) {
		if ( 'ul' === $b['type'] ) {
			$html .= "<ul>\n";
			foreach ( $b['items'] as $item ) {
				$html .= '<li>' . esc_html( $item ) . "</li>\n";
			}
			$html .= "</ul>\n";
		} elseif ( in_array( $b['type'], array( 'h2', 'h3' ), true ) ) {
			$html .= '<' . $b['type'] . '>' . esc_html( $b['text'] ) . '</' . $b['type'] . ">\n";
		} else {
			$html .= '<p>' . esc_html( $b['text'] ) . "</p>\n";
		}
	}
	return $html;
}

function dr_nayaab_run_setup() {
	if ( function_exists( 'set_time_limit' ) ) {
		@set_time_limit( 600 ); // phpcs:ignore
	}
	$log = array();
	$dir = get_template_directory() . '/data/';

	// Products + categories.
	$data = json_decode( file_get_contents( $dir . 'products.json' ), true ); // phpcs:ignore
	$order = 0;
	foreach ( $data['categories'] as $cat ) {
		if ( ! term_exists( $cat['slug'], 'dn_product_cat' ) ) {
			wp_insert_term( $cat['name'], 'dn_product_cat', array( 'slug' => $cat['slug'], 'description' => $cat['description'] ) );
		}
		$term = get_term_by( 'slug', $cat['slug'], 'dn_product_cat' );
		if ( $term && ! get_term_meta( $term->term_id, '_dn_image', true ) ) {
			$img = dr_nayaab_import_image( $cat['image'], 'site' );
			if ( $img ) {
				update_term_meta( $term->term_id, '_dn_image', $img );
			}
		}
	}
	$created = 0;
	foreach ( $data['products'] as $p ) {
		$order++;
		if ( get_page_by_path( $p['slug'], OBJECT, 'dn_product' ) ) {
			continue;
		}
		$desc = sprintf( '%s from the Dr. Nayaab portfolio%s. Contact our business team for distribution, importer and institutional enquiries.', $p['name'], ! empty( $p['strength'] ) ? ' (' . $p['strength'] . ', ' . strtolower( $p['form'] ) . ')' : ' (' . strtolower( $p['form'] ) . ')' );
		$id   = wp_insert_post( array( 'post_type' => 'dn_product', 'post_status' => 'publish', 'post_name' => $p['slug'], 'post_title' => $p['name'], 'post_excerpt' => $desc, 'post_content' => '<p>' . esc_html( $desc ) . '</p>', 'menu_order' => $order ) );
		if ( ! $id || is_wp_error( $id ) ) {
			continue;
		}
		wp_set_object_terms( $id, $p['category'], 'dn_product_cat' );
		foreach ( array( 'strength' => '_dn_strength', 'form' => '_dn_form', 'packSize' => '_dn_pack_size', 'variants' => '_dn_variants' ) as $k => $meta ) {
			if ( ! empty( $p[ $k ] ) ) {
				update_post_meta( $id, $meta, $p[ $k ] );
			}
		}
		$ids = array();
		foreach ( $p['images'] as $file ) {
			$img = dr_nayaab_import_image( $file, 'products' );
			if ( $img ) {
				$ids[] = $img;
			}
		}
		if ( $ids ) {
			set_post_thumbnail( $id, $ids[0] );
			update_post_meta( $id, '_dn_gallery', implode( ',', array_slice( $ids, 1 ) ) );
		}
		$created++;
	}
	$log[] = sprintf( '%d products created (existing products skipped).', $created );

	// Pages.
	$pages = array(
		'about'           => __( 'About Us', 'dr-nayaab' ),
		'categories'      => __( 'Categories', 'dr-nayaab' ),
		'global-business' => __( 'Global Business', 'dr-nayaab' ),
		'contact'         => __( 'Contact Us', 'dr-nayaab' ),
		'insights'        => __( 'Insights', 'dr-nayaab' ),
	);
	foreach ( $pages as $slug => $title ) {
		dr_nayaab_ensure_page( $slug, $title );
	}
	$legal = include get_template_directory() . '/data/legal.php';
	$privacy = dr_nayaab_ensure_page( 'privacy-policy', __( 'Privacy Policy', 'dr-nayaab' ), $legal['privacy'] );
	$p_obj = get_post( $privacy );
	if ( $p_obj && 'publish' !== $p_obj->post_status ) {
		wp_update_post( array( 'ID' => $privacy, 'post_status' => 'publish' ) );
	}
	if ( $p_obj && false !== strpos( $p_obj->post_content, 'Suggested text' ) ) {
		wp_update_post( array( 'ID' => $privacy, 'post_content' => $legal['privacy'] ) );
	}
	dr_nayaab_ensure_page( 'terms', __( 'Terms of Use', 'dr-nayaab' ), $legal['terms'] );
	$home = dr_nayaab_ensure_page( 'home', __( 'Home', 'dr-nayaab' ) );
	update_option( 'show_on_front', 'page' );
	update_option( 'page_on_front', $home );
	update_option( 'page_for_posts', get_page_by_path( 'insights' )->ID );
	$log[] = 'Pages created and Home / Insights set as front page and posts page.';

	// Insights posts.
	$posts   = json_decode( file_get_contents( $dir . 'posts.json' ), true ); // phpcs:ignore
	$created = 0;
	foreach ( $posts as $post ) {
		if ( get_page_by_path( $post['slug'], OBJECT, 'post' ) ) {
			continue;
		}
		$cat = term_exists( $post['category'], 'category' );
		if ( ! $cat ) {
			$cat = wp_insert_term( $post['category'], 'category' );
		}
		$cat_id = is_array( $cat ) ? (int) $cat['term_id'] : (int) $cat;
		$id     = wp_insert_post( array(
			'post_type'     => 'post',
			'post_status'   => 'publish',
			'post_name'     => $post['slug'],
			'post_title'    => $post['title'],
			'post_excerpt'  => $post['excerpt'],
			'post_content'  => dr_nayaab_blocks_to_html( $post['body'] ),
			'post_date'     => $post['date'] . ' 09:00:00',
			'post_category' => array( $cat_id ),
		) );
		if ( ! $id || is_wp_error( $id ) ) {
			continue;
		}
		$img = dr_nayaab_import_image( basename( $post['image'] ), 'site' );
		if ( $img ) {
			set_post_thumbnail( $id, $img );
		}
		if ( ! empty( $post['relatedProducts'] ) ) {
			update_post_meta( $id, '_dn_related_products', implode( ',', $post['relatedProducts'] ) );
		}
		$created++;
	}
	wp_delete_post( 1, true ); // Remove "Hello world!" if still present.
	$log[] = sprintf( '%d Insights articles created.', $created );

	// Menus.
	dr_nayaab_setup_menus();
	$log[] = 'Primary and footer menus created and assigned.';

	update_option( 'permalink_structure', '/%postname%/' );
	flush_rewrite_rules();
	update_option( 'dr_nayaab_demo_imported', 1 );
	$log[] = 'Permalinks set to "Post name". Setup complete.';
	return $log;
}

function dr_nayaab_setup_menus() {
	$locations = get_theme_mod( 'nav_menu_locations', array() );
	$menus     = array(
		'primary'      => array( 'Primary Navigation', array(
			'Home'            => home_url( '/' ),
			'About Us'        => 'page:about',
			'Products'        => get_post_type_archive_link( 'dn_product' ),
			'Categories'      => 'page:categories',
			'Global Business' => 'page:global-business',
			'Insights'        => 'page:insights',
			'Ronak Group'     => 'https://ronak.global',
			'Contact Us'      => 'page:contact',
		) ),
		'footer_pages' => array( 'Footer — Company', array(
			'About Us'        => 'page:about',
			'Products'        => get_post_type_archive_link( 'dn_product' ),
			'Global Business' => 'page:global-business',
			'Insights'        => 'page:insights',
			'Contact Us'      => 'page:contact',
		) ),
		'footer_legal' => array( 'Footer — Legal', array(
			'Privacy Policy' => 'page:privacy-policy',
			'Terms of Use'   => 'page:terms',
		) ),
	);
	foreach ( $menus as $location => $menu ) {
		if ( ! empty( $locations[ $location ] ) && wp_get_nav_menu_object( $locations[ $location ] ) ) {
			continue;
		}
		$existing = wp_get_nav_menu_object( $menu[0] );
		$menu_id  = $existing ? $existing->term_id : wp_create_nav_menu( $menu[0] );
		if ( is_wp_error( $menu_id ) ) {
			continue;
		}
		if ( ! $existing ) {
			foreach ( $menu[1] as $label => $target ) {
				if ( 0 === strpos( $target, 'page:' ) ) {
					$page = get_page_by_path( substr( $target, 5 ) );
					if ( ! $page ) {
						continue;
					}
					wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => $label, 'menu-item-object' => 'page', 'menu-item-object-id' => $page->ID, 'menu-item-type' => 'post_type', 'menu-item-status' => 'publish' ) );
				} else {
					wp_update_nav_menu_item( $menu_id, 0, array( 'menu-item-title' => $label, 'menu-item-url' => $target, 'menu-item-type' => 'custom', 'menu-item-status' => 'publish' ) );
				}
			}
		}
		$locations[ $location ] = $menu_id;
	}
	set_theme_mod( 'nav_menu_locations', $locations );
}
