import * as React from "react";
import { Button, ButtonGroup, DateRangePicker } from "rsuite";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

import classes from "./Controls.module.css";

interface Props {
  selectedWeek: Dayjs
  setSelectedWeek: Dispatch<SetStateAction<Dayjs>>
}

function WeekPicker(props: Props) {
  return <Button style={{ padding: 0, margin: 0 }}>
    <DateRangePicker
      isoWeek
      showOneCalendar
      cleanable={false}

      className={classes.weekPicker}
      appearance={"subtle"}

      hoverRange={date => {
        const d = dayjs(date);
        return [d.day(1).toDate(), d.day(5).toDate()];
      }}

      disabledDate={date => dayjs(date).day() == 6 || dayjs(date).day() == 0}

      renderValue={(value) => {
        // Small size class
        if (window.screen.availWidth < 900) {
          return `${props.selectedWeek.day(1).format('DD/MM/YYYY')} to ${props.selectedWeek.day(7).format('DD/MM/YYYY')}`
        } else {
          return `${props.selectedWeek.day(1).format('Do MMMM YYYY')} \u27FC ${props.selectedWeek.day(7).format('Do MMMM YYYY')}`
        }
      }}

      value={[props.selectedWeek.day(1).toDate(), props.selectedWeek.day(5).toDate()]}
      onChange={(value) => {
        props.setSelectedWeek(dayjs(value[0]))
      }}

      oneTap ranges={[]}
    />
  </Button>

}

// TODO: Include way to select week from calendar (modal?)
export function Controls(props: Props) {
  return (
    <div className={classes.Controls}>
      <ButtonGroup>
        <Button onClick={() => props.setSelectedWeek(prev => prev.subtract(1, 'week'))}>Previous</Button>

        <WeekPicker {...props}/>

        <Button onClick={() => props.setSelectedWeek(prev => prev.add(1, 'week'))}>Next</Button>
      </ButtonGroup>
    </div>
  );
}
