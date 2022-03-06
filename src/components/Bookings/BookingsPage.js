import React from 'react';
import WeekPicker from './WeekPicker';

const BookingsPage = () => {
  return (
    <main className="bookings-page">
      <p>Bookeings!</p>
      <WeekPicker date={new Date()} />
    </main>
  )
};

export default BookingsPage;
