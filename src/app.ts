import express, { Request, Response } from "express";
import morgan from "morgan";
import path from "path";
import ShortendUrl from "./models/ShortendUrl";
import ShortenService from "./services/shorten-service";
import rateLimit from "express-rate-limit";
import UrlBuilder from "./models/UrlBuilder";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 5,
  message: "Overwhelmed by requests",
  headers: true,
});

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(morgan("combined"));
app.get("/health", (_: Request, res: Response) => {
  res.send("Healthy");
});
app.get("/", (_: Request, res: Response) => {
  return res.render("home", {
    title: "Optimum Url Shortner | Always free",
    description: "Always free url shortner",
    urlForm: {
      action: "/short",
      fields: [
        {
          name: "url",
          placeholder: "Mention your url here",
          label: "Your url",
          type: "url",
          required: true,
        },
        {
          name: "ttl",
          required: true,
          label: "Time to live",
          placeholder: "Mention the time to live",
          type: "select",
          options: [
            { value: 3600, label: "1 hour" },
            { value: 86400, label: "24 hours" },
            { value: 604800, label: "7 days" },
            { value: 2592000, label: "30 days" },
          ],
        },
      ],
    },
  });
});
app.post("/short", limiter, async (req: Request, res: Response) => {
  try {
    const shortendUrl = new ShortendUrl(req.body.url, req.body.ttl);
    shortendUrl.log();
    const shortenService = new ShortenService();

    const response = await shortenService.save(shortendUrl);
    const urlBuilder = new UrlBuilder(response);

    return res.render("short-url-display", {
      shortUrl: urlBuilder.getUrl(),
      sharablePlatforms: urlBuilder.getSharablePlatforms(),
    });
  } catch (error) {
    return res.redirect("/");
  }
});

app.get("/:id", limiter, async (req: Request, res: Response) => {
  try {
    const shortenService = new ShortenService();
    const response = await shortenService.get(req.params.id);
    return res.redirect(response);
  } catch (error) {
    return res.redirect("/");
  }
});
app.use((err: Error, _: Request, res: Response) => {
  console.error(err.stack);
  return res.redirect("/");
});
export default app;
