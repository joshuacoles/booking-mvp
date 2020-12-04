import { Dayjs } from "dayjs";
import { LearningSlot, LearningSlotRef, Module, ModuleID, RailsData, WeekRef } from "./railsData";

export class FakeRailsData implements RailsData {
  slots: { [id: number]: LearningSlot } = {}
  availableSlots: { [moduleId: string]: { [startOfDayISO: string]: LearningSlot[] } } = {}

  modules = [m(1), m(2), m(3), m(4), m(5), m(6)]

  getSlot(slotId: LearningSlotRef): LearningSlot {
    return this.slots[slotId];
  }

  getSlots(moduleId: ModuleID, week: WeekRef): LearningSlot[] {
    // Normalise Dates
    const startOfDayISO = week.startOf('day').toISOString();

    if (typeof this.availableSlots[moduleId] === 'undefined') this.availableSlots[moduleId] = {};
    const map = this.availableSlots[moduleId]

    if (map.hasOwnProperty(startOfDayISO)) {
      return map[startOfDayISO]
    } else {
      const slots = randomSlots(week)
      map[startOfDayISO] = slots;

      slots.forEach(x => this.slots[x.id] = x);
      return slots;
    }
  }
}

function m(m: number): Module {
  return {
    moduleId: `cl-${m}`,
    moduleTitle: `Module ${m}`
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
      id: Math.floor(Math.random() * 1000),
      start,
      end,
    });
  }

  return events;
}
