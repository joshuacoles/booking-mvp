import * as React from "react";
import { Steps } from "rsuite";
import { useState } from "react";

import { railsData } from "../data/railsData";

// TODO: Add selected module as small text below the module name, do not make the top bigger when we do this
export function BookingSteps() {
  const [current, select] = useState(1);

  return (
    <div className="WeekSelector">
      <div className="InnerWeekSelector">
        <Steps current={current}>
          {railsData.modules.map((module, index) => (
            <Steps.Item
              title={module.moduleTitle}
              onClick={() => select(index)}
            />
          ))}
        </Steps>
      </div>
    </div>
  );
}
