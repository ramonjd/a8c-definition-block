/**
 * External dependencies
 */
import { useEffect, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import DictionaryApi from './lib/class-dictionary-api';
import { getLocaleFromLocaleData } from './utils';

/**
 * A hook to fetch a dictionary definition from an API.
 *
 * @param {string} initialSearchTermValue The initial value of the search term.
 * @return {object}                       A object of methods and properties to access API request data.
 */
const useFetchDefinition = ( initialSearchTermValue = '' ) => {
	const [ isFetching, setIsFetching ] = useState( false );
	const [ term, setTerm ] = useState( initialSearchTermValue );
	const [ definitionData, setDefinitionData ] = useState( {} );
	const [ errorMessage, setErrorMessage ] = useState( '' );

	useEffect( () => {
		if ( ! term ) {
			return;
		}

		setErrorMessage( '' );

		// TODO: support other locales. Medium priority.
		// TODO: support other dictionary sources. Low priority.
		const fetchUrl = DictionaryApi.getFetchUrl( term, getLocaleFromLocaleData() );

		const fetchResults = async () => {
			setIsFetching( true );

			const definitionFetch = await fetch( fetchUrl )
				.then( ( response ) => {
					if ( response.ok ) {
						return response;
					}
					setErrorMessage( __( 'Sorry, we couldn\'t find a definition.', 'a8c-definition-block' ) );
					return false;
				} )
				.catch( () => {
					setErrorMessage( __( 'Sorry, we couldn\'t find a definition.', 'a8c-definition-block' ) );
					return false;
				} );

			if ( definitionFetch ) {
				const definitionResponse = await definitionFetch.json();
				setDefinitionData( {
					term,
					...definitionResponse
				} );
			}
			setIsFetching( false );
		};

		fetchResults();
	}, [ term ] );

	return { isFetching, definitionData, errorMessage, fetchDefinition: setTerm };
};

export default useFetchDefinition;
