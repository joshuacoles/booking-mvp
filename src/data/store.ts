import { CaseReducer, configureStore, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { BookingState, BookingStep, LearningSlot } from "./types";

type Action<Payload = undefined> = CaseReducer<BookingState, PayloadAction<Payload>>;

interface BookingReducers extends SliceCaseReducers<BookingState> {
  chooseLearningSlot: Action<{ slot: LearningSlot, moduleId: string }>

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
    // TODO: Do we want to generate an error to be displayed as a top notification when selecting a wrong slot
    chooseLearningSlot(state: BookingState, action) {
      state.selectedSlots[action.payload.moduleId] = action.payload.slot;
    },

    moveToStep(state, action) {
      state.currentStep = action.payload.step
    },

    nextStep(state, action) {
      state.currentStep = BookingStep.nextStep(state.currentStep)
    }
  }
});

export const actions = bookingSlice.actions;

export const store = configureStore({
  reducer: bookingSlice.reducer,
});
