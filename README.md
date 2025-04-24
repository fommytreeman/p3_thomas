# CS 453 - Project Three: Programmatic SQL

## Authors
- Thomas Freeman
- Emily Wilkie

## Date
- 2025 April 24

## Project Description
This project involves developing a series of SQL statements and executing them in various environments. The main tasks include:
1. Writing SQL statements to solve specific problems.
2. Executing these statements as a SQL batch script.
3. Implementing the SQL statements in four programmatic SQL environments: Node.js, Express.js, Sequelize, and stored routines.

### Files Included
- **p3_tester.sql**: Contains the SQL statements that solve each problem with hardcoded parameter values.
- **p3_stored.sql**: A SQL batch file containing stored routines that can be called from a Node.js application.
- **p3_stored.js**: A Node.js program that calls the stored routines using the MySQL database API.
- **p3_node.js**: A Node.js program that sends individual SQL statements using the MySQL database API.
- **p3_express.js**: A Node.js program using the Express web framework to expose HTTP endpoints for each problem.
- **p3_sequelize.js**: A Node.js program using Express and Sequelize to expose HTTP endpoints for each problem.
- **p3_curl.sh**: A shell script with curl commands to execute the HTTP endpoints for each problem.
- p3_ex_params.json: Given
- README.md: Descriptive markdown file

## Testing Instructions
To test the submission, follow these steps:

1. **Set Up the Database**:
```
mysql -u root -p < init.sql
```
   - Run the `init.sql` script to set up the `univ_db` database and populate it with initial data.

2. **Test SQL Statements**:
```
mysql -u root -p < p3_tester.sql
```
   - Execute the `p3_tester.sql` file to verify the SQL statements solve the problems correctly.

3. **Test Stored Routines**:
```
mysql -u root -p < p3_stored.sql
node p3_stored.js
```
   - Run the `p3_stored.sql` script to create the stored routines in the database.
   - Execute the `p3_stored.js` file to call the stored routines and verify the output.

4. **Test Node.js Program**:
```
node p3_node.js
```
   - Execute the `p3_node.js` file to run the individual SQL statements and verify the output.

5. **Test Express.js Program**:
```
node p3_express.js
```
- Start the server by running `p3_express.js`.
- Then open a different terminal
```
sh p3_curl.sh
```
   - Use the `p3_curl.sh` script to send HTTP requests to the endpoints and verify the output.
   - ^C to disconnect

6. **Test Sequelize Program**:
```
node p3_sequelize.js
```
   - Start the server by running `p3_sequelize.js`.
   - Then open a different terminal
```
sh p3_curl.sh
```
   - Start the server by running `p3_sequelize.js`.
   - Use the `p3_curl.sh` script to send HTTP requests to the endpoints and verify the output.
   - ^C to disconnect


## Troubleshooting

- **Error: Cannot find module '_'**

- **Install the `mysql2`, `express` & `sequelize` package**:
```
npm install mysql2 express sequelize
```
- **Clear npm cache**:
```
npm cache clean --force
```
- **Reinstall dependencies**:
```
rm -rf node_modules
npm install
```

## Known Issues
- None

## Additional Notes
- Ensure that the MySQL server is running and accessible.
- Update the database connection details (host, user, password) in the JavaScript files as needed.
- The `p3_curl.sh` script assumes the server is running on `localhost` and port `3000`.
