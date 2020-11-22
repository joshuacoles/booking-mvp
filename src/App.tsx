import React from "react";
import { useSelector } from "react-redux";

import { bookingStepSelector } from "./data/store";

import { Calendar } from "rsuite";

import BookingSteps from "./components/BookingSteps";
import Cell from "./components/Cell";

import "./styles.css";
import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
  const step = useSelector(bookingStepSelector);

  return (
    <div className="App">
      <div className="Card">
        <BookingSteps/>

        <hr/>

        {
          step.type === 'selectingModule' ?
            <Calendar renderCell={(date) => <Cell date={date}/>}/> :
            <span>pay here</span>
        }
      </div>
    </div>
  );
}
