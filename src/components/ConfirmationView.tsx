import * as React from "react";

import classes from "./SlotPicker/SlotPicker.module.css";
import { useDispatch, useSelector } from "react-redux";
import { BookingState } from "../data/store";
import { railsData } from "../data/railsData";
import { Button } from "rsuite";

import general from "./general.module.css"

export function ConfirmationView() {
  const dispatch = useDispatch();

  const slots = Object.entries(useSelector<BookingState, BookingState["selectedSlots"]>(state => state.selectedSlots));

  return <div className="AppContainer">
    <div className={general.HeadingBox}>Please confirm your choices</div>

    <div className={general.ResponsiveColumns}>
      {slots.map(([moduleId, slotId], index) => {
        const slot = railsData.getSlot(slotId);

        return <div className={general.ResponsiveColumn}>
          <div className={general.SlotBox} key={index}>
            {railsData.modules.find(m => m.moduleId === moduleId)!.moduleTitle} : {slot.start.format('HH:MM')} &mdash; {slot.end.format('HH:MM')}
          </div>
        </div>;
      })}
    </div>

    <div>
      <Button appearance={"primary"}>Confirm</Button>
    </div>
  </div>;
}
