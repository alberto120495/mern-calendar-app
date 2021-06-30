import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";

const initState = {
  modalOpen: false,
};
describe("Pruebas en uiReducer", () => {
  test("debe de retornar el estado por defecto", () => {
    const state = uiReducer(initState, {});
    expect(state).toEqual(initState);
  });
  test("debe de abrir y cerrar el modal", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initState, modalOpen);
    //console.log(state);
    expect(state).toEqual({
      modalOpen: true,
    });

    const modalClose = uiCloseModal();
    const state2 = uiReducer(initState, modalClose);
    expect(state2).toEqual({
      modalOpen: false,
    });
  });
});
