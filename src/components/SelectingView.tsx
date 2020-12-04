import * as React from "react";
import { useState } from "react";

import { Controls } from "./Controls";
import { SlotPicker } from "./SlotPicker";

import dayjs from "dayjs";

export function SelectingView() {
  const [selectedWeek, setSelectedWeek] = useState(dayjs());

  return <div className="AppContainer">
    <Controls selectedWeek={selectedWeek} setSelectedWeek={setSelectedWeek}/>
    <SlotPicker selectedWeek={selectedWeek}/>
  </div>;
}
