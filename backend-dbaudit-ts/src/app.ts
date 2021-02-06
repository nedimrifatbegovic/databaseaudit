import "reflect-metadata";

import * as bodyParser from "body-parser";

import { createConnection, getConnection } from "typeorm";
import express, { Application, NextFunction, Request, Response } from "express";

import AdminQueries from "./queries/AdminQueries";
import InternalQUeries from "./queries/InternalQUeries";
import cors from "cors";
import { generateReport } from "./queries/ReportQueries";

// import { asyncFunction } from "./client/testRemotedatabase";

(async () => {
  //   !  Important: in the file ormconfig, enable synchronize only for the first run, or database changes
  await createConnection();
  const connection = getConnection();

  // create and setup express app
  const port: number = 5000;
  const app: Application = express();
  app.use(bodyParser.json());
  app.use(cors());

  //Test DB
  //TODO: Add email as input from frontend
  await generateReport("beclija@outlook.de");
  // ----------------------------------------------------------------------------------------------------------------------------
  // Test Call
  app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
  });

  // User Login
  app.post("/login", async function (req: Request, res: Response) {
    console.log("Login data received: ", req.body);
    let result: boolean = false;
    if (req.body.type === "admin") {
      result = await AdminQueries.getCredentials(
        req.body.email,
        req.body.password
      );
    } else if (req.body.type === "internal") {
      result = await InternalQUeries.getCredentials(
        req.body.email,
        req.body.password
      );
    } else if (req.body.type === "external") {
      // TODO
    }
    return res.send(result);
  });

  // TODO: Change status of audit
  app.put(
    "/externalauditors/:id",
    async function (req: Request, res: Response) {
      // return res.send(results);
    }
  );

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

  //  * Calls for the Admin
  app.post("/loadinternal", async function (req: Request, res: Response) {
    // console.log("Load internal data received: ", req.body);
    const response = await AdminQueries.getInternal(
      req.body.email,
      req.body.type
    );
    return res.send(response);
  });

  app.post("/loadexternal", async function (req: Request, res: Response) {
    // console.log("Load external data received: ", req.body);
    const response = await AdminQueries.getExternal(
      req.body.email,
      req.body.type
    );
    return res.send(response);
  });

  //Update User Attribute
  app.post("/updateinternal", async function (req: Request, res: Response) {
    console.log("Update internal data received: ", req.body);
    const response = await AdminQueries.updateInternal(
      req.body.email,
      req.body.newValue.type,
      req.body.newValue.newValue
    );
    return res.send(response);
  });

  app.post("/updateexternal", async function (req: Request, res: Response) {
    const response = await AdminQueries.updateExternal(
      req.body.email,
      req.body.newValue.type,
      req.body.newValue.newValue
    );
    return res.send(response);
  });

  // Add internal auditor
  app.post("/internal", async function (req: Request, res: Response) {
    // console.log("Internal auditor data received: ", req.body);
    let result: any;
    if (req.body !== undefined) {
      result = await AdminQueries.setInternal(
        req.body.email,
        req.body.password,
        req.body.companyname
      );
    }
    const response = {
      folderid: result,
    };
    return res.send(response);
  });

  // Add external auditor
  app.post("/external", async function (req: Request, res: Response) {
    // console.log("Internal auditor data received: ", req.body);
    let result: any;
    if (req.body !== undefined) {
      result = await AdminQueries.setExternal(
        req.body.email,
        req.body.password,
        req.body.companyname
      );
    }
    const response = {
      folderid: result,
    };
    return res.send(response);
  });

  // Delete auditor
  app.post("/deleteuser", async function (req: Request, res: Response) {
    let result: boolean = false;
    if (req.body !== undefined) {
      if (req.body.type === "internal") {
        result = await AdminQueries.removeInternal(req.body.email);
      } else if (req.body.type === "external") {
        result = await AdminQueries.removeExternal(req.body.email);
      }
    }
    const response = {
      status: result,
    };
    return res.send(response);
  });

  //   * Calls for internal auditors
  app.post("/internalpassword", async function (req: Request, res: Response) {
    let result: boolean = false;
    if (req.body !== undefined) {
      result = await InternalQUeries.updateInternalPassword(
        req.body.email,
        req.body.newpassword
      );
    }
    const response = {
      status: result,
    };
    return res.send(response);
  });

  // Add New Configuration
  app.post("/newconfig", async function (req: Request, res: Response) {
    let result: boolean = false;
    if (req.body !== undefined) {
      result = await InternalQUeries.setNewConfiguration(
        req.body.configdata,
        req.body.privatekeybase64,
        req.body.internalMail
      );
    }
    const response = {
      status: result,
    };
    return res.send(response);
  });

  // Check if Configuration Exists
  app.post("/checkconfig", async function (req: Request, res: Response) {
    let result: boolean = false;

    if (req.body !== undefined) {
      result = await InternalQUeries.checkConfiguration(req.body.email);
    }
    return res.send(result);
  });

  // Update Config Field
  app.post("/updateconfig", async function (req: Request, res: Response) {
    let result: boolean = false;
    if (req.body !== undefined) {
      result = await InternalQUeries.updateConfigValue(
        req.body.email,
        req.body.attributeValue,
        req.body.attributeName
      );
    }
    return res.send(result);
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

  // -----------------------------------------------------------------------------------------------------------------------------------
  // start express server
  app.listen(port, () =>
    console.log("Server ready at http://localhost:" + port)
  );
})();
