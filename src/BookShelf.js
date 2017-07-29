import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		shelfName: PropTypes.string.isRequired
	}

	render() {
		const { books, shelfName, onShelfSelection } = this.props

		console.log(this.props)
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfName}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book, index) => (
							<li key={index}>
								<Book
									book={book}
									onShelfSelection={onShelfSelection}
								/>
							</li>
						))}
					</ol>
				</div>
			</div>
		)
	}

}

export default BookShelf