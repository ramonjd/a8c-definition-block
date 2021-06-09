/**
 * External dependencies.
 */
import { getLocaleData } from '@wordpress/i18n';

/**
 * Returns current locale slug.
 *
 * @return {string} The locale slug.
 */
export function getLocaleFromLocaleData() {
	return 'en';
/*	const localeData = getLocaleData();
	return localeData && localeData['']?.lang || 'en';*/
}

/**
 * Returns a member from a collection of objects where key === value.
 *
 * @param {Array<Object>}           collection The collection to search.
 * @param {String}                  key        The property name.
 * @param {String|Number|Boolean}   value      The value of the property.
 * @return {Object|null}                       The locale slug.
 */
export function findInCollection( collection, key, value ) {
	if ( collection instanceof Object ) {
		return collection.find( item => item[ key ] === value );
	}
	return null;
}
