<?php
/**
 * Template helpers.
 *
 * @package dr-nayaab
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/** URL of a bundled theme image. */
function dr_nayaab_asset( $file, $folder = 'site' ) {
	return get_template_directory_uri() . '/assets/images/' . $folder . '/' . rawurlencode( $file );
}

/**
 * Image URL from a Customizer image setting, falling back to a bundled file.
 * Admins can replace any section image from the Media Library via the Customizer.
 */
function dr_nayaab_image( $key, $fallback_file ) {
	$url = dr_nayaab_option( $key, '' );
	return $url ? $url : dr_nayaab_asset( $fallback_file );
}

/** Logo: custom logo from Customizer, otherwise the approved bundled logo. */
function dr_nayaab_logo( $class = 'site-logo' ) {
	$id  = get_theme_mod( 'custom_logo' );
	$src = $id ? wp_get_attachment_image_url( $id, 'full' ) : dr_nayaab_asset( 'dr-nayaab-logo.png' );
	printf(
		'<a class="%1$s" href="%2$s" rel="home"><img src="%3$s" alt="%4$s" width="400" height="120"></a>',
		esc_attr( $class ),
		esc_url( home_url( '/' ) ),
		esc_url( $src ),
		esc_attr__( 'Dr. Nayaab — Committed to Care', 'dr-nayaab' )
	);
}

/** Highlight a phrase of a heading in brand red. */
function dr_nayaab_highlight( $text, $phrase ) {
	$text = esc_html( $text );
	if ( $phrase && false !== strpos( $text, esc_html( $phrase ) ) ) {
		$text = str_replace( esc_html( $phrase ), '<span class="accent">' . esc_html( $phrase ) . '</span>', $text );
	}
	return $text;
}

/** Make a site-relative link absolute against home_url(). */
function dr_nayaab_url( $path ) {
	if ( preg_match( '#^(https?:|mailto:|tel:|\#)#', $path ) ) {
		return $path;
	}
	return home_url( '/' . ltrim( $path, '/' ) );
}

function dr_nayaab_whatsapp_url( $message = '' ) {
	$base = dr_nayaab_option( 'whatsapp_url', 'https://wa.me/919998569923' );
	$msg  = $message ? $message : dr_nayaab_option( 'whatsapp_message', 'Hello Dr. Nayaab team, I would like to enquire about your pharmaceutical products and business partnership opportunities.' );
	return $base . '?text=' . rawurlencode( $msg );
}

function dr_nayaab_phone_href() {
	return 'tel:' . preg_replace( '/[^0-9+]/', '', dr_nayaab_option( 'phone', '+91 99985 69923' ) );
}

/** Minimal inline SVG icon set (no icon library needed). */
function dr_nayaab_icon( $name, $class = 'icon' ) {
	$paths = array(
		'arrow'    => '<path d="M5 12h14M13 6l6 6-6 6"/>',
		'shield'   => '<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
		'package'  => '<path d="M3 7l9-4 9 4-9 4-9-4z"/><path d="M3 7v10l9 4 9-4V7"/><path d="M12 11v10"/>',
		'globe'    => '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 010 18M12 3a14 14 0 000 18"/>',
		'handshake'=> '<path d="M2 12l5-5 5 3 5-3 5 5"/><path d="M7 12l4 4a2 2 0 003 0l3-3"/>',
		'layers'   => '<path d="M12 3l9 5-9 5-9-5 9-5z"/><path d="M3 13l9 5 9-5"/>',
		'spark'    => '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/>',
		'mail'     => '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
		'phone'    => '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>',
		'pin'      => '<path d="M12 21s-7-6-7-12a7 7 0 0114 0c0 6-7 12-7 12z"/><circle cx="12" cy="9" r="2.5"/>',
		'chat'     => '<path d="M21 12a8 8 0 01-11.6 7.1L4 20l1-4.6A8 8 0 1121 12z"/>',
		'list'     => '<path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/>',
		'menu'     => '<path d="M4 7h16M4 12h16M4 17h16"/>',
		'close'    => '<path d="M6 6l12 12M18 6L6 18"/>',
		'plus'     => '<path d="M12 5v14M5 12h14"/>',
		'check'    => '<path d="M5 12l5 5L20 7"/>',
	);
	$d = isset( $paths[ $name ] ) ? $paths[ $name ] : '';
	return '<svg class="' . esc_attr( $class ) . '" viewBox="0 0 24 24" aria-hidden="true" focusable="false">' . $d . '</svg>';
}

