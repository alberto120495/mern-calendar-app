import { fetchConToken, fetchSinToken } from "../../helpers/fetch";

describe("Pruebas en fetch", () => {
  let token = "";

  test("fetch sin token debe de funcionar", async () => {
    const res = await fetchSinToken(
      "auth",
      { email: "abdiel@gmail.com", password: "123456" },
      "POST"
    );
    expect(res instanceof Response).toBe(true);

    const body = await res.json();
    expect(body.ok).toBe(true);

    token = body.token;
  });

  test("fetch con token debe de funcionar", async () => {
    //localStorage.setItem("token", token);
    const res = await fetchConToken("events/456321", {}, "DELETE");
    const body = await res.json();

    expect(body.msg).toBe("No hay token en la peticion");
  });
});
