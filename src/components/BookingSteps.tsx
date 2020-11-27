import * as React from "react";
import { useState } from "react";

import { railsData } from "../data/railsData";
import { Stepper, Step } from "./Stepper";

// TODO: Add selected module as small text below the module name, do not make the top bigger when we do this
export function BookingSteps() {
  const [current, select] = useState(1);

  return (
    <div className="WeekSelector">
      <div className="InnerWeekSelector">
        <Stepper>
          {railsData.modules.map((module, index) => (
            <Step
              icon={index + 1}

              style={index == 2 ? { backgroundColor: '#ddd', borderRadius: '10px' } : undefined}

              className={""}
              iconClassName={""}
              lineClassName={""}
            >
              <div>
                <div style={{ fontSize: '1.2em', fontWeight: 'bold' }}>{module.moduleTitle}</div>
                <div style={{ fontSize: '0.9em' }}>November 10th</div>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
