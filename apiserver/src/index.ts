import { Hono } from "hono";
import { getCookie } from "hono/cookie";

const app = new Hono();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/api/:route", (c) => {
  const date = new Date();
  const cookieName = getCookie(c, "name");
  console.log(`${date.toISOString()}: ${c.req.param("route")}`);
  console.log(`cookie name: ${cookieName}`);
  return c.json({ route: c.req.param("route") });
});

export default app;
