import * as express from 'express'
import * as faker from 'faker'
//import * as cors from 'cors'
//import * as bodyParser from 'body-parser'
//create express app
const app = express();
//for mocking data
var faker = require('faker');

//app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({ extended: true }))
//app.use(cors())
app.get('/', (req, res, next) => {
    res.json('Hello world')
})

export default app
