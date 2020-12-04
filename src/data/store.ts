import { CaseReducer, configureStore, createSlice, PayloadAction, SliceCaseReducers } from "@reduxjs/toolkit";
import { LearningSlotRef, persistToRails, railsData } from "./railsData";
import { BookingStep } from "./bookingFlow";

export interface BookingState {
  currentStep: BookingStep
  selectedSlots: { [moduleId: string]: LearningSlotRef };
}

type Action<Payload = undefined> = CaseReducer<BookingState, PayloadAction<Payload>>;

interface BookingReducers extends SliceCaseReducers<BookingState> {
  chooseLearningSlot: Action<{ slotId: LearningSlotRef, moduleId: string, progress: boolean }>

  nextStep: Action,
  moveToStep: Action<{ step: BookingStep }>
}

export const bookingSlice = createSlice<BookingState, BookingReducers, 'booking'>({
  name: 'booking',

  // TODO: Hydrate this from rails
  initialState: {
    currentStep: BookingStep.forModuleId(railsData.modules[0].moduleId),
    selectedSlots: Object.create(null)
  },

  reducers: {
    chooseLearningSlot(state: BookingState, action) {
      // TODO: Do we want to generate an error to be displayed as a top notification when selecting a wrong slot
      state.selectedSlots[action.payload.moduleId] = action.payload.slotId;
      if (action.payload.progress) state.currentStep = BookingStep.nextStep(state.currentStep);
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
  middleware: getDefaultMiddleware => [...getDefaultMiddleware(), persistToRails]
});
