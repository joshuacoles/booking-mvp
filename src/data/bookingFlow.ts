import { ModuleID, ModuleRef, railsData } from "./railsData";

export type BookingStep = {
  type: "selectingLearningSlot",
  currentModule: ModuleRef
} | {
  type: "confirming"
};
export const BookingStep = {
  forModuleRef(moduleRef: ModuleRef): BookingStep {
    return { type: "selectingLearningSlot", currentModule: moduleRef };
  },

  forModuleId(moduleId: ModuleID): BookingStep {
    return { type: "selectingLearningSlot", currentModule: railsData.modules.findIndex(m => m.moduleId === moduleId) };
  },

  nextStep(step: BookingStep): BookingStep {
    switch (step.type) {
      case "selectingLearningSlot":
        const nextModule = step.currentModule + 1;

        // If we are done selecting, move to confirming
        if (nextModule === railsData.modules.length) return { type: "confirming" }

        // Else next module
        return { type: "selectingLearningSlot", currentModule: nextModule };

      case "confirming":
        // In the case of confirming we are done, this shouldn't really happen,
        // use the confirm button instead.
        return step
    }
  },
}
export const steps: BookingStep[] = [
  ...railsData.modules.map((x, i) => BookingStep.forModuleRef(i)),
  { type: "confirming" }
];
