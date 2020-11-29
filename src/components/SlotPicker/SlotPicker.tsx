import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { LearningSlot, getSlotsFor } from "../../data/railsData";

import classes from "./SlotPicker.module.css";

dayjs.extend(advancedFormat)

function DayColumn({ dayName, slots }: { dayName: string, slots: LearningSlot[] }) {
  return (
    <div className={classes.DayColumn}>
      <div className={classes.Heading}>{dayName}</div>

      {slots.map((slot, index) =>
        <div className={classes.Slot} key={index}>
          {slot.start.format('HH:MM')} &mdash; {slot.end.format('HH:MM')}
        </div>
      )}
    </div>
  );
}

interface Props {
  selectedWeek: Dayjs
}

export function SlotPicker(props: Props) {
  const dayOffsets = [1, 2, 3, 4, 5]
  const week = props.selectedWeek.startOf('week');
  const days = dayOffsets.map(dayOffset => week.day(dayOffset));

  return <div className={classes.SlotPicker}>
    {days.map((day, index) => (
      <DayColumn
        key={index}
        dayName={day.format('dddd Do')}
        slots={getSlotsFor('c1', day)}
      />
    ))}
  </div>;
}
