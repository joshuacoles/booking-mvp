import { FakeRailsData } from "./fake-data-gen";
import { Dayjs } from "dayjs";

export type ModuleID = string;
export type WeekRef = Dayjs;
export type ModuleRef = number;
export type LearningSlotRef = number;

export interface Module {
  moduleId: string
  moduleTitle: string
}

// TODO: Do we want to include some form of "fullness"
export interface LearningSlot {
  id: number

  start: Dayjs
  end: Dayjs
}

export interface RailsData {
  modules: Module[];
  getSlot(slotId: LearningSlotRef): LearningSlot
  getSlots(moduleId: ModuleID, week: WeekRef): LearningSlot[]
}

export const railsData = new FakeRailsData();
