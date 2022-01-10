import { Application, bold, oakCors, Router, yellow } from "./deps.ts";
import { DOMParser, Element } from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";
import ky from "https://cdn.skypack.dev/ky?dts";
import { provider } from "./url_maps.ts";

const app = new Application();
const router = new Router();

app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());

router.get("/api", async (context) => {
  const url = context.request.url.searchParams.get("url");
  if (!url) {
    context.response.status = 400;
    context.response.body = "No URL";
    return;
  }
  const parser = provider(url);
  if (!parser) {
    context.response.status = 404;
    context.response.body = "Not supported URL";
    return;
  }
  try {
    const body = await ky.get(url).text();

    const parser = new DOMParser().parseFromString(body, "text/html");
    const title = parser?.querySelector("title")?.innerText;

    context.response.body = title;
  } catch (e) {
    context.response.status = 500;
    return;
  }
});

app.addEventListener("listen", ({ hostname, port, serverType }) => {
  console.log(bold(`Start listening on: ${yellow(`${hostname}:${port}`)}`));
  console.log(bold(`Using HTTP server: ${yellow(serverType)}`));
});

await app.listen({
  port: parseInt(Deno.env.get("PORT") || "8000", 10),
});
