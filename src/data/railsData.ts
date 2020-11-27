import { LearningSlot } from "./types";

export interface Module {
  moduleId: string
  moduleTitle: string
}

export interface RailsData {
  modules: Module[];

  availableSlots: { [moduleId: string]: LearningSlot[] }
}

export const railsData: RailsData = {
  modules: [m(1), m(2), m(3), m(4), m(5), m(6)],
  availableSlots: {}
};

// Used to generate fake data for testing

function m(m: number): Module {
  return {
    moduleId: `cl-${m}`,
    moduleTitle: `Module ${m}`
  }
}
