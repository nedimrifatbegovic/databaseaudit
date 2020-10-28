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
  //   !  Important: in the file ormconfig, enable synchronize only for the first run, or database changes
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

  // -----------------------------------------------------------------------------------------------------------------------------------
  // Test Call
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // TODO: Login
  app.post("/login", (req: Request, res: Response, next: NextFunction) => {
    console.log("I got in login: ", req.body);
    res.send("Hello World");
  });

  // TODO: Change status of audit
  app.put("/externalauditors/:id", async function (
    req: Request,
    res: Response
  ) {
    // return res.send(results);
  });

  // TODO: Generate report for specific audit id
  app.post(
    "/report/:auditid",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Get all reports for specific ID
  app.get(
    "/allreport/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Get report for specific ID
  app.get("/report/:id", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // TODO: Get report proof for specific ID
  app.get(
    "/reportproof/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  //  * Calls for the Admin
  // TODO: Get all internal auditors
  app.get("/internal", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // TODO: Get all external auditors
  app.get("/external", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // TODO: Get internal auditors by id
  app.get(
    "/internal/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Get external auditors by id
  app.get(
    "/internal/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Add internal auditor
  app.post("/internal", async function (req: Request, res: Response) {
    // return res.send(results);
  });

  // TODO: Add external auditor
  app.post("/external", async function (req: Request, res: Response) {
    // return res.send(results);
  });

  // TODO: Remove internal auditor
  app.delete("/internal/:id", async function (req: Request, res: Response) {
    // ....
    // return res.send(results);
  });
  // TODO: Remove external auditor
  app.delete("/external/:id", async function (req: Request, res: Response) {
    // ....
    // return res.send(results);
  });

  //   * Calls for internal auditors
  // TODO: Update password
  app.put("/internalpassword", async function (req: Request, res: Response) {
    // return res.send(results);
  });

  // TODO: Get external auditors for specific internal auditor
  app.get(
    "/externalauditors/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Get details on a specific audit (previous audits, reports, status)
  app.get(
    "/externalauditor/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  //   * Calls for external auditors
  // TODO: Update password
  app.put("/externalpassword", async function (req: Request, res: Response) {
    // return res.send(results);
  });

  // TODO: Add internal auditor
  app.post("/addinternal/:id", async function (req: Request, res: Response) {
    // return res.send(results);
  });

  // TODO: Get all clients for specific external auditor
  app.get(
    "/allinternal/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // TODO: Get details on internal auditor
  app.get(
    "/internaldetails/:id",
    (req: Request, res: Response, next: NextFunction) => {
      res.send("Hello World");
    }
  );

  // -----------------------------------------------------------------------------------------------------------------------------------
  // start express server
  app.listen(port, () =>
    console.log("Server ready at http://localhost:" + port)
  );
})();
