import * as React from "react";
import { LearningSlot } from "../data/types";
import { getSlotsFor } from "../data/railsData";
import dayjs from "dayjs";

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

export function ModuleList() {
  return <div className="D1">
    <DayColumn dayName="Monday 23nd" slots={getSlotsFor('c1', dayjs('2020-11-23'))}/>
    <DayColumn dayName="Tuesday 24th" slots={getSlotsFor('c1', dayjs('2020-11-24'))}/>
    <DayColumn dayName="Wednesday 25th" slots={getSlotsFor('c1', dayjs('2020-11-25'))}/>
    <DayColumn dayName="Thursday 26th" slots={getSlotsFor('c1', dayjs('2020-11-26'))}/>
    <DayColumn dayName="Friday 27th" slots={getSlotsFor('c1', dayjs('2020-11-27'))}/>
  </div>;
}
