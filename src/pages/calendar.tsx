import { NextPage } from "next";
import { Calendar, dateFnsLocalizer} from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

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
  const [allEvents, setAllEvents] = useState(events); // will use setAllEvents in future
  return (
    <div>
      <h1>Calendar</h1>
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
