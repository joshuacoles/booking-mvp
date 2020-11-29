import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { ModuleRef, railsData } from "../../data/railsData";
import { Stepper, Step } from "../Stepper";

import classes from './BookingSteps.module.css';
import classNames from "classnames";

import { FaTimes } from "react-icons/fa"
import { steps } from "../../data/bookingFlow";

function ModuleSelectionStep({ moduleRef }: { moduleRef: ModuleRef }) {
  const module = railsData.modules[moduleRef];

  return (
    <div>
      <div className={classes.stepTitle}>{module.moduleTitle}</div>
      {moduleRef === 3 && <div className={classes.stepBooking}>November 10th</div>}
    </div>
  );
}

function ConfirmingStep() {
  return (
    <div>
      <div className={classes.stepTitle}>Confirm</div>
    </div>
  );
}

export function BookingSteps() {
  const [current, select] = useState(1);
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current?.querySelector(`.${classes.selected}`)?.scrollIntoView({
      behavior: "smooth",
      block: "center",
      inline: "center"
    })
  }, [current])

  return (
    <div className={classes.BookingSteps}>
      <div className={classes.InnerBookingSteps}>
        <Stepper ref={ref}>
          {steps.map((step, index) => (
            // We use iconClassName & lineClassName to allow styling of these components using .[state] > .icon in
            // the .module.css
            <Step
              key={index}

              statusClassName={classNames({
                [classes.selected]: index === current,
                [classes.error]: index === 2,
                [classes.completed]: index < current,
              })}

              icon={index === 2 ? <FaTimes color={"#f44336"}/> : index + 1}

              stepClassName={classes.step}
              iconClassName={classes.icon}
              lineClassName={classes.line}

              onClick={() => select(index)}
            >
              {
                step.type === "confirming"
                  ? <ConfirmingStep/>
                  : <ModuleSelectionStep moduleRef={step.currentModule}/>
              }
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
