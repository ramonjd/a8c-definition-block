/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';

/**
 * Internal dependencies
 */

const useFetchDefinition = ( initialValue = '' ) => {
	const [ isFetching, setIsFetching ] = useState( false );
	const [ definition, setDefinition ] = useState( initialValue );
	const [ definitionData, setDefinitionData ] = useState( {} );

	// TODO: support other locales.
	const fetchURL = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

	useEffect( () => {
		if ( ! definition ) {
			return;
		}

		const fetchResults = async () => {
			setIsFetching( true );

			const definitionFetch = await fetch( fetchURL + definition )
				.then( ( response ) => {
					if ( response.ok ) {
						return response;
					}
					return false;
				} )
				.catch( () => {
					return false;
				} );

			if ( definitionFetch ) {
				const definitionResponse = await definitionFetch.json();
				setDefinitionData( {
					definition,
					...definitionResponse
				} );
			}
			setIsFetching( false );
		};

		fetchResults();
	}, [ definition ] );

	return { isFetching, definitionData, fetchDefinition: setDefinition };
};

export default useFetchDefinition;
