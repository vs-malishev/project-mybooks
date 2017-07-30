import React, {Component} from 'react'
import Book from './Book'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class SearchBooks extends Component {
	static PropTypes = {
		results: PropTypes.array.isRequired,
		onSearchSubmit: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		const { onSearchSubmit } = this.props
		let keyword = query.trim()

		this.setState({ query: keyword })

		onSearchSubmit(keyword)
	}

	render() {
		const { searchResults, onShelfSelection } = this.props
		const { query} = this.state

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
							value={query}
							onChange={(event) => this.updateQuery(event.target.value)}
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{Array.isArray(searchResults) && (
							searchResults.map((book, index) => (
								<li key={index}>
									<Book
										onShelfSelection={onShelfSelection}
										book={book}
									/>
								</li>
							))
						)}
					</ol>
				</div>
			</div>
		)
	}

}

export default SearchBooks
