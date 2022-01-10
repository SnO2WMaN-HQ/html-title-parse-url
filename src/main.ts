import { bold, yellow } from "std/fmt/colors";
import { oakCors } from "cors";
import { Application, Router } from "oak";

const app = new Application();
const router = new Router();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

router.get("/", (context) => {
  context.response.body = "Test";
});

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(bold(`Start listening on: ${yellow(`${hostname}:${port}`)}`));
  console.log(bold(`Using HTTP server: ${yellow(serverType)}`));
});

await app.listen({
  port: parseInt(Deno.env.get("PORT") || "8000", 10),
});
