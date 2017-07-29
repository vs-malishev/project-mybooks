import React from 'react'
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import {Link} from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
		/**
		 * TODO: Instead of using this state variable to keep track of which page
		 * we're on, use the URL in the browser's address bar. This will ensure that
		 * users can use the browser's back and forward buttons to navigate between
		 * pages, as well as provide a good URL they can bookmark and share.
		 */
		read: [],
		wantToRead: [],
		currentlyReading: [],
		searchResults: [],
		showSearchPage: true
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			let read = []
			let currentlyReading = []
			let wantToRead = []

			for(let i in books) {
				if (books[i].shelf === 'read') {
					read.push(books[i])
				}

				if (books[i].shelf === 'currentlyReading') {
					currentlyReading.push(books[i])
				}

				if (books[i].shelf === 'wantToRead') {
					wantToRead.push(books[i])
				}
			}

			this.setState((state) => ({
				read: read,
				currentlyReading: currentlyReading,
				wantToRead: wantToRead
			}))

			console.log(this.state)
		})
	}

	moveBook(book, shelf) {
		BooksAPI.update(book, shelf).then((result) => {
			console.log('book has been updated');
		})
	}

	searchBooks(query) {
		BooksAPI.search(query).then((result) => {
			this.setState((state) => ({
				searchResults: result
			}))
		})
	}

	render() {
		return (
			<div className="app">
				<Route path="/search" render={({ history }) => (
					<SearchBooks
						onSearch="this.searchBooks"
						searchResults={this.state.searchResults}
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
									books={this.state.currentlyReading}
									shelfName="Currently Reading"
									onShelfSelection={this.moveBook}
								/>
								<BookShelf
									books={this.state.wantToRead}
									shelfName="Want to Read"
									onShelfSelection={this.moveBook}
								/>
								<BookShelf
									books={this.state.read}
									shelfName="Read"
									onShelfSelection={this.moveBook}
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
