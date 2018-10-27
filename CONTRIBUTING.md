Thanks for your interest in contributing to the Syna3C backend repository! :tada: :tada:

## Issues

### I think I've discovered a bug
If you experience unexpected behaviour on the production site [syna3c.org](https://syna3c.org) or the developer site [dev.syna3c.org](https://dev.syna3c.org)

1. Check whether it's a bug in the frontend or the backend code (TODO: How?)
2. Check the [issues](https://github.com/Syna3C/backend/issues) to see if it's already been reported.
3. **If it has already been reported**, check if your case provides any additional information on the issue that might be helpful to the developers.
   - Did you notice the bug on a different platform than the one(s) mentioned in the bug report?
   - Were you able to reproduce the bug in a different way?
4. If your bug information seems relevant to the issue, please leave a comment with a brief description, list of steps to reproduce, and your platform information (production site vs developer site, operating system and version, browser and version).
5. If your bug information is exactly the same as in the bug description, add a +1 reaction on the issue. This will help the developers recognize that it is a commonly occuring bug and prioritize finding a fix. Avoid comments like "+1" and "I have the same issue" that add nothing to the discussion and send out unhelpful notifications to everyone involved in the discussion.
6. **If it has not been reported**, [create a new bug report issue](https://github.com/Syna3C/backend/issues/new?template=bug_report.md), filling out the template with a description of the bug, steps to reproduce, expected behaviour and information on your browser and OS, and anything else you think might be relevant to the issue.

### I'd like to make a feature request

1. Determine the right repository - [frontend](https://github.com/Syna3C/frontend) for purely visual changes, [backend](https://github.com/Syna3C/backend) for changes to the API, or both, if the feature encompasses both.
2. [Create a new feature request issue](https://github.com/Syna3C/backend/issues/new?template=feature_request.md), filling out the template with a description of the problem your feature would address, the details of the solution you'd like to see, and any other information that might be relevant to the issue.
3. A core contributor will review your feature request and mark it as accepted if it aligns with the roadmap (TODO: Link to project roadmap) of the project, or close the issue with an explanatory comment if it seems outside the scope of the project.

Please note that as a volunteer-led effort, Syna3C may not be able to fix bugs or implement your feature request right away. 

## Development

### Tech stack

The backend repository uses:
* Node.js - Server-side Javascript run-time environment
* Express - Web-app framework for node.js
* Postgres - Relational database
* Typescript - Superset of Javascript that adds static typing
* Jasmine - Test framework for Javascript
* npm - Node.js package manager

### Getting started

Syna3C uses [the forking workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/forking-workflow). Please [fork the Syna3C backend repository](https://help.github.com/articles/fork-a-repo/) before you get started.

1. Install
   - [Node](https://nodejs.org) 8.11+
   - [npm](https://docs.npmjs.com/troubleshooting/try-the-latest-stable-version-of-npm) 6+
   - [Git](https://git-scm.com/downloads) installed)
   - [Postgres](https://www.postgresql.org/download/)
   - [PostGIS extension for Postgres](http://postgis.net/install/)
   - (Optional - Postgres GUI) [pgAdmin](https://www.pgadmin.org/download/)
   - (Optional - REST client for testing endpoint request/response) [Insomnia (open-source)](https://github.com/getinsomnia/insomnia) or [Postman - proprietary](https://www.getpostman.com/)
2. Clone your newly forked repository locally
   ```bash
   git clone git@github.com:<YOUR_GITHUB_USERNAME>/backend.git
   ```
3. Open the `backend` folder and install the project dependencies
   ```bash
   npm install
   ```
4. Familiarize yourself with the commonly used npm commands of the `backend` repo (Full list available in `package.json` under `scripts`)
   ```bash
   npm run start:local // Starts a local server for development that watches for changes in the src folder
   npm test // Runs Jasmine tests
   npm run build // Generates a dist folder with transpiled JS files
   ```
5. Create the Postgres database
   ```bash
   psql -f docs/postgres/main.sql
   ```
6. Create the configuration file `src/config.ts` with the following content, specifying your Postgres username (most likely `postgres`) under the local configuration. **This file should never be checked into the repository for security reasons**
   ```typescript
    import { IEnvConfig } from '../src/interfaces/IEnvConfig';
    export const config: {
      development: IEnvConfig,
      local: IEnvConfig,
      production: IEnvConfig
    } = {

      development: {
        jwtSecretKey: 'key-to-be-used-as-jwt-secret-on-dev-server',
        port: 80,
        postgresUri: 'refer-to-azure-for-uri-to-postgres-dev-instance?ssl=true'
      },

      local: {
        jwtSecretKey: 'key-to-be-used-as-jwt-secret-on-localhost',
        port: 4001,
        postgresUri: 'postgres://YOUR-LOCAL-POSTGRES-USERNAME-HERE:@localhost:5432/s3c_db_dev'
      },

      production: {
        jwtSecretKey: 'key-to-be-used-as-jwt-secret-on-prod-server',
        port: 80,
        postgresUri: 'refer-to-azure-for-uri-to-postgres-prod-instance?ssl=true'
      }
   };
   ```
   
   You're all set!
   Try running `npm run start:local`. You should see the message `Server started on port 4001`.

### Project structure
<pre>
├── dist
├── node_modules
├── docs
    ├── postgres
├── src
    ├── interfaces
    ├── routes
    ├── services
    ├── utils
    ├── <b>app.ts</b>
    ├── <b>config.ts</b>
    ├── <b>database.ts</b>
    ├── <b>server.ts</b>
├── <b>package.json</b>
├── <b>CONTRIBUTING.md</b>
</pre>

* **dist**: Contains the transcompiled Javascript files produced when `npm run build` completes successfully. The contents of the folder can be deployed to a server.

* **node_modules**: The package dependencies of the project are downloaded into this folder when `npm install` is executed. The package dependencies (and versions) are listed in `package.json`

* **docs**: Documentation of the project

* **docs/postgres**: The Postgres SQL scripts that set up the database for the project. `main.sql` refers to the other files in the folder in the right order. Running `main.sql` should suffice to set up the tables and extensions of the project database.

* **src**: The backend source code

* **src/interfaces**: The Typescript interfaces that define the structure of HTTP requests and responses, and the rows in the database.

* **src/routes**: The Express route handlers, grouped by feature or entity. The route handlers perform validation, pass on valid requests to services, and respond to the HTTP request.

* **src/services**: The services are invoked by Express route handlers to perform the action triggered by the HTTP request. These services implement the core functionality of the backend, and must not respond to the HTTP response themselves.

* **src/utils**: Helper methods and constants used by multiple routes handlers and services

* **src/app.ts**: The core of the app that implements login and signup, and redirects other HTTP requests to the appropriate route handlers. Any new endpoints must be registered here.


* **src/config.ts**: The environment-specific configuration to be used by the server. Depending on the `NODE_ENV` environment variable, the local, development or production configuration may be used.

* **src/database.ts**: A singleton that initiates a connection to the database.

* **src/server.ts**: The entry point of the backend. Starts an HTTP server.

* **src/package.json**: Lists the packages syna3c-backend depends on. Refer [npm documentation](https://docs.npmjs.com/files/package.json) for more information

* **src/CONTRIBUTING.md** - This file.
