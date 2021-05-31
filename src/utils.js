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
