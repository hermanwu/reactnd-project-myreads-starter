import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onUpdateShelf: PropTypes.func.isRequired,
    shelf: PropTypes.string.isRequired
  }

  render() {
    const { books, onUpdateShelf, shelf } = this.props;

    return (
      <ol className="books-grid">
        {
          books.filter((book) => {
            return shelf === 'none' || (book.shelf === shelf);
          }).map((book) => (
            <li key={book.id}>
              <div className="book">
                <div className="book-top">
                  <div className="book-cover"
                    style={{
                      width: 128, height: 188,
                      backgroundImage: `url(${book.imageLinks ? 
                        book.imageLinks.smallThumbnail : undefined})`
                    }}></div>
                  <div className="book-shelf-changer">
                    <select value={book.shelf}
                      onChange={(event) => onUpdateShelf(event, book)}>
                      <option value="" disabled>Move to...</option>
                      <option value="currentlyReading">Currently Reading</option>
                      <option value="wantToRead">Want to Read</option>
                      <option value="read">Read</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors}</div>
              </div>
            </li>
          ))
        }
      </ol>
    )
  }
}

export default ListBooks;