/** Product data helpers. */
function dr_nayaab_product_meta( $post_id ) {
	return array(
		'strength'  => get_post_meta( $post_id, '_dn_strength', true ),
		'form'      => get_post_meta( $post_id, '_dn_form', true ),
		'pack_size' => get_post_meta( $post_id, '_dn_pack_size', true ),
		'variants'  => get_post_meta( $post_id, '_dn_variants', true ),
	);
}

function dr_nayaab_product_meta_line( $post_id ) {
	$m = dr_nayaab_product_meta( $post_id );
	return implode( ' · ', array_filter( array( $m['strength'], $m['form'], $m['pack_size'] ) ) );
}

/** Featured image first, then gallery IDs. Returns attachment IDs. */
function dr_nayaab_product_images( $post_id ) {
	$ids   = array();
	$thumb = get_post_thumbnail_id( $post_id );
	if ( $thumb ) {
		$ids[] = (int) $thumb;
	}
	$gallery = get_post_meta( $post_id, '_dn_gallery', true );
	if ( $gallery ) {
		foreach ( explode( ',', $gallery ) as $id ) {
			$id = absint( $id );
			if ( $id && ! in_array( $id, $ids, true ) ) {
				$ids[] = $id;
			}
		}
	}
	return $ids;
}

function dr_nayaab_product_terms( $post_id ) {
	$terms = get_the_terms( $post_id, 'dn_product_cat' );
	return ( $terms && ! is_wp_error( $terms ) ) ? $terms : array();
}

/** Add to Enquiry + WhatsApp buttons. */
function dr_nayaab_enquiry_buttons( $id, $name, $meta = '', $image = '', $with_whatsapp = true ) {
	$wa = sprintf( 'Hello Dr. Nayaab team, I would like to enquire about %s. Please share business and distribution details.', $name );
	?>
	<div class="product-actions">
		<button type="button" class="enquiry-btn" data-product-id="<?php echo esc_attr( $id ); ?>" data-product-name="<?php echo esc_attr( $name ); ?>" data-product-meta="<?php echo esc_attr( $meta ); ?>" data-product-image="<?php echo esc_url( $image ); ?>" data-label-add="<?php esc_attr_e( 'Add to Enquiry', 'dr-nayaab' ); ?>" data-label-added="<?php esc_attr_e( 'Added to Enquiry', 'dr-nayaab' ); ?>">
			<?php echo dr_nayaab_icon( 'plus', 'icon' ); // phpcs:ignore ?>
			<span class="enquiry-btn-label"><?php esc_html_e( 'Add to Enquiry', 'dr-nayaab' ); ?></span>
		</button>
		<?php if ( $with_whatsapp ) : ?>
			<a class="enquiry-btn" href="<?php echo esc_url( dr_nayaab_whatsapp_url( $wa ) ); ?>" target="_blank" rel="noopener"><?php echo dr_nayaab_icon( 'chat' ); // phpcs:ignore ?><?php esc_html_e( 'WhatsApp Enquiry', 'dr-nayaab' ); ?></a>
		<?php endif; ?>
	</div>
	<?php
}

/** URL of a page by slug, with a safe fallback. */
function dr_nayaab_page_url( $slug ) {
	$page = get_page_by_path( $slug );
	return $page ? get_permalink( $page ) : home_url( '/' . $slug . '/' );
}

/** Blog index URL (the "Insights" posts page). */
function dr_nayaab_blog_url() {
	$id = (int) get_option( 'page_for_posts' );
	return $id ? get_permalink( $id ) : home_url( '/insights/' );
}

/** Fallback when no menu is assigned yet. */
function dr_nayaab_fallback_menu() {
	$items = array(
		__( 'Home', 'dr-nayaab' )            => home_url( '/' ),
		__( 'About Us', 'dr-nayaab' )        => dr_nayaab_page_url( 'about' ),
		__( 'Products', 'dr-nayaab' )        => get_post_type_archive_link( 'dn_product' ),
		__( 'Categories', 'dr-nayaab' )      => dr_nayaab_page_url( 'categories' ),
		__( 'Global Business', 'dr-nayaab' ) => dr_nayaab_page_url( 'global-business' ),
		__( 'Insights', 'dr-nayaab' )        => dr_nayaab_blog_url(),
		__( 'Ronak Group', 'dr-nayaab' )     => dr_nayaab_option( 'parent_url', 'https://ronak.global' ),
		__( 'Contact Us', 'dr-nayaab' )      => dr_nayaab_page_url( 'contact' ),
	);
	echo '<ul>';
	foreach ( $items as $label => $url ) {
		echo '<li><a href="' . esc_url( $url ) . '">' . esc_html( $label ) . '</a></li>';
	}
	echo '</ul>';
}

