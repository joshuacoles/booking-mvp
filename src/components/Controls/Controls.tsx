import * as React from "react";
import { Button, ButtonGroup, DateRangePicker, Icon } from "rsuite";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import classes from "./Controls.module.css";
import useSizeClass from "../../utils/useSizeClass";

interface Props {
  selectedWeek: Dayjs
  setSelectedWeek: Dispatch<SetStateAction<Dayjs>>
}

function WeekIndicator({ value }: { value: [Date?, Date?] }) {
  const sizeClass = useSizeClass();

  if (sizeClass === 'small') {
    return <Icon icon={"calendar"}/>
  }

  const fmt = sizeClass === 'big' ? 'Do MMMM YYYY' : 'DD/MM/YYYY';

  return <span>{dayjs(value[0]).format(fmt)} to {dayjs(value[1]).format(fmt)}</span>;
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

      disabledDate={date => dayjs(date).day() === 6 || dayjs(date).day() === 0}

      renderValue={(value) => <WeekIndicator value={value}/>}

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
      <ButtonGroup className={classes.bg}>
        <Button onClick={() => props.setSelectedWeek(prev => prev.subtract(1, 'week'))}>Previous</Button>

        <WeekPicker {...props}/>

        <Button onClick={() => props.setSelectedWeek(prev => prev.add(1, 'week'))}>Next</Button>
      </ButtonGroup>
    </div>
  );
}
