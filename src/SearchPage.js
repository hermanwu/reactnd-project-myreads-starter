import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

import * as BooksAPI from './BooksAPI';


class SearchPage extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
  }

  state = {
    query: '',
    searchResults: [],
  }

  searchBooks = (query) => {
    const trimedQuery = query.trim();

    this.setState({ query: trimedQuery });

    if (!trimedQuery) {
      this.setState({ searchResults: [] });
    } else {
      BooksAPI.search(trimedQuery).then((results) => {
        if (Array.isArray(results)) {
          const ownedBooks = this.props.books;

          results = results.map(book => {

            const tmp = ownedBooks.filter(ownedBook => book.id === ownedBook.id);

            if (tmp.length > 0) {
              book.shelf = tmp[0].shelf;
            } else {
              book.shelf = 'none';
            }

            return book;
          });

          this.setState({ searchResults: results });
        } else {
          this.setState({ searchResults: [] });
        }
      });
    }
  }

  onUpdateSearchShelf = (event, book) => {
    const newShelf = event.target.value;

    // Update search shelf;
    this.setState((state) => {
      return {
        searchResults: state.searchResults.map((sr) => {
          if (sr.id === book.id) {
            sr.shelf = newShelf;
          }
          return sr;
        })
      }
    })

    // Update own shelf;
    this.props.onUpdateShelf(event, book);
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
            onUpdateShelf={this.onUpdateSearchShelf}>
          </ListBooks>
        </div>
      </div>
    )
  }
}

export default SearchPage;