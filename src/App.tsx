import * as React from "react";
import "./styles.css";
import { Button, ButtonGroup, Steps } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";

// See how this interacts with wanting a sticky step nav.
function DayColumnHeading(props: React.PropsWithChildren<any>) {
  // Explaination of this structure:
  //    - The .Box.Heading is the thing you actually see with the background colour and the such.
  //    - The .HeadingContainer is the thing with `position: sticky` which stays at the top of the page.
  //      - To do this we need a top/bottom/etc specified, this is given as -1 to basically be nothing.
  //    - The .HeadingSpacer is a fixed height thing which just provides a bit of padding on the top
  //      - Note we have to use this as paddding doesn't seem to work in stickies.
  return (
    <div className="HeadingContainer">
      <div className="HeadingSpacer" />
      <div className="Box Heading">{props.children}</div>
    </div>
  );
}

function DayColumn({ dayName }: { dayName: string }) {
  return (
    <div className="DayColumn">
      <DayColumnHeading>{dayName}</DayColumnHeading>

      <div className="Box Slot">11:12 &mdash; 22:22</div>
      <div className="Box Slot">14:12 &mdash; 22:22</div>
      <div className="Box Slot">16:12 &mdash; 22:22</div>
      <div className="Box Slot">16:12 &mdash; 22:22</div>
    </div>
  );
}

function ModuleList() {
  return (
    <div className="WeekSelector">
      <div className="InnerWeekSelector">
        <Steps current={1}>
          <Steps.Item title="Module 1" />
          <Steps.Item title="Module 2" />
          <Steps.Item title="Module 3" />
          <Steps.Item title="Module 4" />
          <Steps.Item title="Module 5" />
          <Steps.Item title="Module 6" />
        </Steps>
      </div>
    </div>
  );
}

function Controls() {
  return (
    <div className="Controls">
      <ButtonGroup style={{ marginLeft: "10px" }}>
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>
      Week 2
    </div>
  );
}

export default function App() {
  return (
    <div className="App">
      <ModuleList />
      <Controls />

      <div className="D1">
        <DayColumn dayName="Monday 23nd" />
        <DayColumn dayName="Tuesday 24th" />
        <DayColumn dayName="Wednesday 25th" />
        <DayColumn dayName="Thursday 26th" />
        <DayColumn dayName="Friday 27th" />
      </div>
    </div>
  );
}
