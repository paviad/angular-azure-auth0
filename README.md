# Angular Azure Auth0 Application Template

## What is this?

This is a template for a web site application which includes:

1. An angular (^5.2.8) application as front end
2. Redux architecture using `@ngrx/store` and its related libraries
3. Angular Material (^5.2.4)
4. An ASP.NET Web API application as back end
5. Authentication using Auth0.com (https://auth0.com)
6. Build definitions for VisualStudio online (https://www.visualstudio.com)
7. Hangfire scheduled task manager support (https://www.hangfire.io/)

It fully supports local development using VS2017 - checkout Local Development below.

## How to configure?

There are several things which need to be done in order for this application to work in your environment:

1. Set up Azure
2. Set up Auth0
3. Set up Visual Studio online for continuous build

### Setting up Azure

An Azure Web App is required, with the following virtual applications and directories definitions:

|Virtual|Path           |Application|
|-------|-----------------------|-----------|
|/      |site\wwwroot           | Yes       |
|/api   |site\wwwroot\apibase   | Yes       |
|/dist  |site\wwwroot\dist      | Yes       |

### Setting up Auth0

Go to https://auth0.com register or sign in, and then create these two entities in Auth0:

1. A client
2. An api

#### The Auth0 Client

Under "Clients" click "+ NEW CLIENT", then select "Single Page Web Applications", and then select "Angular 2+". You may then read and follow the instructions if you want, but to summarize here are the necessary steps:

1. From the client settings copy the "Client ID" field into `\Frontend\src\app\services\auth.service.ts` into the `clientID` field of the `auth0` object.
2. From the client settings copy the "Domain" field into `\Frontend\src\app\services\auth.service.ts` into the `domain` field of the `auth0` object, and into `\Backend\Startup.cs` into the `domain` variable.

#### The Auth0 API

Under "APIs" click "+ CREATE API" fill in a name (whatever you want), and an "Identifier" which is a URI string (e.g. `https://api.yourapp.com`)

Copy this identifier into `\Frontend\src\app\services\auth.service.ts` into the `audience` field of the `auth0` object, and into `\Backend\Startup.cs` into the `audience` variable.

### Setting up Visual Studio online

Go to https://www.visualstudio.com register or sign in, create a project and then proceed.

Under "Builds and Releases" and there under "Builds" click the "+ Import" button, import these files from the root directory of this repository:

1. Build-ASP.NET-CI.json
2. Build-CI-Angular.json
3. Build-Copy Root Files.json

Once these are imported, edit them in turn, and configure the "Tasks" and the "Triggers" to match your azure and visual studio accounts.

Next, get the git url (either http:// or git:// as you prefer) and define a git remote in your repository, and then you can push into this remote and have visual studio online build and deploy it to azure automatically.

*Note:* You also need to define an agent or use a hosted one, this is beyond the scope of this readme file.

## Local Development

Open a command prompt, navigate to the `\Frontend` folder and type `npm start`, then open VS2017 and open the solution file `Backend.sln` - run that project.

Then you may navigate to `http://localhost:4200` and use the application locally.

If you want to use an SQL database, create a new SQL database file through VS2017 by choosing "Add New Item..." into the project and selecting "SQL Server Database". Leave the name as `Database1.mdf`.

If you don't want to use an SQL database, or if you don't want to use `Hangfire` you need to comment some lines in `\Backend\Startup.cs` (they are clearly marked).
