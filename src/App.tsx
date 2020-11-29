import * as React from "react";

import { BookingSteps } from "./components/BookingSteps";
import { SlotPicker } from "./components/SlotPicker";
import { Controls } from "./components/Controls";

import "./styles.css";
import "rsuite/dist/styles/rsuite-default.css";
import { useState } from "react";
import dayjs from "dayjs";

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(dayjs());

  return (
    <div className="App">
      <BookingSteps/>
      <Controls selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}/>
      <SlotPicker selectedWeek={selectedWeek}/>
    </div>
  );
}
