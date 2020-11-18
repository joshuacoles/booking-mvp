import * as React from "react";
import * as dateFns from "date-fns";
import { LearningSlot } from "../App";

function genData(): LearningSlot[] {
  const no = Math.floor(Math.random() * 10);
  const events: LearningSlot[] = [];

  const startOfDay = dateFns.startOfDay(new Date());

  for (let i = 0; i < no; i++) {
    const no30 = Math.floor(Math.random() * 10);
    const start = dateFns.addMinutes(startOfDay, 30 * no30 + 60 * 16);
    const end = dateFns.addHours(start, 1);
    events.push({
      start,
      end,
    });
  }

  return events;
}

interface Props {
  date: Date;
  module: string;

  selectSlotForModule: (moduleId: string, slot: LearningSlot) => void;
}

interface SlotProps {
  slot: LearningSlot;
  onSelect: () => void;
}

export function Slot({ slot, onSelect }: SlotProps) {
  return (
    <div className="Event" onClick={onSelect}>
      {dateFns.format(slot.start, "HH:MM")} &mdash;{" "}
      {dateFns.format(slot.end, "HH:MM")}
    </div>
  );
}

export default function EventPicker({
  module,
  date,
  selectSlotForModule,
}: Props) {
  const data = genData();

  return (
    <div className="EventList">
      <h5
        style={{
          alignSelf: "start",
          paddingBottom: "0.5rem",
        }}
      >
        {dateFns.format(date, "PPPP")}
      </h5>

      {data.map((slot) => (
        <Slot slot={slot} onSelect={() => selectSlotForModule(module, slot)} />
      ))}
    </div>
  );
}
