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
	const localeData = getLocaleData();
	return localeData['']?.lang || 'en';
}
