import * as React from "react";

import { useSelector } from "react-redux";

import { BookingState } from "./data/store";
import { BookingStep } from "./data/bookingFlow";
import { BookingSteps } from "./components/BookingSteps";

import { ConfirmationView } from "./components/ConfirmationView";
import { SelectingView } from "./components/SelectingView";

import "rsuite/dist/styles/rsuite-default.css";
import "./styles.css";

export default function App() {
  const currentStep = useSelector<BookingState, BookingStep>(state => state.currentStep);

  return (
    <div className="App">
      <BookingSteps/>

      {currentStep.type === "selectingLearningSlot" ? <SelectingView/> : <ConfirmationView/>}
    </div>
  );
}
