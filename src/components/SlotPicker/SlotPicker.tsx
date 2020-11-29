import * as React from "react";
import dayjs, { Dayjs } from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import { LearningSlot, getSlotsFor, railsData } from "../../data/railsData";

import classes from "./SlotPicker.module.css";
import { useDispatch, useSelector } from "react-redux";
import { actions, BookingState } from "../../data/store";
import { useCallback } from "react";

dayjs.extend(advancedFormat)

function DayColumn({ dayName, slots, onClick }: { dayName: string, slots: LearningSlot[], onClick: (slot: LearningSlot) => void }) {
  return (
    <div className={classes.DayColumn}>
      <div className={classes.Heading}>{dayName}</div>

      {slots.map((slot, index) =>
        <div className={classes.Slot} key={index} onClick={() => onClick(slot)}>
          {slot.start.format('HH:MM')} &mdash; {slot.end.format('HH:MM')}
        </div>
      )}
    </div>
  );
}

interface Props {
  selectedWeek: Dayjs
}

export function SlotPicker(props: Props) {
  const dispatch = useDispatch();
  const moduleId = useSelector((state: BookingState) => {
    if (state.currentStep.type !== "selectingLearningSlot") return;
    return railsData.modules[state.currentStep.currentModule].moduleId;
  })

  const callback = useCallback((moduleId: string, slot: LearningSlot) => {
    dispatch(actions.chooseLearningSlot({ slot , moduleId, progress: true }))
  }, [dispatch]);

  const dayOffsets = [1, 2, 3, 4, 5]
  const week = props.selectedWeek.startOf('week');
  const days = dayOffsets.map(dayOffset => week.day(dayOffset));

  return <div className={classes.SlotPicker}>
    {days.map((day, index) => (
      <DayColumn
        key={index}
        dayName={day.format('dddd Do')}
        slots={getSlotsFor(moduleId!, day)}
        onClick={slot => callback(moduleId!, slot)}
      />
    ))}
  </div>;
}
