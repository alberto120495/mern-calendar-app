import { types } from "../../types/types";

describe("pruebas en Types", () => {
  test("los types deben de ser iguales", () => {
    expect(types).toEqual({
      uiOpenModal: "[ui] Open modal",
      uiCloseModal: "[ui] Close modal",

      eventSetActive: "[event] Set Active",
      eventStartAddNew: "[event] Start add new",
      eventAddNew: "[event] Add new",
      eventClearActiveEvent: "[event] Clear active event",
      eventUpdated: "[event] Event updated",
      eventDeleted: "[event] Event deleted",
      eventLoaded: "[event] Events loaded",
      eventLogout: "[event] Events logout",

      authCheckingFinish: "[auth] Finish checking state",
      authStartLogin: "[auth] Start login",
      authLogin: "[auth] Login",
      authStartRegister: "[auth] Start Register",
      authStartTokenRenew: "[auth] Start token renew",
      authLogout: "[auth] Logout",
    });
  });
});
