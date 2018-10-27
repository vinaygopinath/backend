'use strict';
import * as bcrypt from 'bcrypt'; // hashing library for passwords
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as passport from 'passport';
import * as passportJwt from 'passport-jwt'
import * as LocalStrategy from 'passport-local'

import { EventRouter } from './routes/EventRouter';
import { UserRouterSchema } from './routes/requestSchemas/UserRouterSchema';
import { UserRouter } from './routes/UserRouter';
import { AppConstants } from './utils/AppConstants';
import { envConfig } from './utils/envConfig'; // Environment-specific configuration
import { ValidationUtil } from './utils/ValidationUtil';

export const app = express();

const prefix = envConfig.apiPrefix ? `${envConfig.apiPrefix}/v${AppConstants.API_VERSION}` : `v${AppConstants.API_VERSION}`;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

// passport authentication strategies

const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

// create local strategy

const localOptions = { usernameField: 'email' };

/**
 * Sign in using Email and Password.
 */

const localLogin = new LocalStrategy.Strategy(localOptions, (email, password, done) => {
  return UserRouter.verifyUser(email)
    .then((dbUser) => {
      if (!dbUser) {
        return done(null, false)
      }

      bcrypt.compare(password, dbUser.password)
        .then((validPassword: boolean) => {
          if (validPassword) {
            return done(null, dbUser)
          }
          return done(null, false)
        })
        .catch(err => done(err, false))
    });
});

// setup options for JWT strategy
const jwtOptions = {
  jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: envConfig.jwtSecretKey
}

// create jwt Strategy
const jwtLogin = new jwtStrategy(jwtOptions, (payload: any, done: any) => {
  return UserRouter.findUserById(payload.sub)
    .then((foundUser) => {
      if (foundUser) {
        return done(null, foundUser)
      }
      return done(null, false)
    })
    .catch(err => done(err, false))
})
// tell passport to use this strategy
passport.use(jwtLogin)
passport.use(localLogin)

if (process.env.NODE_ENV === 'local') {
  app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
  });
}

// const requireAuth = passport.authenticate('jwt', { session: false })
// passport middleware. Session is set to false since JWT doesn't require sessions on the server
const requireSignIn = passport.authenticate('local', { session: false })
// GET Single User
app.get(`/${prefix}/users/:id`, UserRouter.getUser);
// GET All Users
app.get(`/${prefix}/users`, UserRouter.getAll);
// SignUp User
app.post(`/${prefix}/signUp`, UserRouter.signUp)

// Events
app.get(`/${prefix}/events`, EventRouter.getEvents)

// Login User that requires authentication
app.post(`/${prefix}/login`,
  (req, res, next) => ValidationUtil.validateRequest(req, res, next, UserRouterSchema.LOGIN, 'body'),
  requireSignIn, UserRouter.login)

app.get(`/${prefix}/`, (req, res) => res.send('<h1>Syna3C backend</h1><p>Visit <a href="https://github.com/Syna3C/backend">GitHub</a> for more information</p>'));
app.get('/', (req, res) => res.redirect(`/${prefix}/`));