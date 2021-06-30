import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { eventStartDelete } from "../../../actions/events";
import DeleteEventFab from "../../../components/ui/DeleteEventFab";

//*****************Configuraciones*********************
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => {
  return { eventStartDelete: jest.fn() };
});

//*****************FINAL Configuraciones*********************

describe("Pruebas en <DeleteEventFav/>", () => {
  const wrapper = mount(
    <Provider store={store}>
      <DeleteEventFab />
    </Provider>
  );
  test("debe de mostrase correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("debe de llamar el eventStartDelete al ahcer click", () => {
    wrapper.find(".fab-danger").simulate("click");
    expect(eventStartDelete).toHaveBeenCalled();
  });
});
