/**
 * External dependencies.
 */
import { registerBlockType } from '@wordpress/blocks';
import { __, _x } from '@wordpress/i18n';

import './style.scss';

/**
 * Internal dependencies.
 */
import metadata from '../block.json';
import edit from './edit';
import save from './save';

const { category, icon, name, attributes } = metadata;

/**
 * Register block type definition.
 */
registerBlockType( name, {
	apiVersion: 2,
	title: __(
		'Definition',
		'a8c-definition-block'
	),
	description: __(
		'A term and definition block.',
		'a8c-definition-block'
	),
	category,
	keywords: [ __( 'define', 'a8c-definition-block' ), __( 'term', 'a8c-definition-block' ) ],
	icon,
	attributes,
	styles: [
		{
			name: 'default',
			label: __( 'Default', 'a8c-definition-block' ),
			isDefault: true,
		},
		{
			name: 'minimal',
			label: __( 'Minimal', 'a8c-definition-block' )
		},
	],
	example: {
		attributes: {
			term: __(
				'Hot dog',
				'a8c-definition-block',
			),
			definition: __(
				'A hot dog (also spelled hotdog) is a food consisting of a grilled or steamed sausage served in the slit of a partially sliced bun.',
				'a8c-definition-block',
			),
		},
	},
	edit,
	save,
} );
