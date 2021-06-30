import { act } from "@testing-library/react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { eventSetActive, eventStartLoading } from "../../../actions/events";
import CalendarScreen from "../../../components/calendar/CalendarScreen";
import messages from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";

//*****************Configuraciones*********************
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: 1234,
    name: "alberto",
  },
  ui: {
    modalOpen: false,
  },
};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("sweetalert2", () => {
  return {
    fire: jest.fn(),
  };
});

jest.mock("../../../actions/events", () => {
  return {
    eventSetActive: jest.fn(),
    eventStartLoading: jest.fn(),
  };
});

Storage.prototype.setItem = jest.fn();

//*****************FINAL Configuraciones*********************

describe("Pruebas en <CalendarScreen/>", () => {
  const wrapper = mount(
    <Provider store={store}>
      <CalendarScreen />
    </Provider>
  );
  test("debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("pruebas con las interacciones del calendario", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop("onSelectEvent")({ start: "Hola" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Hola" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
