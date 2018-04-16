import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from './ListBooks';
import SearchPage from './SearchPage';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: [],
    query: '',
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books });
      //this.updateBook(this.state.books[0]);
    })
  }

  updateShelf = (event, book) => {
    const newShelf = event.target.value;

    this.setState((state) => {
      let tmp;

      if (state.books.some(b => b.id === book.id)) {
        tmp = state.books.map((b) => {
          if (b.id === book.id) {
            b.shelf = newShelf;
          }
          return b;
        });
      } else {
        // new books;
        tmp = state.books.concat(book);
      }

      return {
        books: tmp
      }
    })

    BooksAPI.update(book, newShelf);
  }


  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books}
                      shelf='currentlyReading'
                      onUpdateShelf={this.updateShelf}></ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books}
                      shelf='wantToRead'
                      onUpdateShelf={this.updateShelf}></ListBooks>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ListBooks books={this.state.books}
                      shelf='read'
                      onUpdateShelf={this.updateShelf}></ListBooks>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link
                to='/search'
              >Add a book</Link>
            </div>
          </div>
        )} />

        <Route path='/search' render={({ history }) => (
          <SearchPage books={this.state.books}
            onUpdateShelf={this.updateShelf}></SearchPage>
        )} />

      </div>
    )
  }
}

export default BooksApp
