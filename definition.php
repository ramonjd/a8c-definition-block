<?php
/**
 * Plugin Name:     Definition
 * Description:     A term and definition block.
 * Version:         0.1.0
 * Author:          @ramonopoly
 * License:         GPL-2.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:     a8c-definition-block
 *
 * @package         definition-block
 */

/**
 * Register block assets
 */
function a8c_definition_block_init() {
	$dir = __DIR__;

	$script_asset_path = "$dir/build/index.asset.php";
	if ( ! file_exists( $script_asset_path ) ) {
		throw new Error(
			'You need to run `npm start` or `npm run build` for the "a8c/definition-block" block first.'
		);
	}
	$index_js     = 'build/index.js';
	$script_asset = require( $script_asset_path );
	wp_register_script(
		'a8c-definition-block-editor',
		plugins_url( $index_js, __FILE__ ),
		$script_asset['dependencies'],
		$script_asset['version']
	);
	wp_set_script_translations( 'a8c-definition-block-editor', 'a8c-definition-block' );

	$editor_css = 'build/index.css';
	wp_register_style(
		'a8c-definition-block-editor',
		plugins_url( $editor_css, __FILE__ ),
		array(),
		filemtime( "$dir/$editor_css" )
	);

	$style_css = 'build/style-index.css';
	wp_register_style(
		'a8c-definition-block',
		plugins_url( $style_css, __FILE__ ),
		array(),
		filemtime( "$dir/$style_css" )
	);

	register_block_type(
		'a8c/definition-block',
		array(
			'editor_script' => 'a8c-definition-block-editor',
			'editor_style'  => 'a8c-definition-block-editor',
			'style'         => 'a8c-definition-block',
		)
	);
}
add_action( 'init', 'a8c_definition_block_init' );
