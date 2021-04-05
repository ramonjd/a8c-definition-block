export default class DictionaryApi {
	/**
	 * Returns an iterable collection of objects so we can display a select list etc.
	 */
	static getOptionsList( definitionData ) {
		const newDefinitionOptions = [];
		for ( const definitionsIndex in definitionData ) {
			if ( definitionData.hasOwnProperty( definitionsIndex ) && Array.isArray( definitionData[ definitionsIndex ].meanings ) ) {
				definitionData[ definitionsIndex ].meanings.forEach( ( meaning, meaningsIndex ) => {
					meaning.definitions.forEach( ( subDefinition, subDefinitionIndex ) => {
						newDefinitionOptions.push( {
							value: `${ definitionsIndex }-${ meaningsIndex }-${ subDefinitionIndex }`,
							label: `${ subDefinition.definition } [${ meaning.partOfSpeech }]`
						} );
					} );
				} );
			}
		}
		return newDefinitionOptions;
	}

	/**
	 * Returns an iterable collection of objects so we can display a select list etc.
	 */
	static getSelectedDefinition( definitionData, indexArray = [] ) {
		const definition = definitionData[ indexArray[0] ].meanings[ indexArray[1] ].definitions[ indexArray[2] ].definition;
		const partOfSpeech = definitionData[ indexArray[0] ].meanings[ indexArray[1] ].partOfSpeech;
		let isAbbreviation = false;
		if ( partOfSpeech === 'abbreviation' ) {
			isAbbreviation = true;
		}
		const phoneticTranscription = definitionData[ indexArray[0] ].phonetics[ indexArray[1] ]?.text || definitionData[ indexArray[0] ].phonetics[0]?.text;
		//const newPhoneticAudio = definitionData[ indexArray[0] ].phonetics[ indexArray[1] ]?.audio || definitionData[ indexArray[0]  ].phonetics[0]?.audio;
		return { definition, partOfSpeech, phoneticTranscription, isAbbreviation };
	}

	static getFetchUrl( term, lang = 'en' ) {
		return `https://api.dictionaryapi.dev/api/v2/entries/${ lang }/${ term }`;
	}
}
