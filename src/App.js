import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBooks from './SearchBooks'
import './App.css'

class BooksApp extends React.Component {
	state = {
		shelves: {
			read: [],
			currentlyReading: [],
			wantToRead: []
		},
		searchResults: []
	}

	sortBooks = (books) => {
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

		return {
			read: read,
			currentlyReading: currentlyReading,
			wantToRead: wantToRead
		}
	}

	updateShelves = (book, shelf) => {
		let currentShelf

		if (!book || !shelf) {
			return
		}

		currentShelf= this.state.shelves[book.shelf]

		if (shelf !== 'none') {
			this.state.shelves[shelf].push(book)
			book.shelf = shelf
		}

		if (currentShelf) {
			currentShelf.splice(currentShelf.indexOf(book), 1)
		}

		this.setState(this.state.shelves)
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			let shelves = this.sortBooks(books)

			this.setState({
				shelves: shelves
			})
		})
	}

	moveBook = (book, shelf) => {
		if (!book || !shelf) {
			return
		}

		BooksAPI.update(book, shelf).then((result) => {
			this.updateShelves(book, shelf)
		})
	}

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
		return (
			<div className="app">
				<Route path="/search" render={({ history }) => (
					<SearchBooks
						onSearchSubmit={ this.searchBooks }
						searchResults={ this.state.searchResults }
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
									books={ this.state.shelves.currentlyReading }
									shelfName="Currently Reading"
									onShelfSelection={ this.moveBook }
								/>
								<BookShelf
									books={ this.state.shelves.wantToRead }
									shelfName="Want to Read"
									onShelfSelection={ this.moveBook }
								/>
								<BookShelf
									books={ this.state.shelves.read }
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
