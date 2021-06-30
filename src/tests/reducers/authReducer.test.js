import { login } from "../../actions/auth";
import { authReducer } from "../../reducers/authReducer";

const initState = {
  checking: false,
};

describe("pruebas en authReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = authReducer(initState, {});
    expect(state).toEqual({ checking: false });
  });
  test("debe de autenticar el usuario", () => {
    const user = {
      name: "alberto",
      uid: 1234,
    };
    const loginAction = login(user);
    const state = authReducer(initState, loginAction);

    expect(state).toEqual({ checking: false, name: "alberto", uid: 1234 });
  });
});
