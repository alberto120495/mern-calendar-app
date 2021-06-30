import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../../actions/auth";
import LoginScreen from "../../../components/auth/LoginScreen";

//*****************Configuraciones*********************
const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
const store = mockStore(initState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => {
  return {
    startLogin: jest.fn(),
    startRegister: jest.fn(),
  };
});

jest.mock("sweetalert2", () => {
  return {
    fire: jest.fn(),
  };
});
//*****************FINAL Configuraciones*********************
describe("Pruebas en <LoginScreeen/>", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const wrapper = mount(
    <Provider store={store}>
      <LoginScreen />
    </Provider>
  );

  test("debe mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  /*
  test("debe de llamar el dispatch del login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "abdiel@gmail.com,",
      },
    });

    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });

    wrapper.find("form").at(0).prop("submit")({
      preventDefault() {},
    });
    expect(startLogin).toHaveBeenCalledWith("abdiel@gmail.com", "123456");
  });

  test("no hay registro si las contraseñas son diferentes", () => {
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: {
        name: "rPassword1",
        value: 123456,
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: 1234567,
      },
    });

    wrapper.find("form").at(1).prop("submit")({
      preventDefault() {},
    });

    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas deben de ser iguales",
      "error"
    );
  });
  */
});
