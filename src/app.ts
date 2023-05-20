import express, { Application } from "express";
import { Server, createServer } from "http";
import cors from "cors";
import path from "path";
import Routes from "./routes";
import { sequelize } from "./app/db";
import Logger from "./utils/Logger";
import AdminJs from './adminjs';

class App {
  private readonly _app: Application;
  private readonly _server: Server;

  constructor() {
    this._app = express();
    this._server = createServer(this._app);
    this.middlewares();
    this.routes();
    this.db();
  }

  public get server() {
    return this._server;
  }

  private middlewares(): void {
    this._app.use(cors());
    this._app.use(express.static(path.join(__dirname, "../public")));
    this._app.use(express.json());
    this._app.use(express.urlencoded({ extended: true }));
  }

  private routes(): void {
    this._app.use(AdminJs.adminJs.options.rootPath, AdminJs.adminJsRouter)
    this._app.use("/api", new Routes().startRoutes().router);
  }

  private async db(): Promise<void> {
    sequelize.authenticate().then(() => {
      Logger.info('DB connection successfull');
    }).catch(err => {
      Logger.error("Error DB", err)
    })
  }
}

export default App;