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
import TermMetaData from './components/term-metadata';
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
	const {
		definition,
		term,
		isAbbreviation,
		partOfSpeech,
		phoneticTranscription,
		shouldShowTermMeta
	} = attributes;
	const blockProps = useBlockProps( {
		className: 'a8c-definition-block',
	} );
	const onToggleAbbreviation = () => setAttributes( { isAbbreviation: ! isAbbreviation } );
	const onToggleShouldShowTermMeta = () => setAttributes( { shouldShowTermMeta: ! shouldShowTermMeta } );
	const onChangePartOfSpeech = ( partOfSpeech ) => setAttributes( { partOfSpeech } );
	const setDefinitionData = ( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } ) => {
		setAttributes( { definition, partOfSpeech, phoneticTranscription, isAbbreviation } );
	};
	const definitionTagName = isAbbreviation ? 'abbr' : 'dfn';

	// Reset term data if term is deleted.
	useEffect( () => {
		if ( ! term ) {
			setAttributes( { partOfSpeech: '', definition: '', isAbbreviation: false, phoneticTranscription: '' } );
		}
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
					shouldShowTermMeta={ shouldShowTermMeta }
					onToggleShouldShowTermMeta={ onToggleShouldShowTermMeta }
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
						onChange={ ( newTerm ) => setAttributes( { term: newTerm } ) }
						value={ term }
						multiline={ false }
					/>
					{ shouldShowTermMeta && <TermMetaData partOfSpeech={ partOfSpeech } phoneticTranscription={ phoneticTranscription } /> }
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
