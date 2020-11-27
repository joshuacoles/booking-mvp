import * as React from "react";
import { LearningSlot } from "../data/types";
import { getSlotsFor } from "../data/railsData";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { Dispatch, SetStateAction } from "react";

dayjs.extend(advancedFormat)

// TODO See how this interacts with wanting a sticky step nav.
function DayColumnHeading(props: React.PropsWithChildren<any>) {
  // Explanation of this structure:
  //    - The .Box.Heading is the thing you actually see with the background colour and the such.
  //    - The .HeadingContainer is the thing with `position: sticky` which stays at the top of the page.
  //      - To do this we need a top/bottom/etc specified, this is given as -1 to basically be nothing.
  //    - The .HeadingSpacer is a fixed height thing which just provides a bit of padding on the top
  //      - Note we have to use this as paddding doesn't seem to work in stickies.
  return (
    <div className="HeadingContainer">
      <div className="HeadingSpacer"/>
      <div className="Box Heading">{props.children}</div>
    </div>
  );
}

function DayColumn({ dayName, slots }: { dayName: string, slots: LearningSlot[] }) {
  return (
    <div className="DayColumn">
      <DayColumnHeading>{dayName}</DayColumnHeading>
      {slots.map((slot, index) =>
        <div className="Box Slot" key={index}>
          {slot.start.format('HH:MM')} &mdash; {slot.end.format('HH:MM')}
        </div>
      )}
    </div>
  );
}

interface Props {
  selectedWeek: Dayjs
}

export function ModuleList(props: Props) {
  const dayOffsets = [1, 2, 3, 4, 5]
  const week = props.selectedWeek.startOf('week');
  const days = dayOffsets.map(dayOffset => week.day(dayOffset));

  return <div className="D1">
    {days.map((day, index) => (
      <DayColumn
        key={index}
        dayName={day.format('dddd Do')}
        slots={getSlotsFor('c1', day)}
      />
    ))}
  </div>;
}
