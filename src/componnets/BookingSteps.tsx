import * as React from "react";
import { Steps } from "rsuite";

export function BookingSteps() {
  return (
    <div className="WeekSelector">
      <div className="InnerWeekSelector">
        <Steps current={1}>
          <Steps.Item title="Module 1"/>
          <Steps.Item title="Module 2"/>
          <Steps.Item title="Module 3"/>
          <Steps.Item title="Module 4"/>
          <Steps.Item title="Module 5"/>
          <Steps.Item title="Module 6"/>
        </Steps>
      </div>
    </div>
  );
}
