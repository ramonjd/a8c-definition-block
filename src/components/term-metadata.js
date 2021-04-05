/**
 * External dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Term metadata to render in both the editor and the save methods.
 *
 * @param  {object}    Props.
 * @return {WPElement} Element to render.
 */
export default function TermMetaData( { partOfSpeech, phoneticTranscription } ) {
	const shouldShowTermMetaData = !! partOfSpeech || !! phoneticTranscription;

	if ( ! shouldShowTermMetaData ) {
		return null;
	}

	return (
		<span className="a8c-definition-block__definition a8c-definition-block__term-metadata">
			{ partOfSpeech &&
				<span
					aria-label={ __( 'The part of speech indicates how the word functions in meaning as well as grammatically within the sentence.', 'a8c-definition-block' ) }
					className="a8c-definition-block__term-metadata-item">
						{ partOfSpeech }
				</span>
			}
			{ phoneticTranscription &&
				<span
					className="a8c-definition-block__term-metadata-item">
						{ phoneticTranscription }
				</span>
			}
		</span>
	);
}
