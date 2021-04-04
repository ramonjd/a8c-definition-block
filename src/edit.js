/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	useEffect,
} from '@wordpress/element';

/**
 * Internal dependencies.
 */
import DefinitionControls from './controls';
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
	const { definition, term, isAbbreviation, partOfSpeech, phoneticTranscription } = attributes;
	const blockProps = useBlockProps( {
		className: 'a8c-definition-block',
	} );
	const onToggleAbbreviation = () => setAttributes( { isAbbreviation: ! isAbbreviation } );
	const onChangePartOfSpeech = ( partOfSpeech ) => setAttributes( { partOfSpeech } );
	const setDefinitionData = ( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } ) => {
		setAttributes( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } );
	};
	const definitionTagName = isAbbreviation ? 'abbr' : 'dfn';
	const shouldShowTermMetaData = term && partOfSpeech;

	// Reset term data if term is deleted.
	useEffect( () => {
		if ( ! term ) {
			setAttributes( { partOfSpeech: '', definition: '', isAbbreviation: false, phoneticTranscription: '' } );
		}
		// TODO: if the current term does not equal the search term query, then close the list of meanings
	}, [ term ] );

	return (
		<>
			<InspectorControls>
				<DefinitionControls
					term={ term }
					onToggleAbbreviation={ onToggleAbbreviation }
					isAbbreviation={ isAbbreviation }
					partOfSpeech={ partOfSpeech }
					onChangePartOfSpeech={ onChangePartOfSpeech }
					partsOfSpeechOptions={ PARTS_OF_SPEECH }
					onSelectDefinition={ setDefinitionData }
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
					{/*TODO: add aria labels etc*/}
					{ shouldShowTermMetaData && (
						<span className="a8c-definition-block__definition a8c-definition-block__term-metadata">
						{ partOfSpeech && <span className="a8c-definition-block__term-metadata-item">[{ partOfSpeech }]</span> }
						{ phoneticTranscription && <span className="a8c-definition-block__term-metadata-item">[{ phoneticTranscription }]</span> }
					</span>
					) }
				</dt>
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
