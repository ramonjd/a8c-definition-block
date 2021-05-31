/**
 * External dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	Button,
	Panel,
	PanelBody,
	SelectControl,
	ToggleControl,
	PanelRow,
	ExternalLink,
} from '@wordpress/components';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import {
	useEffect,
	useState,
} from '@wordpress/element';

/**
 * Internal dependencies.
 */
import SearchResults from './components/search-results';
import useFetchDefinition from './use-fetch-definition';
import isEmpty from 'lodash/isempty';
import DictionaryApi from './lib/class-dictionary-api';

/**
 * Returns help text for the abbreviation toggle control
 *
 * @param {boolean} checked Whether the control is checked or not.
 * @return {string}         The help message.
 */
function getToggleAbbreviationHelp( checked ) {
	return checked
		? __( 'Your definition is an abbreviation, e.g., LOL, and is wrapped in an <abbr /> tag', 'a8c-definition-block' )
		: __( 'Your definition is a whole word or term and not an abbreviation.', 'a8c-definition-block' );
}
/**
 * Returns help text for the should show meta toggle control.
 *
 * @param {boolean} checked Whether the control is checked or not.
 * @return {string}         The help message.
 */
function getToggleShouldShowTermMetaHelp( checked ) {
	return checked
		? __( 'Show parts of speech and other term information.', 'a8c-definition-block' )
		: __( 'Hide parts of speech and other term information', 'a8c-definition-block' );
}

/**
 * Returns editor controls.
 *
 * @return {WPElement} Element to render.
 */
export default function DefinitionControls(
	{
		term,
		isAbbreviation,
		onToggleAbbreviation,
		partOfSpeech,
		onChangePartOfSpeech,
		partsOfSpeechOptions,
		onSelectDefinition,
		shouldShowTermMeta,
		onToggleShouldShowTermMeta,
	} ) {
	const { isFetching, definitionData, fetchDefinition, errorMessage } = useFetchDefinition();
	const [ shouldShowSearchResults, setShouldShowSearchResults ] = useState( false );
	const [ definitionOptions, setDefinitionOptions ] = useState( [] );
	// We cache the last search term so we compare with incoming `term` prop.
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ selectedSearchTermId, setSelectedSearchTermId ] = useState( null );

	const searchForDefinition = () => {
		if ( ! term || isFetching ) {
			return;
		}

		const strippedTerm = stripHTML( term );

		// Don't perform fetch if the current term already matches the fetched term.
		if ( strippedTerm === definitionData?.definition ) {
			setShouldShowSearchResults( true );
			return;
		}

		setSearchTerm( strippedTerm );
		fetchDefinition( strippedTerm );
	};
	const setDefinitionData = ( indexKey ) => {
		setSelectedSearchTermId( indexKey );
		const { definition, partOfSpeech, phoneticTranscription, isAbbreviation } = DictionaryApi.getSelectedDefinition( definitionData, indexKey.split( '-' ) );
		onSelectDefinition( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } );
	};

	// Close the search results if the definition term changes.
	useEffect( () => {
		if ( term !== searchTerm || errorMessage ) {
			setShouldShowSearchResults( false );
		}
	}, [ term, searchTerm, errorMessage ] );

	// Set new UI definition data when definitionData from fetch updates.
	useEffect( () => {
		if ( ! isEmpty( definitionData ) ) {
			const newDefinitionOptions = DictionaryApi.getOptionsList( definitionData );

			setDefinitionOptions( newDefinitionOptions );

			if ( newDefinitionOptions.length > 0 ) {
				setShouldShowSearchResults( true );
			}
		}
	}, [ definitionData ] );

	return (
		<Panel>
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
				<PanelRow className="a8c-definition-block__panel-row">
					<ToggleControl
						label={ __( 'Show term meta.', 'a8c-definition-block' ) }
						checked={ shouldShowTermMeta }
						onChange={ onToggleShouldShowTermMeta }
						help={ getToggleShouldShowTermMetaHelp }
					/>
				</PanelRow>
			</PanelBody>

			<PanelBody title={ __( 'Search definition online', 'a8c-definition-block' ) }>
				{ ! term && <p> { __( 'Enter a definition term in the Editor block to search.', 'a8c-definition-block' ) }</p> }
				{ term &&
					<PanelRow className="a8c-definition-block__panel-row a8c-definition-block__search-control-container">
						{ term && ! shouldShowSearchResults &&
							<Button
								className="a8c-definition-block__search-button"
								isLink
								icon="search"
								isBusy={ isFetching }
								disabled={ isFetching }
								onClick={ () => searchForDefinition() }
							>
								{ sprintf(
									/* translators: placeholder is a work or term the user wishes to search. */
									__( 'Search definition for "%s"', 'a8c-definition-block' ),
									stripHTML( term )
								)  }
							</Button>
						}
						{ errorMessage && <p className="a8c-definition-block__error-message">{ errorMessage }</p> }
						{ shouldShowSearchResults &&
							<>
								<SearchResults
									title={ sprintf(
										/* translators: placeholder is a work or term the user wishes to search. */
										__( 'Search results for "%s"', 'a8c-definition-block' ),
										stripHTML( term )
									)  }
									searchResults={ definitionOptions }
									onSelectDefinition={ setDefinitionData }
									selectedId={ selectedSearchTermId }
								/>
							</>
						}
					</PanelRow>
				}
			</PanelBody>
		</Panel>
	);
}
