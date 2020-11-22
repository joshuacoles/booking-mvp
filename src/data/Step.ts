import { LearningSlot, moduleIndex, staticData } from "./staticData";
import * as R from "ramda";
import * as dateFns from "date-fns";
import { BookingState, SerLearningSlot } from "./store";

export type Step = { type: 'selectingModule', currentModuleId: string } | { type: 'paying' };

export const Step = {
  steps: <Step[]>[...staticData.modules.map(module => ({
    type: 'selectingModule', currentModuleId: module.moduleId
  })), { type: "paying" }],

  title(step: Step): string {
    if (step.type === 'selectingModule') return `${staticData.modules[moduleIndex(step.currentModuleId)].moduleName}`;
    if (step.type === 'paying') return 'Pay'

    throw new Error("Unknown step");
  },

  stepIndex(step: Step): number {
    return R.findIndex(R.equals(step), this.steps);
  },

  nextStep(step: Step): Step {
    return this.steps[R.clamp(0, this.steps.length - 1, this.stepIndex(step) + 1)];
  },

  isAvailable(step: Step, selectedSlots: BookingState["selectedSlots"]) {
    const allModuleIds = staticData.modules.map(i => i.moduleId);
    if (step.type === 'paying' && allModuleIds.every(id => typeof selectedSlots[id] !== 'undefined')) return true;

    if (step.type === 'selectingModule') {
      const preceding = R.takeWhile(mId => mId !== step.currentModuleId, allModuleIds);
      if (preceding.every(id => typeof selectedSlots[id] !== 'undefined')) return true
    }

    return false;
  },

  isStepValid(step: Step, selectedSlots: BookingState["selectedSlots"]): boolean {
    const allModuleIds = staticData.modules.map(i => i.moduleId);

    const orderedSelectedSlots: (SerLearningSlot)[] =
      allModuleIds
        .map(id => selectedSlots[id])
        .filter(x => typeof x !== 'undefined'); // Order is preserved removing elements so this is fine

    return orderedSelectedSlots.every((slot, index) => {
      const succeeding = R.takeLast(orderedSelectedSlots.length - index - 1, orderedSelectedSlots);
      console.log(succeeding)

      return succeeding.every(succeedingSlot =>
        dateFns.isBefore(
          dateFns.parseISO(slot.end),
          dateFns.parseISO(succeedingSlot.start))
      )
    })
  }
};
