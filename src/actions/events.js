import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { prepareEvents } from "../helpers/prepareEvents";
import { types } from "../types/types";

export const eventStartAddNew = (event) => {
  return async (dispatch, getState) => {
    const { uid, name } = getState().auth;
    try {
      const resp = await fetchConToken("events", event, "POST");
      const body = await resp.json();
      if (body.ok) {
        event.id = body.evento.id;
        event.user = {
          _id: uid,
          name: name,
        };
        //console.log(event);
        dispatch(eventAddNew(event));
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventAddNew = (event) => {
  return {
    type: types.eventAddNew,
    payload: event,
  };
};

export const eventSetActive = (event) => {
  return {
    type: types.eventSetActive,
    payload: event,
  };
};
export const eventClearActiveEvent = () => {
  return {
    type: types.eventClearActiveEvent,
  };
};

export const eventStartUpdated = (event) => {
  return async (dispatch) => {
    try {
      //console.log(event);
      const res = await fetchConToken(`events/${event.id}`, event, "PUT");
      const body = await res.json();
      if (body.ok) {
        dispatch(eventUpdated(event));
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventUpdated = (event) => {
  return {
    type: types.eventUpdated,
    payload: event,
  };
};

export const eventStartDelete = () => {
  return async (dispatch, getState) => {
    const { id } = getState().calendar.activeEvent;
    try {
      const res = await fetchConToken(`events/${id}`, {}, "DELETE");
      const body = await res.json();
      if (body.ok) {
        dispatch(eventDeleted());
      } else {
        Swal.fire("Error", body.msg, "error");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const eventDeleted = () => {
  return {
    type: types.eventDeleted,
  };
};

export const eventStartLoading = () => {
  return async (dispatch) => {
    try {
      const res = await fetchConToken("events");
      const body = await res.json();

      const events = prepareEvents(body.msg);
      dispatch(eventLoaded(events));
    } catch (error) {
      console.log(error);
    }
  };
};

const eventLoaded = (events) => {
  return {
    type: types.eventLoaded,
    payload: events,
  };
};

export const eventLogout = () => {
  return {
    type: types.eventLogout,
  };
};
