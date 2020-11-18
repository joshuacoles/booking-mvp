import * as React from "react";
import { Calendar } from "rsuite";

function Cell({ date, moduleNumber }: any) {
  return (
    <div className="Cell">
      <span>{moduleNumber}</span>
    </div>
  );
}

interface Props {
  currentSession: string
  selectedDate: Date
  setSelectedDate: (date: Date) => void
}

export default function DayPicker({ currentSession, selectedDate, setSelectedDate }: Props) {
  const renderCell = (date: Date) => <Cell date={date} moduleNumber={currentSession} />;
  
  return (
    <div>
      <Calendar bordered renderCell={renderCell} value={selectedDate} onSelect={setSelectedDate}/>
    </div>
  );
}
