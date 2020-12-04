import { ModuleID, ModuleRef, railsData } from "./railsData";
import { BookingState } from "./store";
import { take } from "ramda";

export type BookingStep = {
  type: "selectingLearningSlot",
  currentModule: ModuleRef,
  index: number
} | {
  type: "confirming",
  index: number
};

export const BookingStep = {
  forModuleRef(moduleRef: ModuleRef): BookingStep {
    return { type: "selectingLearningSlot", currentModule: moduleRef, index: moduleRef };
  },

  forModuleId(moduleId: ModuleID): BookingStep {
    return this.forModuleRef(railsData.modules.findIndex(m => m.moduleId === moduleId));
  },

  nextStep(step: BookingStep): BookingStep {
    const nextStep = step.index + 1;

    // Don't overflow
    if (nextStep === steps.length) return step;
    else return steps[nextStep];
  },

  indexOf(step: BookingStep): number {
    return step.index;
  },

  forIndex(index: number): BookingStep {
    return steps[index]
  },

  isInError(step: BookingStep, selectedSlots: BookingState["selectedSlots"]) {
    if (step.type === "confirming") return false;

    // The first module can't be before its previous, it doesn't have one
    if (step.currentModule === 0) return false;

    const slotId = selectedSlots[railsData.modules[step.currentModule].moduleId];
    const prevSlotId = selectedSlots[railsData.modules[step.currentModule - 1].moduleId];

    if (typeof slotId === 'undefined' || typeof prevSlotId === 'undefined') return false;

    return railsData.getSlot(slotId).start.isBefore(railsData.getSlot(prevSlotId).end)
  },

  isSelectable(step: BookingStep, selectedSlots: BookingState["selectedSlots"]) {
    return take(step.index - 2, steps)
      .every(step => {
        if (step.type !== 'selectingLearningSlot') return true;

        return typeof selectedSlots[railsData.modules[step.currentModule].moduleId] !== "undefined";
      })
  }
}

export const steps: BookingStep[] = [
  ...railsData.modules.map((x, i) => BookingStep.forModuleRef(i)),
  { type: "confirming", index: railsData.modules.length }
];
