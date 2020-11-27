import { BookingStep } from "./BookingStep";
import { Dayjs } from "dayjs";

export interface BookingState {
  currentStep: BookingStep
  selectedSlots: { [moduleId: string]: LearningSlot };
}

export type ModuleID = string;

// TODO: Do we want to include some form of "fullness"
export interface LearningSlot {
  start: Dayjs
  end: Dayjs
}
