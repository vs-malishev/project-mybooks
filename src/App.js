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

	render() {
		return (
			<div className="app">
				<Route path="/search" render={({ history }) => (
					<SearchBooks/>
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
								/>
								<BookShelf
									books={this.state.wantToRead}
									shelfName="Want to Read"
								/>
								<BookShelf
									books={this.state.read}
									shelfName="Read"
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
