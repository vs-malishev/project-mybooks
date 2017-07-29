import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static PropTypes = {
		book: PropTypes.array.isRequired
	}

	render() {
		const { book, onShelfSelection } = this.props

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 188,
						backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
					<div className="book-shelf-changer">
						<select
							onChange={(event) => onShelfSelection(book, event.target.value)}
						>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{book.title}</div>
				{book.authors &&
				//checking if authors array defined. One record didn't have an authors array
					book.authors.map((author, index) => (
						<div key={index} className="book-authors">
							{author}
						</div>
					))
				}
			</div>
		)
	}

}

export default Book