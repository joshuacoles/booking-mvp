import * as React from "react";
import { Button, ButtonGroup } from "rsuite";

export function Controls() {
  return (
    <div className="Controls">
      <ButtonGroup>
        <Button>Previous</Button>
        <Button>Next</Button>
      </ButtonGroup>

      <div style={{ width: '10px' }}/>

      <div className="WeekIndicator">
        Week 2
      </div>
    </div>
  );
}
