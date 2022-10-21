import { NextPage } from "next";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"

const locales: object = {
  "en-US": require("date-fns/locale/en-US"),
};
// Disables to create specific instance of our config
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Creating dummy data
interface event {
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
}
const events: event[] = [
  {
    title: "Event1",
    start: new Date("2022-10-20T20:50:21.817Z"),
    end: new Date("2022-10-20T23:50:21.817Z"),
  },
  {
    title: "Event2",
    start: new Date("2022-10-21T12:50:21.817Z"),
    end: new Date("2022-10-21T13:50:21.817Z"),
  },
];
const CalendarPage: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newEvent, setNewEvent] = useState({title: "", start: new Date(), end: new Date()}); 
  const [allEvents, setAllEvents] = useState(events); // will use setAllEvents in future
  
  const AddEvent = () => {
    setAllEvents([...allEvents, newEvent]); 
  }
  
  return (
    <div>
      <h1>Calendar</h1>
      <h2> Add Event </h2>
      <div>
        <input type = "text" placeholder = "Add Title" style={{width: "20%", marginRight: "10px"}} 
        value = {newEvent.title} onChange = {(e) => setNewEvent({...newEvent, title: e.target.value})}
        />
        <DatePicker placeholderText = "Start Date"
        selected = {newEvent.start} onChange={(start) => setNewEvent({...newEvent, start: new Date()})} 
        />
        <DatePicker placeholderText = "End Date" 
        selected = {newEvent.end} onChange={(end) => setNewEvent({...newEvent, end: new Date()})}
        />
        <button style ={{marginTop: "10px"}} onClick={AddEvent}>
          Add event
        </button>
      </div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "1000px", margin: "50px" }}
      />
    </div>
  );
};
export default CalendarPage;
