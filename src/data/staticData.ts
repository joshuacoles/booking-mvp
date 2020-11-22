import * as dateFns from "date-fns";

export interface Module {
  moduleId: string
  moduleName: string
}

export interface LearningSlot {
  start: Date;
  end: Date;
}

interface StaticData {
  modules: Module[];
  slots: { [moduleId: string]: Map<string, LearningSlot[]> };
}

function m(m: number): Module {
  return {
    moduleId: `cl-${m}`,
    moduleName: `Module ${m}`
  }
}

export function moduleIndex(moduleId: string): number {
  return staticData.modules.findIndex(v => v.moduleId === moduleId);
}

export const staticData: StaticData = {
  modules: [m(1), m(2), m(3), m(4), m(5), m(6)],
  slots: {},
};

(window as any).sd = staticData;

export function getSlotsFor(moduleId: string, date: Date): LearningSlot[] {
  // Normalise Dates
  const dateKey = dateFns.formatISO(dateFns.startOfDay(date));
  if (typeof staticData.slots[moduleId] === "undefined")
    staticData.slots[moduleId] = new Map();
  const map = staticData.slots[moduleId];

  if (map.has(dateKey)) {
    return map.get(dateKey)!;
  } else {
    map.set(dateKey, randomSlots(date));
    return map.get(dateKey)!;
  }
}


function randomSlots(date: Date): LearningSlot[] {
  const no = Math.floor(Math.random() * 10);
  const events: LearningSlot[] = [];

  const startOfDay = dateFns.startOfDay(date);

  for (let i = 0; i < no; i++) {
    const no30 = Math.floor(Math.random() * 10);
    const start = dateFns.addMinutes(startOfDay, 30 * no30 + 60 * 16);
    const end = dateFns.addHours(start, 1);
    events.push({
      start,
      end,
    });
  }

  return events;
}