/** Breadcrumbs: Yoast / Rank Math when present, theme breadcrumbs otherwise. */
function dr_nayaab_breadcrumbs( $light = false ) {
	if ( function_exists( 'yoast_breadcrumb' ) && get_option( 'wpseo_titles' ) ) {
		$opts = get_option( 'wpseo_titles' );
		if ( ! empty( $opts['breadcrumbs-enable'] ) ) {
			yoast_breadcrumb( '<nav class="breadcrumbs" aria-label="Breadcrumb">', '</nav>' );
			return;
		}
	}
	if ( function_exists( 'rank_math_the_breadcrumbs' ) ) {
		rank_math_the_breadcrumbs();
		return;
	}
	$trail = dr_nayaab_breadcrumb_trail();
	if ( count( $trail ) < 2 ) {
		return;
	}
	echo '<nav class="breadcrumbs" aria-label="' . esc_attr__( 'Breadcrumb', 'dr-nayaab' ) . '"' . ( $light ? ' style="color:rgba(255,255,255,.75)"' : '' ) . '><ol>';
	$last = count( $trail ) - 1;
	foreach ( $trail as $i => $crumb ) {
		echo '<li>';
		if ( $i < $last ) {
			echo '<a href="' . esc_url( $crumb['url'] ) . '">' . esc_html( $crumb['name'] ) . '</a> <span aria-hidden="true">/</span>';
		} else {
			echo '<span aria-current="page">' . esc_html( $crumb['name'] ) . '</span>';
		}
		echo '</li>';
	}
	echo '</ol></nav>';
}

function dr_nayaab_breadcrumb_trail() {
	$trail = array( array( 'name' => __( 'Home', 'dr-nayaab' ), 'url' => home_url( '/' ) ) );
	if ( is_singular( 'dn_product' ) ) {
		$trail[] = array( 'name' => __( 'Products', 'dr-nayaab' ), 'url' => get_post_type_archive_link( 'dn_product' ) );
		$terms   = dr_nayaab_product_terms( get_the_ID() );
		if ( $terms ) {
			$trail[] = array( 'name' => $terms[0]->name, 'url' => get_term_link( $terms[0] ) );
		}
		$trail[] = array( 'name' => get_the_title(), 'url' => get_permalink() );
	} elseif ( is_post_type_archive( 'dn_product' ) ) {
		$trail[] = array( 'name' => __( 'Products', 'dr-nayaab' ), 'url' => get_post_type_archive_link( 'dn_product' ) );
	} elseif ( is_tax( 'dn_product_cat' ) ) {
		$trail[] = array( 'name' => __( 'Categories', 'dr-nayaab' ), 'url' => dr_nayaab_page_url( 'categories' ) );
		$trail[] = array( 'name' => single_term_title( '', false ), 'url' => get_term_link( get_queried_object() ) );
	} elseif ( is_singular( 'post' ) ) {
		$trail[] = array( 'name' => __( 'Insights', 'dr-nayaab' ), 'url' => dr_nayaab_blog_url() );
		$trail[] = array( 'name' => get_the_title(), 'url' => get_permalink() );
	} elseif ( is_home() ) {
		$trail[] = array( 'name' => __( 'Insights', 'dr-nayaab' ), 'url' => dr_nayaab_blog_url() );
	} elseif ( is_category() ) {
		$trail[] = array( 'name' => __( 'Insights', 'dr-nayaab' ), 'url' => dr_nayaab_blog_url() );
		$trail[] = array( 'name' => single_cat_title( '', false ), 'url' => get_category_link( get_queried_object_id() ) );
	} elseif ( is_page() ) {
		$trail[] = array( 'name' => get_the_title(), 'url' => get_permalink() );
	} elseif ( is_search() ) {
		$trail[] = array( 'name' => __( 'Search', 'dr-nayaab' ), 'url' => get_search_link() );
	}
	return $trail;
}

/** Decorative curves used in heroes. */
function dr_nayaab_curves() {
	?>
	<svg class="hero-curves" viewBox="0 0 1440 800" preserveAspectRatio="none" aria-hidden="true" focusable="false">
		<path d="M-40 620 C 320 460, 620 760, 980 560 S 1480 360, 1500 420" fill="none" stroke="rgba(200,40,40,.35)" stroke-width="2"/>
		<path d="M-40 680 C 360 520, 660 820, 1020 620 S 1480 440, 1500 500" fill="none" stroke="rgba(30,41,70,.12)" stroke-width="1.5"/>
		<path d="M900 -20 L 1500 380" fill="none" stroke="rgba(200,40,40,.12)" stroke-width="60"/>
	</svg>
	<?php
}
