import { FakeRailsData } from "./fake-data-gen";
import { Dayjs } from "dayjs";
import { Middleware } from "@reduxjs/toolkit";

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

export const persistToRails: Middleware = ({ getState }) => next => action => {
  // Call the next dispatch method in the middleware chain.
  const returnValue = next(action);

  fetch('https://httpbin.org/post', {
    method: "POST",
    body: JSON.stringify(getState())
  }).then(x => x.json()).then(console.log)

  return returnValue
};
