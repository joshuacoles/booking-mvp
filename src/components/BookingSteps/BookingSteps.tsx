import * as React from "react";
import { useEffect, useRef } from "react";

import { LearningSlot, ModuleRef, railsData } from "../../data/railsData";
import { Stepper, Step } from "../Stepper";

import classes from './BookingSteps.module.css';
import classNames from "classnames";

import { FaTimes } from "react-icons/fa"
import { BookingStep, steps } from "../../data/bookingFlow";
import { useDispatch, useSelector } from "react-redux";
import { actions, BookingState } from "../../data/store";

function ModuleSelectionStep({ moduleRef }: { moduleRef: ModuleRef }) {
  const module = railsData.modules[moduleRef];
  const selectedSlot = useSelector<BookingState, LearningSlot | undefined>(state => railsData.getSlot(state.selectedSlots[module.moduleId]));

  return (
    <div>
      <div className={classes.stepTitle}>{module.moduleTitle}</div>
      {selectedSlot && <div className={classes.stepBooking}>
        {selectedSlot.start.format("MMMM Do")}
      </div>}
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
  const dispatch = useDispatch();

  const current = useSelector<BookingState, number>(state => BookingStep.indexOf(state.currentStep));
  const selectedSlots = useSelector<BookingState, BookingState["selectedSlots"]>(state => state.selectedSlots);

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
                [classes.error]: BookingStep.isInError(step, selectedSlots),
                [classes.completed]: index < current,
              })}

              icon={BookingStep.isInError(step, selectedSlots) ? <FaTimes color={"#f44336"}/> : index + 1}

              stepClassName={classes.step}
              iconClassName={classes.icon}
              lineClassName={classes.line}

              onClick={() => dispatch(actions.moveToStep({ step: BookingStep.forIndex(index) }))}
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
