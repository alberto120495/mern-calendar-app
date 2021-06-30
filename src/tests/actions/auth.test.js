import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import * as fetchModule from "../../helpers/fetch";
import { types } from "../../types/types";

//*****************Configuraciones*********************

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initState = {};
let store = mockStore(initState);

Storage.prototype.setItem = jest.fn();
let token = "";

jest.mock("sweetalert2", () => {
  return {
    fire: jest.fn(),
  };
});

//*****************FIN de Configuraciones*********************

describe("Pruebas en las acciones Auth", () => {
  beforeEach(() => {
    store = mockStore(initState);
    jest.clearAllMocks();
  });

  test("starLogin correcto", async () => {
    await store.dispatch(startLogin("abdiel@gmail.com", "123456"));

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    //token = localStorage.setitem.mock.calls
    token = localStorage.setItem.mock.calls[0][1];
  });

  test("starLogin incorrecto", async () => {
    await store.dispatch(startLogin("abie@gmail.com", "123456"));

    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "El usuario no existe con ese correo",
      "error"
    );
  });

  test("startRegister correcto", async () => {
    fetchModule.fetchSinToken = jest.fn(() => {
      return {
        json() {
          return { ok: true, uid: "123", name: "carlos", token: "abc123abc" };
        },
      };
    });

    await store.dispatch(startRegister("test@test.com", "123456", "test"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123abc");

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );

    //console.log(actions);
  });

  test("startChecking correcto", async () => {
    fetchModule.fetchConToken = jest.fn(() => {
      return {
        json() {
          return { ok: true, uid: "123", name: "carlos", token: "abc123abc" };
        },
      };
    });

    await store.dispatch(startChecking());
    const actions = store.getActions();
    //console.log(actions);
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "carlos",
      },
    });

    expect(localStorage.setItem).toHaveBeenCalledWith("token", "abc123abc");
  });
});
