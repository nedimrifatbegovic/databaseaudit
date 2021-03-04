import "reflect-metadata";

import * as bodyParser from "body-parser";

import { createConnection, getConnection } from "typeorm";
import express, { Application, NextFunction, Request, Response } from "express";
import {
  updateAuditResolved,
  updateAuditStatus,
} from "./queries/ReportQueries";

import AdminQueries from "./queries/AdminQueries";
import ExternalQueries from "./queries/ExternalQueries";
import InternalQUeries from "./queries/InternalQUeries";
import cors from "cors";

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
  // await generateReport("beclija@outlook.de");
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
      result = await ExternalQueries.getCredentials(
        req.body.email,
        req.body.password
      );
    }
    return res.send(result);
  });

  // * Internal audit request
  app.post("/getexternalaudits", async function (req: Request, res: Response) {
    const response = await InternalQUeries.getAllExternalAudits(req.body.email);
    const output = {
      report: response,
    };
    return res.send(output);
  });

  // Get internal requests
  app.post(
    "/internalauditrequest",
    async function (req: Request, res: Response) {
      console.log("internalauditrequest: ", req.body);
      // * Check if audit already exists
      // * If yes generate new report
      // * If no generate new audit for internal, and return new report
      const response = await InternalQUeries.internalReport(req.body.email);
      const output = {
        report: response,
      };
      return res.send(output);
    }
  );

  // Change status of audit
  app.post("/changeauditstatus", async function (req: Request, res: Response) {
    console.log("Updating audit status...", req.body);
    const response = await updateAuditStatus(req.body.auditid, req.body.status);
    console.log(response);
    return res.send(response);
  });

  // Get all unresolved requests (where config is not working - issue auditing)
  app.post("/unresolvedrequests", async function (req: Request, res: Response) {
    const response = await InternalQUeries.getUnresolvedRequests(
      req.body.email
    );
    const output = {
      report: response,
    };
    return res.send(output);
  });

  // Get all reports for specific ID
  app.post("/allreports", async function (req: Request, res: Response) {
    const response = await InternalQUeries.loadAllReports(req.body.email);
    return res.send(response);
  });

  // Calls for the Admin
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

  // Calls for internal auditors
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
    let result = await InternalQUeries.checkConfiguration(req.body.email);
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

  // * Calls for external auditors
  // Update password
  app.post("/externalpassword", async function (req: Request, res: Response) {
    console.log(req.body);
    let result: boolean = false;
    if (req.body !== undefined) {
      result = await ExternalQueries.updateExternalPassword(
        req.body.email,
        req.body.newpassword
      );
    }
    const response = {
      status: result,
    };
    return res.send(response);
  });

  // Add internal auditor
  app.post("/adduniqueiduser", async function (req: Request, res: Response) {
    console.log(req.body);

    if (req.body) {
      let result = await ExternalQueries.addClient(
        req.body.email,
        req.body.uniqueid
      );

      const response = {
        result: result,
      };
      return res.send(response);
    } else {
      const response = {
        result:
          "Unique ID not received! Please try again or contact the application administrator!",
      };
      return res.send(response);
    }
  });

  // Get all clients for specific external auditor
  app.post(
    "/getallclientsexternaluser",
    async function (req: Request, res: Response) {
      console.log(req.body);

      if (req.body) {
        let result = await ExternalQueries.getClients(req.body.email);

        return res.send(result);
      } else {
        const response = [
          {
            auditid: "0",
            error:
              "Unique ID not received! Please try again or contact the application administrator!",
          },
        ];
        return res.send(response);
      }
    }
  );

  // Get internal requests
  app.post(
    "/externalauditrequest",
    async function (req: Request, res: Response) {
      console.log("External audit request: ", req.body);
      // * Generate new report for audit with id X
      const response = await ExternalQueries.externalReport(
        req.body.auditid,
        req.body.email
      );
      const output = {
        report: response,
      };
      return res.send(output);
    }
  );

  // Get all reports for specific audit ID
  app.post("/allexternalreports", async function (req: Request, res: Response) {
    console.log("Loading external reports...", req.body);
    const response = await InternalQUeries.loadAllExternalReports(
      req.body.auditid
    );
    return res.send(response);
  });

  // Get all reports for specific audit ID
  app.post(
    "/updateresolvedaudit",
    async function (req: Request, res: Response) {
      console.log("Loading resolved audit...", req.body);
      const response = await updateAuditResolved(
        req.body.auditid,
        req.body.action
      );
      return res.send(response);
    }
  );
  // -----------------------------------------------------------------------------------------------------------------------------------
  // start express server
  app.listen(port, () =>
    console.log("Server ready at http://localhost:" + port)
  );
})();
