import { NextPage } from "next";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fetch from "cross-fetch";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "./logo.png";
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
interface event {
  title: string;
  allDay?: boolean;
  start: Date;
  end: Date;
}

const userEvents: event[] = []; //variable user events

const CalendarPage: NextPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(),
    end: new Date(),
  });
  const [allEvents, setAllEvents] = useState(userEvents);
  const router = useRouter();
  const username = router
    ? router.query.username
      ? router.query.username
      : ""
    : "";
  const formInput = username as unknown as string;

  //routing for find events
  useEffect(() => {
    const formData = new FormData();
    formData.append("user_id", formInput);
    fetch("http://localhost:5000/events/find", { method: "GET" })
      .then((response) => response.json())
      .then((res) => setAllEvents(res))
      .catch(Error);
  });

  //routing and adding events to calendar
  const AddEvent = () => {
    const formData = new FormData();
    formData.append("user_id", formInput);
    fetch("http://localhost:5000/events/add", {
      method: "POST",
      body: formData,
    }).catch(Error);
    setAllEvents([...allEvents, newEvent]);
  };

  //routing and removing events from calendar
  const RemoveEvent = (event) => {
    const formData = new FormData();
    formData.append("user_id", formInput);
    formData.append("date", event.start);
    fetch("http://localhost:5000/events/remove", {
      method: "POST",
      body: formData,
    }).catch(Error);
    const current_events = [...allEvents];
    current_events.splice(current_events.indexOf(event), 1);
    setAllEvents(current_events);
  };

  //routing and editing evetns from calendar
  const EditEvent = (event) => {
    const formData = new FormData();
    formData.append("user_id", formInput);
    formData.append("date", event.start);
    formData.append("detail", event.title);
    fetch("http://localhost:5000/events/edit", {
      method: "POST",
      body: formData,
    }).catch(Error);
    const current_events = [...allEvents];
    current_events.splice(current_events.indexOf(event), 1);
    setAllEvents([...current_events, newEvent]);
  };

  //allows user to choose to remove/edit event when event is clicked
  const handleEventSelection = (event) => {
    const remove = window.confirm("Do you want to remove this event?");
    if (remove) RemoveEvent(event);
    else {
      const edit = window.confirm("Do you want to edit this event?");
      if (edit) EditEvent(event);
    }
  };

  //displays calendar page and add/edit event fields
  return (
    <div>
      <nav
        className="navbar is-link has-shadow navbar-box-shadow-size"
        role="navigation"
        aria-label="main navigation"
      >
        <div className="navbar-brand">
          <a className="navbar-item">
            <Image src={logo} width="58" height="28" alt="Company Logo" />
            CalendarAppify
          </a>

          <a
            role="button"
            className="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" className="navbar-menu">
          <div className="navbar-start">
            <a className="navbar-item">calendar</a>

            <a className="navbar-item">about us</a>
          </div>

          <div className="navbar-end">
            <div className="navbar-item">
              <a className="button is-danger">
                <strong>Log Out</strong>
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="tags has-addons m-5">
        <span className="tag is-info is-large is-size-1">Calendar</span>
        <span className="tag is-dark is-large is-size-1">{formInput}</span>
      </div>
      <div className="columns">
        <div className="column is-one-fifth">
          <div className="box m-2">
            <div className="content">
              <h4 className="is-medium">
                {" "}
                Add, Edit, and Remove Your Events!{" "}
              </h4>
              <blockquote>
                {" "}
                Update fields and click the event you want edited. Will be
                prompted to remove; cancel that to edit.
              </blockquote>
              <div className="columns is-primary is-centered">
                <table className="table">
                  <tbody>
                    <tr>
                      <th>Title</th>
                      <th>
                        <input
                          type="text"
                          className="input"
                          placeholder="Add Title"
                          value={newEvent.title}
                          onChange={(e) =>
                            setNewEvent({ ...newEvent, title: e.target.value })
                          }
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>Start</th>
                      <th>
                        <DatePicker
                          className="input"
                          placeholderText="Start Date"
                          selected={newEvent.end}
                          onChange={(date) =>
                            setNewEvent({
                              ...newEvent,
                              end: date ? date : newEvent.end,
                            })
                          }
                        />
                      </th>
                    </tr>
                    <tr>
                      <th>end</th>
                      <th>
                        <DatePicker
                          placeholderText="End Date"
                          className="input"
                          selected={newEvent.end}
                          onChange={(date) =>
                            setNewEvent({
                              ...newEvent,
                              end: date ? date : newEvent.end,
                            })
                          }
                        />
                      </th>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <button
              className="button is-success is-light is-outlined is-rounded"
              style={{ marginTop: "10px" }}
              onClick={AddEvent}
            >
              Add or Edit Event
            </button>
          </div>
        </div>
        <div className="column two-thirds">
          <Calendar
            localizer={localizer}
            events={allEvents}
            style={{ height: "1000px" }}
            startAccessor="start"
            endAccessor="end"
            onSelectEvent={handleEventSelection}
          />
        </div>
      </div>
    </div>
  );
};
export default CalendarPage;
