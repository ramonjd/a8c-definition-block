/**
 * External dependencies.
 */
import { getLocaleData } from '@wordpress/i18n';

export function getLocaleFromLocaleData() {
	const localeData = getLocaleData();
	return localeData['']?.lang || 'en';
}
