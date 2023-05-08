import AdminJS, { LoginProps } from "adminjs";
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { sequelize } from "../app/db";
import { Router } from "express";
import { adminJsResources } from "./resources";
import { locale } from "./locale";
import DashboardOptions from "./adminjsOptions/DashboardOptions";
import BrandingOptions from "./adminjsOptions/BrandingOptions";
import AuthOptions from "./adminjsOptions/AuthOptions";

class AdminJsClass {
  private readonly _adminJs: AdminJS;
  private readonly _adminJsRouter: Router;
  constructor() {
    AdminJS.registerAdapter(AdminJSSequelize);

    this._adminJs = new AdminJS({
      databases: [sequelize],
      rootPath: '/admin',
      resources: adminJsResources,
      branding: BrandingOptions.getOptions(),
      locale: locale,
      dashboard: DashboardOptions.getOptions(),
    });

    this._adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(this.adminJs, AuthOptions.getOptions(), null,
      {
        resave: false,
        saveUninitialized: false
      });
  }

  public get adminJs() {
    return this._adminJs;
  }

  public get adminJsRouter() {
    return this._adminJsRouter;
  }
}

export default new AdminJsClass();