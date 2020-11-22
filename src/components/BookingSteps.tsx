import React from "react";
import { Steps } from "rsuite";

import { bookingSlice, bookingStepSelector, selectedSlotsSelector, SerLearningSlot } from "../data/store";
import { useDispatch, useSelector } from "react-redux";

import * as dateFns from "date-fns";
import { Step } from "../data/Step";

function formatSlot(slot: SerLearningSlot | undefined) {
  if (typeof slot === 'undefined') return undefined;
  return dateFns.format(dateFns.parseISO(slot.start), 'dd/MM HH:MM') + " — " + dateFns.format(dateFns.parseISO(slot.end), 'HH:MM');
}

export default function BookingSteps() {
  const dispatch = useDispatch();
  const selectStep = React.useCallback(
    (step: Step) => dispatch(bookingSlice.actions.selectStep({ step })),
    [dispatch]
  );

  const steps = Step.steps;
  const currentStep = useSelector(bookingStepSelector);
  const selectedSlots = useSelector(selectedSlotsSelector);

  return (<Steps current={Step.stepIndex(currentStep)}>
    {steps.map(step => (
      <Steps.Item
        title={Step.title(step)}
        stepNumber={Step.stepIndex(step) + 1}
        status={!Step.isStepValid(step, selectedSlots) ? 'error' : undefined}

        onClick={() => Step.isAvailable(step, selectedSlots) ? selectStep(step) : null}
        description={step?.type === 'selectingModule' ? formatSlot(selectedSlots[step.currentModuleId]) : undefined}
      />
    ))}
  </Steps>);
}
