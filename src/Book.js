import React, {Component} from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
	static PropTypes = {
		bookContent: PropTypes.array.isRequired
	}

	render() {
		const { bookContent } = this.props

		return (
			<div className="book">
				<div className="book-top">
					<div className="book-cover" style={{
						width: 128,
						height: 188,
						backgroundImage: `url(${bookContent.imageLinks.thumbnail})` }}></div>
					<div className="book-shelf-changer">
						<select>
							<option value="none" disabled>Move to...</option>
							<option value="currentlyReading">Currently Reading</option>
							<option value="wantToRead">Want to Read</option>
							<option value="read">Read</option>
							<option value="none">None</option>
						</select>
					</div>
				</div>
				<div className="book-title">{bookContent.title}</div>
				{bookContent.authors.map((author, index) => (
					<div key={index} className="book-authors">
						{author}
					</div>
				))}
			</div>
		)
	}

}

export default Book