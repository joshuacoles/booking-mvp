import React from "react";

import { Dropdown, Whisper, Popover } from "rsuite";

import * as dateFns from "date-fns";
import { bookingSlice, moduleIdSelector, ser } from "../data/store";
import { useDispatch, useSelector } from "react-redux";
import { getSlotsFor, LearningSlot } from "../data/staticData";

interface Props {
  date: Date;
}

const MenuPopover = ({ onSelect, slots, ...rest }: any) => (
  <Popover {...rest} full>
    <Dropdown.Menu onSelect={onSelect}>
      {slots.map((slot: LearningSlot, i: number) => (
        <Dropdown.Item eventKey={i}>
          {dateFns.format(slot.start, "HH:MM")} &mdash;{" "}
          {dateFns.format(slot.end, "HH:MM")}
        </Dropdown.Item>
      ))}
    </Dropdown.Menu>
  </Popover>
);

const Cell = ({ date }: Props) => {
  const dispatch = useDispatch();
  const moduleId: string | null = useSelector(moduleIdSelector);

  const triggerRef = React.createRef<any>();
  function handleSelectMenu(eventKey: number, event: Event) {
    console.log(eventKey);
    triggerRef.current.hide();

    dispatch(bookingSlice.actions.selectSlot({ slot: ser(slots[eventKey]) }))
    dispatch(bookingSlice.actions.progressStep())
  }

  const slots = getSlotsFor(moduleId!, date);

  return (
    <Whisper
      placement="bottom"
      trigger="click"
      triggerRef={triggerRef}
      open={slots.length === 0 ? false : undefined}
      speaker={<MenuPopover slots={slots} onSelect={handleSelectMenu} />}
    >
      <div className="Cell">
        <span className={slots.length === 0 ? "stroke" : ""}>{dateFns.format(date, "d")}</span>
      </div>
    </Whisper>
  );
};

export default Cell;
