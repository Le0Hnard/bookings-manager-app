import React, { useReducer, useState } from 'react';
import { getWeek } from '../../utils/date-wrangler';
import WeekPicker from './WeekPicker';
import BookingsGrid from './BookingsGrid';
import BookingDetails from './BookingDetails';
import weekReducer from './weekReducer';

export const Bookings = ({ bookable }) => {
  const [week, dispatch] = useReducer(weekReducer, new Date(), getWeek);
  const [booking, setBooking] = useState(null);

  return (
    <div className="bookings">
      <div>
        <WeekPicker dispatch={dispatch} />
        <BookingsGrid week={week} bookable={bookable} booking={booking} setBooking={setBooking} />
        <BookingDetails booking={booking} bookable={bookable} />
      </div>
    </div>
  )
}