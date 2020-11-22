import * as dateFns from "date-fns";

import {
  createSlice,
  configureStore,
  SliceCaseReducers,
  PayloadAction,
} from "@reduxjs/toolkit";

import { LearningSlot, moduleIndex, staticData } from "./staticData";
import * as R from "ramda";
import { Step } from "./Step";

export interface BookingState {
  bookingStep: Step;
  selectedSlots: { [moduleId: string]: SerLearningSlot };
}

export interface SerLearningSlot {
  start: string;
  end: string;
}

export function ser(ls: LearningSlot): SerLearningSlot {
  return {
    start: dateFns.formatISO(ls.start),
    end: dateFns.formatISO(ls.end),
  };
}

////////////

interface BookingReducers extends SliceCaseReducers<BookingState> {
  selectSlot(
    state: BookingState,
    action: PayloadAction<{ slot: SerLearningSlot }>
  ): void;

  selectStep(state: BookingState, action: PayloadAction<{ step: Step }>): void
  progressStep(state: BookingState): void
}

export const bookingSlice = createSlice<BookingState, BookingReducers>({
  name: "booking",

  initialState: {
    bookingStep: Step.steps[0],
    selectedSlots: {},
  },

  reducers: {
    selectSlot(state: BookingState, { payload: { slot } }) {
      if (state.bookingStep.type !== 'selectingModule') return state;
      state.selectedSlots[state.bookingStep.currentModuleId] = slot;
    },

    selectStep(state, { payload: { step } }) {
      state.bookingStep = step;
    },

    progressStep(state: BookingState) {
      state.bookingStep = Step.nextStep(state.bookingStep);
    },
  },
});

export const selectedSlotsSelector = (state: BookingState) => state.selectedSlots;
export const bookingStepSelector = (state: BookingState) => state.bookingStep;

export const moduleIdSelector = (state: BookingState) => {
  if (state.bookingStep.type === 'selectingModule') return state.bookingStep.currentModuleId;
  else return null;
}

// export const moduleIndexSelector = (state: BookingState) => staticData.modules.map(m => m.moduleId).indexOf(state.currentModuleId);
// export const moduleSelector = (state: BookingState) => staticData.modules.find(m => m.moduleId === state.currentModuleId);

export const store = configureStore({
  reducer: bookingSlice.reducer,
});
