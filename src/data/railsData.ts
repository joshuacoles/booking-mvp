import { fakeRailsData, getSlotsFor as _getSlotsFor } from "./fake-data-gen";
import { Dayjs } from "dayjs";

export type ModuleID = string;
export type WeekRef = Dayjs;
export type ModuleRef = number;

export interface Module {
  moduleId: string
  moduleTitle: string
}

// TODO: Do we want to include some form of "fullness"
export interface LearningSlot {
  start: Dayjs
  end: Dayjs
}

export interface RailsData {
  modules: Module[];

  // TODO: We may want to query this from the server as we need it rather than all at once but the shape
  //       will be the same.
  availableSlots: { [moduleId: string]: { [startOfDayISO: string]: LearningSlot[] } }
}

export function getSlotsFor(moduleID: ModuleID, week: WeekRef): LearningSlot[] {
  return _getSlotsFor(moduleID, week);
}

export const railsData = fakeRailsData;
