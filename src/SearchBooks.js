import React, {Component} from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

class SearchBooks extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		searchResults: PropTypes.array.isRequired,
		onShelfSelection: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	/**
	* @description Update query and make a search call to API
	* @param {string} query
	*/
	updateQuery = (query) => {
		const { onSearchSubmit } = this.props
		this.setState((state) => ({
			query: query
		}))
		onSearchSubmit(query)
	}

	render() {
		const { books, searchResults, onShelfSelection } = this.props
		const { query} = this.state

		let results

		if (!Array.isArray(searchResults) || query === '') {
			results = []
		} else {
			results = searchResults
		}

		results.sort(sortBy('title'))

		for (let item of results) {
			for (let book of books) {
				if (item.id === book.id) {
					item.shelf = book.shelf
				}
			}
		}

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link
						to="/"
						className="close-search"
					>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							type="text"
							placeholder="Search by title or author"
							value={ query }
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{results.map((book, index) => (
							<li key={ index }>
								<Book
									onShelfSelection={ onShelfSelection }
									book={ book }
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}

}

export default SearchBooks
