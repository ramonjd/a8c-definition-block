/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

export const ABBREVIATION = 'abbreviation';

export const DEFAULT_LOCALE = 'en';

export const PARTS_OF_SPEECH = [
	{
		label: __( 'Choose a word class (optional)', 'a8c-definition-block' ),
		value: '',
	},
	{
		label: __( 'Noun, e.g., Apple', 'a8c-definition-block' ),
		title: __( 'Noun', 'a8c-definition-block' ),
		value: 'noun',
	},
	{
		label: __( 'Verb, e.g., Eat', 'a8c-definition-block' ),
		title: __( 'Verb', 'a8c-definition-block' ),
		value: 'verb',
	},
	{
		label: __( 'Article, e.g., The', 'a8c-definition-block' ),
		title: __( 'Article', 'a8c-definition-block' ),
		value: 'article',
	},
	{
		label: __( 'Pronoun, e.g., Their', 'a8c-definition-block' ),
		title: __( 'Pronoun', 'a8c-definition-block' ),
		value: 'pronoun',
	},
	{
		label: __( 'Preposition, e.g., With', 'a8c-definition-block' ),
		title: __( 'Preposition', 'a8c-definition-block' ),
		value: 'preposition',
	},
	{
		label: __( 'Adverb, e.g., Quickly', 'a8c-definition-block' ),
		title: __( 'Adverb', 'a8c-definition-block' ),
		value: 'adverb',
	},
	{
		label: __( 'Conjunction, e.g., And', 'a8c-definition-block' ),
		title: __( 'Conjunction', 'a8c-definition-block' ),
		value: 'conjunction',
	},
	{
		label: __( 'Abbreviation, e.g., PLC', 'a8c-definition-block' ),
		title: __( 'Abbreviation', 'a8c-definition-block' ),
		value: ABBREVIATION,
	},
];
