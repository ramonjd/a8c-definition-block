/**
 * External dependencies.
 */
import {
	Button,
} from '@wordpress/components';

export default function SearchResults( { selectedId = '', searchResults = [], onSelectDefinition, title } ) {
	return(
		<>
			<h4 className="a8c-definition-block__search-results-title">{ title }</h4>
			<ol className="a8c-definition-block__search-results">
				{ 	searchResults.length && searchResults.map( ( option ) => (
					<li className={ `a8c-definition-block__search-results-item ${ selectedId === option.value ? 'is-selected' : '' }` }
						key={ option.value }
					>
						<Button className="a8c-definition-block__search-results-item-button" isTertiary onClick={ () => onSelectDefinition( option.value ) }>{ option.label }</Button>
					</li>
				) ) }
			</ol>
		</>
	);
}
