## DAO API

### This application utilizes graphql, a postgres database, and Apollo server express to allow users to query data about popular DOAs after authenticating with a jwt token.

#### Prerequisites:
- pgAdmin
- Node v12 or higher
- sequelize cli

#### Database setup:
- Run `sudo -u postgres psql` from your terminal
- create the db with `create database defidb;`
- create a pgAdmin user with the same username associated to your pgadmin account with `create user User with password 'password';`
- Grant the user privelages with `grant all privelages on database defidb to User;`
- In the pgadmin gui connect the server by clicking "Register" -> "Server" 
- In the modal add a server name under the general tab. Then add "localhost" for the host name and user name and password you just created under the connection tab. Click the save button
- Check the server now contains the database you created
- In the poject change the `config/config.json` to use your username, password, and database name
- From your terminal run `sequelize model: generate --name User --attributes login:string,password:string` to add the User table to your database

#### Project Structure:
- The graphql schema is located in `src/schemas/schema.js`
- The resolver is located in `src/resolvers/resolvers.js`
- For now there is some data hardcoded in the project in `src/data/dao.js`
- Run `npm install` from the root to install dependencies
- To start the application run `npm run start` from the project root directory. That runs the `index.js` from the root
- You can then access the Apollo explorer at `http://localhost:300`
- First use the `register` mutation to register a user - you must include a username and password in the mutation. That provides a jwt token neccessary to access the queries. After you create a user you can use the login mutation to get a jwt token
- Add the token by selecting "Authentication" in the headers tab in the Apollo gui. In the value box add "Bearer {{your generated token}}"
- This gives you access to conduct queries on the DAO data.

##### Notes:
- There is a curent authentication bug for the queries that will be resolved shortly
- There is a plan to utlize a postgres docker container to automate the database setup and to dynamically access more DAO data. 
- This project is a work in progress.
