/**
 * A collection of static methods to fetch/interpret the results of the dictionaryapi API endpoint.
 */
export default class DictionaryApi {
	/**
	 * Returns an iterable collection of objects so we can display a select list etc.
	 *
	 * @param  {object} definitionData The raw JSON results from a successful call to the API.
	 * @return {Array}                 A collection of options.
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
	 * For the given indices, fetches the result from the API search results data.
	 *
	 * @param  {object} definitionData The raw JSON results from a successful call to the API.
	 * @param  {Array}  indexArray     An array of indices pointing to a child property of the data. The order must correspond to the depth of the target value.
	 * @return {object}                The properties of the definition. The properties correspond to the expected block attributes.
	 */
	static getSelectedDefinition( definitionData, indexArray = [] ) {
		const definition = definitionData[ indexArray[0] ].meanings[ indexArray[1] ].definitions[ indexArray[2] ].definition;
		const partOfSpeech = definitionData[ indexArray[0] ].meanings[ indexArray[1] ].partOfSpeech;
		let isAbbreviation = false;
		if ( partOfSpeech === 'abbreviation' ) {
			isAbbreviation = true;
		}
		const phoneticTranscription = definitionData[ indexArray[0] ].phonetics[ indexArray[1] ]?.text || definitionData[ indexArray[0] ].phonetics[0]?.text;
		// TODO: add pronunciation audio. Low prio.
		//const newPhoneticAudio = definitionData[ indexArray[0] ].phonetics[ indexArray[1] ]?.audio || definitionData[ indexArray[0]  ].phonetics[0]?.audio;
		return { definition, partOfSpeech, phoneticTranscription, isAbbreviation };
	}

	/**
	 * Returns a concatenated URL to fetch a definition for a given term and language.
	 *
	 * @param  {string} term The search term.
	 * @param  {string} lang The locale.
	 * @return {string}      The URL.
	 */
	static getFetchUrl( term, lang = 'en' ) {
		return `https://api.dictionaryapi.dev/api/v2/entries/${ lang }/${ term }`;
	}
}
