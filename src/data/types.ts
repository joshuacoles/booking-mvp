import { Dayjs } from "dayjs";
import { railsData } from "./railsData";

export type ModuleID = string;

export interface BookingState {
  currentStep: BookingStep
  selectedSlots: { [moduleId: string]: LearningSlot };
}

// TODO: Do we want to include some form of "fullness"
export interface LearningSlot {
  start: Dayjs
  end: Dayjs
}

export interface BookingStep {
  type: 'selectingLearningSlot'
  currentModuleId: ModuleID
}

export const BookingStep = {
  nextStep(current: BookingStep): BookingStep {
    const index = railsData.modules.findIndex(module => module.moduleId === current.currentModuleId);
    const newIndex = Math.max(0, Math.min(railsData.modules.length - 1, index + 1))
    return {
      type: "selectingLearningSlot",
      currentModuleId: railsData.modules[newIndex].moduleId
    }
  }
}
