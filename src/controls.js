/**
 * External dependencies.
 */
import { __, getLocaleData } from '@wordpress/i18n';
import {
	PanelBody,
	SelectControl,
	ToggleControl,
	PanelRow,
	ExternalLink,
	Button,
	TextControl,
} from '@wordpress/components';
import {
	useState,
} from '@wordpress/element';

/**
 * Internal dependencies.
 */

function getToggleAbbreviationHelp( checked ) {
	return checked
		? __( 'Your definition is an abbreviation, e.g., LOL, and is wrapped in an <abbr /> tag', 'a8c-definition-block' )
		: __( 'Your definition is a whole word or term and not an abbreviation.', 'a8c-definition-block' );
}

function getLocaleFromLocaleData() {
	const localeData = getLocaleData();
	return localeData['']?.lang || 'en';
}

/**
 * Returns editor controls.
 *
 * @return {WPElement} Element to render.
 */
export default function DefinitionControls(
	{
		isAbbreviation,
		onToggleAbbreviation,
		partOfSpeech,
		onChangePartOfSpeech,
		partsOfSpeechOptions,
		searchForDefinition,
	} ) {

	return (
		<>
			<PanelBody title={ __( 'Definition settings', 'a8c-definition-block' ) }>
				<PanelRow className="a8c-definition-block__panel-row">
					<SelectControl
						label={ __( 'Part of speech (optional)', 'a8c-definition-block' ) }
						value={ partOfSpeech }
						options={ partsOfSpeechOptions }
						onChange={ onChangePartOfSpeech }
						hideCancelButton={ false }
					/>
					<span>Not sure? See <ExternalLink href="https://en.wikipedia.org/wiki/Part_of_speech">Parts of Speech</ExternalLink></span>
				</PanelRow>
				<PanelRow className="a8c-definition-block__panel-row">
					<ToggleControl
						label={ __( 'Is the term an abbreviation?', 'a8c-definition-block' ) }
						checked={ isAbbreviation }
						onChange={ onToggleAbbreviation }
						help={ getToggleAbbreviationHelp }
					/>
				</PanelRow>
			</PanelBody>
{/*			<PanelBody title={ __( 'Online definition', 'a8c-definition-block' ) }>


					TODO: support other locales.
					TODO: default to term in edit.js (properly)

				}
				<form onSubmit={ handleSearch }>
					<TextControl
						className="a8c-definition-block__search-input"
						label={ __( 'Search for a definition online', 'a8c-definition-block' ) }
						value={ queryTerm }
						onChange={ ( nextValue ) => setQueryTerm( nextValue ) }
					/>
					<Button
						className="a8c-definition-block__search-button"
						icon="search"
						isBusy={ isFetching }
						disabled={ isFetching }
						isSecondary
						type="submit"
					>
						{ __( 'Search', 'a8c-definition-block' ) }
					</Button>
				</form>
			</PanelBody>*/}
		</>
	);
}
