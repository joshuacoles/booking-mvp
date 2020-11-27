import * as React from "react";
import { useEffect, useRef, useState } from "react";

import { railsData } from "../data/railsData";
import { Stepper, Step } from "./Stepper";

import classes from './BookingSteps.module.css';
import classNames from "classnames";

import { FaTimes } from "react-icons/fa"

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
    <div className="WeekSelector">
      <div className="InnerWeekSelector">
        <Stepper ref={ref}>
          {railsData.modules.map((module, index) => (
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
              <div>
                <div className={classes.stepTitle}>{module.moduleTitle}</div>
                {index === 3 && <div className={classes.stepBooking}>November 10th</div>}
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    </div>
  );
}
