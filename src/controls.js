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

function getToggleAbbreviationHelp( checked ) {
	return checked
		? __( 'Your definition is an abbreviation, e.g., LOL, and is wrapped in an <abbr /> tag', 'a8c-definition-block' )
		: __( 'Your definition is a whole word or term and not an abbreviation.', 'a8c-definition-block' );
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
	} ) {
	const { isFetching, definitionData, fetchDefinition } = useFetchDefinition();
	const [ shouldShowSearchResults, setShouldShowSearchResults ] = useState( false );
	const [ definitionOptions, setDefinitionOptions ] = useState( [] );
	// We cache the last search term so we compare with incoming `term` prop.
	const [ searchTerm, setSearchTerm ] = useState( '' );
	const [ selectedSearchTermId, setSelectedSearchTermId ] = useState( null );

	const searchForDefinition = () => {
		if ( ! term || isFetching ) {
			return;
		}
		// Don't perform fetch if the current term already matches the fetched term.
		if ( term === definitionData?.definition ) {
			setShouldShowSearchResults( true );
			return;
		}

		setSearchTerm( term );
		fetchDefinition( term );
	};
	const setDefinitionData = ( indexKey ) => {
		const [ definitionIndex, meaningIndex ] = indexKey.split( '-' );
		const definition = definitionData[ definitionIndex ].meanings[ meaningIndex ].definitions[0].definition;
		const partOfSpeech = definitionData[ definitionIndex ].meanings[ meaningIndex ].partOfSpeech;
		let isAbbreviation = false;
		if ( partOfSpeech === 'abbreviation' ) {
			isAbbreviation = true;
		}
		const phoneticTranscription = definitionData[ definitionIndex ].phonetics[ meaningIndex ]?.text || definitionData[ definitionIndex ].phonetics[0]?.text;
		//const newPhoneticAudio = definitionData[ definitionIndex ].phonetics[ meaningIndex ]?.audio || definitionData[ definitionIndex ].phonetics[0]?.audio;
		setSelectedSearchTermId( indexKey );

		onSelectDefinition( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } )
	};

	// Close the search results if the definition term changes.
	useEffect( () => {
		if ( term !== searchTerm ) {
			setShouldShowSearchResults( false );
		}
	}, [ term, searchTerm ] );

	// Set new UI definition data when definitionData from fetch updates.
	useEffect( () => {
		if ( ! isEmpty( definitionData ) ) {
			const newDefinitionOptions = [];
			// TODO: abstract this into an adaptor pattern in case we use a different/custom API later.
			// 	Or we offer a choice of dictionary sources.
			for ( const definitionsIndex in definitionData ) {
				if ( definitionData.hasOwnProperty( definitionsIndex ) ) {
					definitionData[ definitionsIndex ].meanings?.forEach( ( meaning, meaningsIndex ) => {
						newDefinitionOptions.push( {
							value: `${ definitionsIndex }-${ meaningsIndex }`,
							label: `${ meaning.definitions[0].definition } [${ meaning.partOfSpeech }]`
						} );
					} );
				}
			}

			setDefinitionOptions( newDefinitionOptions );

			if ( newDefinitionOptions.length > 1 ) {
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
