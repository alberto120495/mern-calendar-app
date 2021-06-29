import React, { useState } from "react";
import Navbar from "../ui/Navbar";
import messages from "../../helpers/calendar-messages-es";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "moment/locale/es";
import "react-big-calendar/lib/css/react-big-calendar.css";
import CalendarEvent from "./CalendarEvent";
import CalendarModal from "./CalendarModal";
import { useDispatch, useSelector } from "react-redux";
import { uiOpenModal } from "../../actions/ui";
import {
  eventClearActiveEvent,
  eventSetActive,
  eventStartLoading,
} from "../../actions/events";
import AddNewFab from "../ui/AddNewFab";
import DeleteEventFab from "../ui/DeleteEventFab";
import { useEffect } from "react";

moment.locale("es");
const localizer = momentLocalizer(moment);

function CalendarScreen() {
  const dispatch = useDispatch();
  const { events, activeEvent } = useSelector((state) => state.calendar);
  const { uid } = useSelector((state) => state.auth);

  const [lastView, setLastView] = useState(
    localStorage.getItem("lastView") || "month"
  );

  useEffect(() => {
    dispatch(eventStartLoading());
  }, [dispatch]);

  const onDoubleClick = (e) => {
    //console.log(e);
    //console.log("Abir Modal");
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    //console.log(e);
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    //console.log(e);
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const onSelectSlot = (e) => {
    //console.log(e);
    dispatch(eventClearActiveEvent());
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: uid === event.user._id ? "#367CF7" : "#465660",
      borderRadius: "0px",
      opacity: 0.8,
      display: "block",
      color: "white",
    };

    return {
      style,
    };
  };
  return (
    <div className="calendar-screen">
      <Navbar />
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        messages={messages}
        eventPropGetter={eventStyleGetter}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelectEvent}
        onView={onViewChange}
        onSelectSlot={onSelectSlot}
        selectable={true}
        view={lastView}
        components={{ event: CalendarEvent }}
      />

      <CalendarModal />
      <AddNewFab />
      {activeEvent && <DeleteEventFab />}
    </div>
  );
}

export default CalendarScreen;
