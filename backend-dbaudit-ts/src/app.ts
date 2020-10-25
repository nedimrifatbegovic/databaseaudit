import "reflect-metadata";

import * as bodyParser from "body-parser";

import { createConnection, getConnection } from "typeorm";
import express, { Application, NextFunction, Request, Response } from "express";

import { Admin } from "./entity/Admin";
import { Audit } from "./entity/Audit";
import { AuditRequest } from "./entity/AuditRequest";
import { Config } from "./entity/Config";
import { ExternalAuditor } from "./entity/ExternalAuditor";
import { InternalAuditor } from "./entity/InternalAuditor";
import { Report } from "./entity/Report";
import cors from "cors";

// Queries
// TODO: Create and import queries for the database

// Controllers
// TODO: Create and import controllers needed for the api calls

(async () => {
  await createConnection();
  const connection = getConnection();

  //   Repositories
  const adminRepository = connection.getRepository(Admin);
  const auditRepository = connection.getRepository(Audit);
  const configRepository = connection.getRepository(Config);
  const externalRepository = connection.getRepository(ExternalAuditor);
  const internalRepository = connection.getRepository(InternalAuditor);
  const reportRepository = connection.getRepository(Report);
  const requestRepository = connection.getRepository(AuditRequest);

  // create and setup express app
  const port: number = 5000;
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  // Test Call
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // -----------------------------------------------------------------------------------------------------------------------------------
  // start express server
  app.listen(port, () =>
    console.log("Server ready at http://localhost:" + port)
  );
})();
