import { NextFunction, Request, Response } from 'express';
import * as pgPromise from 'pg-promise';

import { db } from '../database';
/**
 * Test making call
 */
// var request = require('request');
// var url = ('https://raw.githubusercontent.com/mjhea0/typescript-node-api/master/src/data.json');
// var Users;
// request(url, function (error, response, body) {
//   if (!error && response.statusCode == 200) {
//     Users = JSON.parse(body);
//     console.log(Users);
//   }
// });
/*
**/
export class UsersRouter {

  /**
   * GET all Users.
   */
  public static getAll(req: Request, res: Response, next: NextFunction) {
    db.connect()
      .then((obj: pgPromise.IConnected<{}>) => {
        // console.log("testing connection");
        // obj.done(); // success, release the connection;
      })
      .catch((error) => {
        // console.log("ERROR:", error.message);
      });
    // res.send(Users);
    db.any('SELECT * FROM public."Users"')
      .then((data) => {
        res.status(200)
          .json({
            data,
            message: 'Retrieved ALL Users',
            status: 'success'
          });
        // console.log(data);
      })
      .catch((err) => next(err));
  }
}