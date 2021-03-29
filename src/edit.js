/**
 * External dependencies.
 */
import { __, sprintf } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	useEffect,
} from '@wordpress/element';
import {
	Button,
} from '@wordpress/components';
import isEmpty from 'lodash/isempty';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';

/**
 * Internal dependencies.
 */
import DefinitionControls from './controls';
import useFetchDefinition from './use-fetch-definition';
import { PARTS_OF_SPEECH } from './constants';
import './editor.scss';

/**
 * Definition Edit method.
 *
 * @return {WPElement} Element to render.
 */
export default function DefinitionEdit( {
	attributes,
	setAttributes,
} ) {
	const { definition, term, isAbbreviation, partOfSpeech } = attributes;
	const blockProps = useBlockProps( {
		className: 'a8c-definition-block',
	} );
	const { isFetching, definitionData, fetchDefinition } = useFetchDefinition();
	const onToggleAbbreviation = () => setAttributes( { isAbbreviation: ! isAbbreviation } );
	const onChangePartOfSpeech = ( partOfSpeech ) => setAttributes( { partOfSpeech } );
	const setDefinitionData = () => {
		const definition = definitionData[0].meanings[0].definitions[0].definition;
		const partOfSpeech = definitionData[0].meanings[0].partOfSpeech;
		const phoneticText = definitionData[0].phonetics[0].text;
		//const newPhoneticAudio = definitionData[0].phonetics[0].audio;
		setAttributes( { definition, partOfSpeech } );
	};
	const searchForDefinition = () => {
		if ( ! term || isFetching ) {
			return;
		}
		// Don't perform fetch if the current term already matches the fetched term.
		if ( term === definitionData?.definition ) {
			setDefinitionData();
			return;
		}

		fetchDefinition( term );
	};
	const definitionTagName = isAbbreviation ? 'abbr' : 'dfn';
	const shouldShowTermMetaData = term && partOfSpeech;

	// Reset term data if term is deleted.
	useEffect( () => {
		if ( ! term ) {
			setAttributes( { partOfSpeech: '', definition: '', isAbbreviation: false } );
		}
	}, [ term ] );

	// Set new UI definition data when definitionData from fetch updates.
	useEffect( () => {
		if ( ! isEmpty( definitionData ) ) {
			setDefinitionData();
		}
	}, [ definitionData ] );

	return (
		<>
			<InspectorControls>
				<DefinitionControls
					term={ term }
					isFetching={ isFetching }
					onToggleAbbreviation={ onToggleAbbreviation }
					isAbbreviation={ isAbbreviation }
					partOfSpeech={ partOfSpeech }
					onChangePartOfSpeech={ onChangePartOfSpeech }
					partsOfSpeechOptions={ PARTS_OF_SPEECH }
					searchForDefinition={ searchForDefinition }
				/>
			</InspectorControls>
			<dl { ...blockProps }>
				<dt className="a8c-definition-block__term">
					<RichText
						className="a8c-definition-block__term-text"
						id="a8c-definition-term"
						identifier="term"
						tagName={ definitionTagName }
						aria-label={ __( 'Definition term', 'a8c-definition-block' )  }
						placeholder={ __( 'Enter definition term', 'a8c-definition-block' )  }
						onChange={ ( newTerm ) =>
							setAttributes( { term: newTerm } )
						}
						value={ term }
						multiline={ false }
					/>
					{ shouldShowTermMetaData && (
						<span className="a8c-definition-block__definition a8c-definition-block__term-metadata">
						{ partOfSpeech && <span className="a8c-definition-block__part-of-speech">[{ partOfSpeech }]</span> }
					</span>
					) }
				</dt>
				{
					term && ! definition && (
						<Button
							className="a8c-definition-block__search-button"
							isTertiary
							icon="search"
							isBusy={ isFetching }
							disabled={ isFetching }
							onClick={ () => searchForDefinition() }
						>
							{ sprintf(
								/* translators: placeholder is a work or term the user wishes to search. */
								__( 'Search for a definition for "%s" online', 'a8c-definition-block' ),
								stripHTML( term )
							)  }
						</Button>
					)
				}
				<RichText
					className="a8c-definition-block__definition a8c-definition-block__term-definition"
					role="definition"
					aria-labelledby="a8c-definition-term"
					identifier="definition"
					tagName="dd"
					aria-label={ __( 'Definition text', 'a8c-definition-block' )  }
					placeholder={ __( 'Enter definition text', 'a8c-definition-block' )  }
					onChange={ ( newDefinition ) =>
						setAttributes( { definition: newDefinition } )
					}
					value={ definition }
				/>
			</dl>
		</>
	);
}
