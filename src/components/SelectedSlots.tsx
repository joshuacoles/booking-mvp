import * as React from "react";
import * as dateFns from "date-fns";
import { LearningSlot } from "../App";

interface Props {
  chosenSlots: { [moduleId: string]: LearningSlot | undefined };
  removeModulesSlot: (moduleId: string) => void;
}

interface SlotProps {
  slot: LearningSlot;
  module: string;
  removeSlot: () => void;
}

function Slot({ module, slot, removeSlot }: SlotProps) {
  return (
    <div className="Event Removeable" onClick={removeSlot}>
      Module {module} : {dateFns.format(slot.start, "HH:MM")} &mdash;{" "}
      {dateFns.format(slot.end, "HH:MM")}
    </div>
  );
}

function EmptySlot({ module }: { module: string }) {
  if (+module === 1)
    return <div className="Event Empty">Please select your first module</div>;

  return (
    <div className="Event Empty">Please first select module {+module - 1}</div>
  );
}

export default function SelectedSlots({
  chosenSlots,
  removeModulesSlot,
}: Props) {
  return (
    <div className="EventList SelectedSlots">
      <h5
        style={{
          alignSelf: "start",
          paddingBottom: "0.5rem",
        }}
      >
        Selected Slots
      </h5>

      {["1", "2", "3", "4", "5", "6"].map((moduleId) => {
        if (chosenSlots[moduleId]) {
          return (
            <Slot
              module={moduleId}
              slot={chosenSlots[moduleId]!}
              removeSlot={() => removeModulesSlot(moduleId)}
            />
          );
        } else {
          return <EmptySlot module={moduleId} />;
        }
      })}
    </div>
  );
}
