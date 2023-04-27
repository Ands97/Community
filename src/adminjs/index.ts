import AdminJS from "adminjs";
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import { sequelize } from "../app/db";
import { Router } from "express";
import { adminJsResources } from "./resources";
import { Category, Course, Episode, User } from "../app/models";
import bcrypt from 'bcrypt';
import Login from "./components/login";
import { locale } from "./locale";

class AdminJsClass {
  private readonly _adminJs: AdminJS;
  private readonly _adminJsRouter: Router;
  constructor() {
    AdminJS.registerAdapter(AdminJSSequelize);

    this._adminJs = new AdminJS({
      databases: [sequelize],
      rootPath: '/admin',
      resources: adminJsResources,
      branding: {
        companyName: 'Community',
        logo: '/assets/img/Inc.Community.svg',
        theme: {
          colors: {
            primary100: '#004aad',
            primary80: '#ff1a57',
            primary60: '#ff3369',
            primary40: '#ff4d7c',
            primary20: '#ff668f',
            grey100: '#151515',
            grey80: '#333333',
            grey60: '#4d4d4d',
            grey40: '#666666',
            grey20: '#dddddd',
            filterBg: '#333333',
            accent: '#151515',
            hoverBg: '#151515',
          }
        }
      },
      locale: locale,
      dashboard: {
        component: AdminJS.bundle("./components/Dashboard"),
        handler: async (req, res, context) => {
          const courses = await Course.count()
          const episodes = await Episode.count()
          const category = await Category.count()
          const standardUsers = await User.count({ where: { role: 'user' } })
    
          res.json({
            'Cursos': courses,
            'Episódios': episodes,
            'Categorias': category,
            'Usuários': standardUsers
          })
        },
      }
    });

    // this.overrideLogin();

    this._adminJsRouter = AdminJSExpress.buildAuthenticatedRouter(this.adminJs, {
      authenticate: async (email, password) => {
        const user = await User.findOne({ where: { email } });

        if(!user || user.role == 'user'){
          return
        }

        const matched = await bcrypt.compare(password, user.password);

        if(!matched){
          return
        }

        return user
      },
      cookiePassword: 'senha'
    }, null,
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

  private overrideLogin(){
    this._adminJs.overrideLogin({ component: Login })
  }
}

export default new AdminJsClass();