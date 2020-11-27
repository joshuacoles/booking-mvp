import * as React from "react";
import { Button, ButtonGroup, DateRangePicker, Icon, Popover, Whisper } from "rsuite";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction } from "react";

interface Props {
  selectedWeek: Dayjs
  setSelectedWeek: Dispatch<SetStateAction<Dayjs>>
}

// function WeekPicker(props: Props) {
//   return <Whisper
//     trigger="click"
//     placement="bottomStart"
//     speaker={
//       // TODO Disable weekends and days before previous module
//       // TODO Change hover to be only work days
//       <Popover title="Pick a week to view">
//         <DateRangePicker
//           isoWeek
//           showOneCalendar
//           appearance={"subtle"}
//           value={[props.selectedWeek.day(1).toDate(), props.selectedWeek.day(7).toDate()]}
//           onChange={(value) => {
//             props.setSelectedWeek(dayjs(value[0]))
//           }}
//
//           oneTap hoverRange="week" ranges={[]}
//         />
//       </Popover>
//     }
//   >
//     <Button>
//       <Icon icon={"calendar"}/> Pick
//     </Button>
//   </Whisper>;
//
// }
function WeekPicker(props: Props) {
  
  return <Button style={{ padding: 0, margin: 0 }}
  >
    <DateRangePicker
      isoWeek
      showOneCalendar
      cleanable={false}

      // containerPadding={0}
      // style={{ padding: 0, margin: 0 }}
      style={{ backgroundColor: 'transparent' }}
      renderValue={(value) =>
        `${props.selectedWeek.day(1).format('Do MMMM')} to ${props.selectedWeek.day(7).format('Do MMMM')}`
      }
      appearance={"subtle"}
      value={[props.selectedWeek.day(1).toDate(), props.selectedWeek.day(7).toDate()]}
      onChange={(value) => {
        props.setSelectedWeek(dayjs(value[0]))
      }}

      oneTap hoverRange="week" ranges={[]}
    />
  </Button>

}

// TODO: Include way to select week from calendar (modal?)
export function Controls(props: Props) {
  return (
    <div className="Controls">
      <ButtonGroup>
        <Button onClick={() => props.setSelectedWeek(prev => prev.subtract(1, 'week'))}>Previous</Button>

        <WeekPicker {...props}/>

        <Button onClick={() => props.setSelectedWeek(prev => prev.add(1, 'week'))}>Next</Button>
      </ButtonGroup>


      {/* Spacer */}
      {/*<div style={{ width: '10px' }}/>*/}

      {/*<div className="WeekIndicator">*/}
      {/*  Week {props.selectedWeek.day(1).format('Do MMMM')} to {props.selectedWeek.day(7).format('Do MMMM')}*/}
      {/*</div>*/}
    </div>
  );
}
