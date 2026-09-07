import express, { type Request, type Response } from "express";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

app.use(
  express.json({
    verify: (req: any, _res, buf) => {
      req.rawBody = buf;
    },
  })
);
app.use(express.urlencoded({ extended: false }));

let isInitialized = false;
async function initializeRoutes() {
  if (!isInitialized) {
    await registerRoutes(httpServer, app);
    isInitialized = true;
  }
}

export default async function handler(req: Request, res: Response) {
  await initializeRoutes();
  return app(req, res);
}
