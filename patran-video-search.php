<?php
/*
  Plugin Name: Patran Video Search
  Plugin URI:  https://zylocod.es
  Description: A video search Vue component.
  Version:     1.0
  Author:      Zylo, LLC
  Author URI:  https://zylocod.es
  License:     GPL2
  License URI: https://www.gnu.org/licenses/gpl-2.0.html
*/

defined( 'ABSPATH' ) or die( 'No script kiddies please!' );

/*
 * Scripts & Styles
 */
// Register all scripts and styles up front.
function patran_video_search_register_all_scripts() {
	// wp_register_style('patran-video-search-styles', plugins_url( 'css/video-search.css',  __FILE__ ));
	wp_register_script('patran-video-search-js', plugin_dir_url( __FILE__ ) . 'js/video-search.js', '', '', true );
}
add_action('wp_loaded', 'patran_video_search_register_all_scripts' );

/*
 * Frontend UI
 */
function patran_video_search_shortcode_func( $atts ) {
	// wp_enqueue_style('patran-video-search-styles');
	wp_enqueue_script('patran-video-search-js');
	include('templates/video-search.php');
	return;
}
add_shortcode( 'patran-video-search', 'patran_video_search_shortcode_func' );

?>
