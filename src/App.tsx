import * as React from "react";
import "./styles.css";
import "rsuite/dist/styles/rsuite-default.css";

import * as R from "ramda";

import DayPicker from "./components/DayPicker";
import EventPicker from "./components/EventPicker";
import ModulePicker from "./components/ModulePicker";
import SelectedSlots from "./components/SelectedSlots";

export interface LearningSlot {
  start: Date;
  end: Date;
}

export default function App() {
  const [choosingModule, setChoosingModule] = React.useState("1");
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const [chosenSlots, setChosenSlots] = React.useState<{
    [moduleId: string]: LearningSlot | undefined;
  }>(Object.create(null));

  const selectSlotForModule = (moduleId: string, slot: LearningSlot) => {
    setChosenSlots(R.assoc(moduleId, slot));
    setChoosingModule((old) => (+old === 6 ? "6" : (+old + 1).toString()));
  };

  const removeSlotForModule = (moduleId: string) =>
    setChosenSlots(R.dissoc(moduleId));
  return (
    <div className="App">
      <DayPicker
        currentSession={choosingModule}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <div className="EventSidebar">
        <ModulePicker
          selectedSession={choosingModule}
          onSelect={setChoosingModule}
        />

        <EventPicker
          module={choosingModule}
          date={selectedDate}
          selectSlotForModule={selectSlotForModule}
        />

        <div style={{ flexGrow: 1 }} />

        <SelectedSlots
          chosenSlots={chosenSlots}
          removeModulesSlot={removeSlotForModule}
        />
      </div>
    </div>
  );
}
