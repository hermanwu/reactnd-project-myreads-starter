import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';


class SearchPage extends Component {
  static propTypes = {
  }

  state = {
    query: '',
    searchResults: [],
  }

  searchBooks = (query) => {
    const trimedQuery = query.trim();

    this.setState({ query: trimedQuery });

    if (trimedQuery) {
      return BooksAPI.search(trimedQuery).then((results) => {
        if (Array.isArray(results)) {
          this.setState({ searchResults: results});
        } else {
          this.setState({ searchResults: []});
        }
      });
    }
  }

  updateQuery = (query) => {
    const trimedQuery = query.trim();
    if (this.state.query != trimedQuery) {
      debugger;
      this.setState({ query: trimedQuery });
      this.searchBooks(trimedQuery);
    }
  }

  updateShelf = (event, book) => {
    const newShelf = event.target.value;

    this.setState((state) => {
      books: state.books.map((b) => {
        if (b.id === book.id) {
          b.shelf = newShelf;
        }
        return b;
      })
    })

    BooksAPI.update(book, newShelf);
  }

  render() {
    const { query, searchResults } = this.state;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className='close-search' to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              value={query}
              onChange={(event) => this.searchBooks(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        <div className="search-books-results">
          <ListBooks books={searchResults}
            shelf='none'
            onUpdateShelf={this.updateShelf}>
          </ListBooks>
        </div>
      </div>
    )


  }
}

export default SearchPage;