import { BookingStep } from "./BookingStep";
import { CaseReducer, configureStore, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { BookingState, LearningSlot } from "./types";

type Action<Payload = undefined> = CaseReducer<BookingState, PayloadAction<Payload>>;

interface BookingReducers extends SliceCaseReducers<BookingState> {
  chooseLearningSlot: Action<{ slot: LearningSlot }>

  nextStep: Action,
  moveToStep: Action<{ step: BookingStep }>
}

export const bookingSlice = createSlice<BookingState, BookingReducers, 'booking'>({
  name: 'booking',

  // TODO: Hydrate this from rails
  initialState: {
    currentStep: { type: "selectingLearningSlot", currentModuleId: '1' },
    selectedSlots: Object.create(null)
  },

  reducers: {
    chooseLearningSlot() {

    },

    moveToStep() {

    },

    nextStep() {

    }
  }
});

export const actions = bookingSlice.actions;

export const store = configureStore({
  reducer: bookingSlice.reducer,
});
