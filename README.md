Employees management Web Application with CRUD React that consumes REST API.

There is REST API at https://9sf7x3qadg.execute-api.eu-west-1.amazonaws.com/api/

With the following endpoints:

| method | endpoint | description |
| --- | --- | --- |
| GET | /employee | list all employees |
| GET | /employee/:id | return a single employee object |
| POST | /employee | create new employee object with new ID (send JSON object containing all properties) |
| PUT | /employee/:id | update employee information (send JSON object containing all properties) |
| DELETE | /employee/:id | delete employee

## Install

```
npm install
npm start
```

It will run on `http://localhost:3000/`.
