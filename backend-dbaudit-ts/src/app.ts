import "reflect-metadata";

import * as bodyParser from  "body-parser";

import {createConnection, getConnection} from "typeorm";
import express, {Application, NextFunction, Request, Response} from "express";

import cors from "cors";

(async () => {
    // await createConnection(); 
    // const connection = getConnection();  

    // create and setup express app
    const port: number = 5000;  
    const app: Application = express();  
    app.use(bodyParser.json());  
    app.use(cors());
  
    // Test Call
    app.get('/', (req: Request, res: Response, next: NextFunction) =>  
    {  
        res.send('Hello World');
    });
      
    
     
    // -----------------------------------------------------------------------------------------------------------------------------------
    // start express server 
    app.listen(port, ()=> console.log('Server ready at http://localhost:'  + port));  
  
})();