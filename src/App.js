import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: [],
		searchResults: []
	}

	/**
	* @description Method to make a call to get all books
	*/
	componentDidMount() {
		BooksAPI.getAll().then((books) => {

			this.setState({
				books: books
			})
		})
	}

	/**
	* @description Method to make a call and update shelf param in the selected book
	* @param {object} book
	* @param {string} shelf
	*/
	moveBook = (book, shelf) => {
		if (!book || !shelf) {
			return
		}

		if (book.shelf !== shelf) {
			BooksAPI.update(book, shelf).then((result) => {
				book.shelf = shelf

				this.setState(state => ({
					books: state.books.filter(b => b.id !== book.id).concat([ book ])
				}))
			})
		}
	}

	/**
	* @description Method to make a call and search the books based in the query
	* @param {string} query
	*/
	searchBooks = (query) => {
		if (!query || query === '') {
			return
		}

		const maxResults = 20

		BooksAPI.search(query, maxResults).then((books) => {
			this.setState({
				searchResults: books
			})
		})
	}

	render() {
		const { books, searchResults } = this.state
		const wantToRead = books.filter(book => book.shelf === 'wantToRead')
		const currentlyReading = books.filter(book => book.shelf === 'currentlyReading')
		const read = books.filter(book => book.shelf === 'read')

		return (
			<div className="app">
				<Route path="/search" render={({ history }) => (
					<SearchBooks
						onSearchSubmit={ this.searchBooks }
						searchResults={ searchResults }
						onShelfSelection={ this.moveBook }
					/>
				)}/>
				<Route exact path="/" render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<BookShelf
									books={ currentlyReading }
									shelfName="Currently Reading"
									onShelfSelection={ this.moveBook }
								/>
								<BookShelf
									books={ wantToRead }
									shelfName="Want to Read"
									onShelfSelection={ this.moveBook }
								/>
								<BookShelf
									books={ read }
									shelfName="Read"
									onShelfSelection={ this.moveBook }
								/>
							</div>
						</div>
						<div className="open-search">
							<Link
								to="/search"
							>Add a book</Link>
						</div>
					</div>
				)}/>
			</div>
		)
	}
}

export default BooksApp
