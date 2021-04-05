/**
 * External dependencies.
 */
import { RichText, useBlockProps } from '@wordpress/block-editor';
import TermMetaData from './components/term-metadata';

/**
 * Save method. Renders the frontend markup.
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const {
		definition,
		term,
		isAbbreviation,
		partOfSpeech,
		phoneticTranscription,
		shouldShowTermMeta
	} = attributes;
	const blockProps = useBlockProps.save( {
		className: 'a8c-definition-block'
	} );
	const definitionTagName = isAbbreviation ? 'abbr' : 'dfn';

	return (
		<dl { ...blockProps }>
			<dt className="a8c-definition-block__term">
				<RichText.Content
					className="a8c-definition-block__term-text"
					id="a8c-definition-term"
					tagName={ definitionTagName }
					value={ term }
				/>
				{ shouldShowTermMeta && <TermMetaData partOfSpeech={ partOfSpeech } phoneticTranscription={ phoneticTranscription } /> }
			</dt>
			<RichText.Content
				className="a8c-definition-block__definition a8c-definition-block__term-definition"
				role="definition"
				aria-labelledby="a8c-definition-term"
				tagName="dd"
				value={ definition }
			/>
		</dl>
	);
}
