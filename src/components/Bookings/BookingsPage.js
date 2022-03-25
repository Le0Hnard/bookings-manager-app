import React, { useState } from 'react';
import WeekPicker from './WeekPicker';
import BookablesList from '../Bookables/BookablesList';
import { Bookings } from './Bookings';

const BookingsPage = () => {
  const [bookable, setBookable] = useState(null);

  return (
    <main className="bookings-page">
      <BookablesList bookable={bookable} setBookable={setBookable} />
      <Bookings bookable={bookable} />
    </main>
  )
};

export default BookingsPage;
