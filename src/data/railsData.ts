import { LearningSlot } from "./types";
import dayjs, { Dayjs } from "dayjs";

export interface Module {
  moduleId: string
  moduleTitle: string
}

export interface RailsData {
  modules: Module[];

  // TODO: We may want to query this from the server as we need it rather than all at once but the shape
  //       will be the same.
  availableSlots: { [moduleId: string]: { [startOfDayISO: string]: LearningSlot[] } }
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

export function getSlotsFor(moduleId: string, date: Dayjs): LearningSlot[] {
  // Normalise Dates
  const startOfDayISO = date.startOf('day').toISOString();

  if (typeof railsData.availableSlots[moduleId] === 'undefined') railsData.availableSlots[moduleId] = { };
  const map = railsData.availableSlots[moduleId]

  if (map.hasOwnProperty(startOfDayISO)) {
    return map[startOfDayISO]
  } else {
    const slots = randomSlots(date)
    map[startOfDayISO] = slots;
    return slots;
  }
}


function randomSlots(date: Dayjs): LearningSlot[] {
  const no = Math.floor(Math.random() * 7);
  const events: LearningSlot[] = [];

  const startOfDay = date.startOf('day');

  for (let i = 0; i < no; i++) {
    const no30 = Math.floor(Math.random() * 10);
    const start = startOfDay.add(30 * no30 + 60 * 12, 'minute')
    const end = start.add(1, 'hour');

    events.push({
      start,
      end,
    });
  }

  return events;
}
