import * as React from "react";

import { BookingSteps } from "./componnets/BookingSteps";
import { ModuleList } from "./componnets/ModuleList";

import "rsuite/dist/styles/rsuite-default.css";
import "./styles.css";
import { Controls } from "./componnets/Controls";

export default function App() {
  return (
    <div className="App">
      <BookingSteps/>
      <Controls/>
      <ModuleList/>
    </div>
  );
}
