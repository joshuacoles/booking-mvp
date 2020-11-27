import { ModuleID } from "./types";

export interface BookingStep {
  type: 'selectingLearningSlot'
  currentModuleId: ModuleID
}
