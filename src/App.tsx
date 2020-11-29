import * as React from "react";

import { BookingSteps } from "./components/BookingSteps";
import { SlotPicker } from "./components/SlotPicker";
import { Controls } from "./components/Controls";


import "./styles.css";
import "rsuite/dist/styles/rsuite-default.css";
import { useState } from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { BookingState } from "./data/store";
import { BookingStep } from "./data/bookingFlow";

export default function App() {
  const [selectedWeek, setSelectedWeek] = useState(dayjs());
  const currentStep = useSelector<BookingState, BookingStep>(state => state.currentStep);

  return (
    <div className="App">
      <BookingSteps/>
      {
        currentStep.type === "selectingLearningSlot"
          ? <div className="AppContainer">
            <Controls selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}/>
            <SlotPicker selectedWeek={selectedWeek}/>
          </div>
          : "Done"
      }
    </div>
  );
}
