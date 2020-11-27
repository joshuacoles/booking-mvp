import * as React from "react";
import { Button, ButtonGroup } from "rsuite";

// TODO: Include way to select week from calendar (modal?)
export function Controls() {
  return (
    <div className="Controls">
      <ButtonGroup>
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>

      {/* Spacer */}
      <div style={{ width: '10px' }}/>

      <div className="WeekIndicator">
        Week 2
      </div>
    </div>
  );
}
