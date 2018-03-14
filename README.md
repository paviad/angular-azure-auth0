# Angular Azure Auth0 Application Template

## What is this?

This is a template for a web site application which includes:

1. An angular (^5.2.8) application as front end
2. Redux architecture using `@ngrx/store` and its related libraries
3. Angular Material (^5.2.4)
4. An ASP.NET Web API application as back end
5. Authentication using Auth0.com (https://auth0.com)
6. Build definitions for VisualStudio online (https://www.visualstudio.com)

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
|/      |site\wwwroot\apinetbase| Yes       |
|/      |site\wwwroot\dist      | Yes       |

(Example Azure Portal Screenshot:)

![dfg](https://image.ibb.co/jRUCPc/image.png)

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
