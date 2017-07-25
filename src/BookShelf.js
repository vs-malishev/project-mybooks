import React, {Component} from 'react'
import Book from './Book'
import PropTypes from 'prop-types'

class BookShelf extends Component {
	static PropTypes = {
		books: PropTypes.array.isRequired,
		shelfName: PropTypes.string.isRequired
	}

	render() {
		return (
			<div className="bookshelf">
				<h2 className="bookshelf-title">{this.props.shelfName}</h2>
				<div className="bookshelf-books">
					<ol className="books-grid">
						<Book/>
					</ol>
				</div>
			</div>
		)
	}

}

export default BookShelf