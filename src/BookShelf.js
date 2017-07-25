import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		shelfName: PropTypes.string.isRequired
	}

	render() {
		const { books, shelfName } = this.props

		console.log(books)
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{shelfName}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						{books.map((book, index) => (
							<li key={index}><Book bookContent={book}/></li>
						))}
					</ol>
				</div>
			</div>
		)
	}

}

export default BookShelf