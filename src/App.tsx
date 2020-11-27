import * as React from "react";

import { BookingSteps } from "./components/BookingSteps";
import { ModuleList } from "./components/ModuleList";
import { Controls } from "./components/Controls";

import "./styles.css";
import "rsuite/dist/styles/rsuite-default.css";

export default function App() {
  return (
    <div className="App">
      <BookingSteps/>
      <Controls/>
      <ModuleList/>
    </div>
  );
}
