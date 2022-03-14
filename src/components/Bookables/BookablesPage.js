import React from 'react';
import BookablesList from './BookablesList';
import BookablesView from './BookablesView';

const BookablesPage = () => {
  return (
    <main className="bookables-page">
      {/* <BookablesList /> */}
      <BookablesView />
    </main>
  )
};

export default BookablesPage;
