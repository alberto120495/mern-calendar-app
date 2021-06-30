import { act } from "@testing-library/react";
import { mount } from "enzyme";
import moment from "moment";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import {
  eventClearActiveEvent,
  eventStartAddNew,
  eventStartUpdated,
} from "../../../actions/events";
import CalendarModal from "../../../components/calendar/CalendarModal";

//*****************Configuraciones*********************
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlusOne = now.clone().add(1, "hours");

const initState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hola Mundo",
      notes: "Algunas notas",
      start: now.toDate(),
      end: nowPlusOne.toDate(),
    },
  },
  auth: {
    uid: 1234,
    name: "alberto",
  },
  ui: {
    modalOpen: true,
  },
};
const store = mockStore(initState);

store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => {
  return {
    eventStartUpdated: jest.fn(),
    eventClearActiveEvent: jest.fn(),
    eventStartAddNew: jest.fn(),
  };
});

jest.mock("sweetalert2", () => {
  return {
    fire: jest.fn(),
  };
});

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

//*****************FINAL Configuraciones*********************

describe("Pruebas en <CalendarModal/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("debe de mostrar el modal", () => {
    expect(wrapper.find("Modal").prop("isOpen")).toBe(true);
  });

  test("debe de llamar la accion de actualizar y cerrar modal", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(eventStartUpdated).toHaveBeenCalledWith(
      initState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("debe de mostrar error si falta el titulo", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(wrapper.find('input[name="title"]').hasClass("is-invalid")).toBe(
      true
    );
  });

  test("debe de crear un nuevo evento", () => {
    const initState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: 1234,
        name: "alberto",
      },
      ui: {
        modalOpen: true,
      },
    };
    const store = mockStore(initState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola pruebas",
      },
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    const form = {
      end: expect.anything(),
      notes: "",
      start: expect.anything(),
      title: "Hola pruebas",
    };

    expect(eventStartAddNew).toHaveBeenCalledWith(form);
    expect(eventClearActiveEvent).toHaveBeenCalled();
  });

  test("debe de validar las fechas", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hola pruebas",
      },
    });

    const hoy = new Date();

    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(hoy);
    });

    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });

    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "La fecha fin debe ser mayor a la fecha de inicio",
      "error"
    );
  });
});
