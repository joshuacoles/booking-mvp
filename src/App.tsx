import * as React from "react";

import { BookingSteps } from "./componnets/BookingSteps";
import { ModuleList } from "./componnets/ModuleList";
import { Controls } from "./componnets/Controls";

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
