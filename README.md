# melee-pr-express
Super Smash Bros. Melee Power Ranking REST API designed with Express.js.

## Instructions

### Requirements

- Node.js: `node --version` >= 9.x
- NPM: `npm --version` >= 5.x
- MongoDB: `mongo --version` >= 3.x

Start MongoDB before using the app
```
sudo systemctl start mongodb.service
```

### Installation

Install project dependencies with `npm install`

### Development server

Run node server with `npm start`

Navigate to http://localhost:3000 to access the server.

The app will automatically reload if you change any of the source files.

### Testing

#### Unit tests

Run unit tests with ``npm run unit-tests`` using [mocha](https://mochajs.org/).
This script create a new empty test database and drop it when all tests are completed.

#### Load tests

Run load tests with ``npm run load-tests`` using [artillery](https://artillery.io).
Load tests require a launched test server as it send HTTP requests.

### API Features

Send HTTP requests to http://localhost:3000/api

<table>
    <thead>
        <th>Feature</th>
        <th>URL</th>
        <th>GET</th>
        <th>POST</th>
        <th>PUT</th>
        <th>DELETE</th>
    </thead>
    <tbody>
        <tr>
            <td>User</td>
            <td><code>user</code></td>
            <td>Optional parameter: <code>:id</code></td>
            <td>
                <pre>
{
    "username": "david",
    "password": "mystrongpassword",
    "role": "manager"
}
                </pre>
            </td>
            <td>
                <pre>
{
    "_id": "507f1f77bcf86cd799439011",
    "username": "david",
    "password": "mystrongpassword",
    "role": "admin"
}
                </pre>
            </td>
            <td>Optional parameter: <code>:id</code></td>
        </tr>
        <tr>
            <td>Player</td>
            <td><code>player</code></td>
            <td>Optional parameter: <code>:id</code></td>
            <td>
                <pre>
{
    "name": "Kazoo",
    "mains": ["sheik", "ics"],
    "location": "Grenoble",
    "score": 1500,
}
                </pre>
            </td>
            <td>
                <pre>
{
    "_id": "507f191e810c19729de860ea",
    "name": "Bobi",
    "mains": ["falco"],
    "location": "Lyon",
    "score": 2000,
}
                </pre>
            </td>
            <td>Optional parameter: <code>:id</code></td>
        </tr>
        <tr>
            <td>Tournament</td>
            <td><code>tournament</code></td>
            <td>Optional parameter: <code>:id</code></td>
            <td>
                <pre>
{
    "name": "G.R.A.S. #9",
    "organiser": "Ensimag Gaming",
    "location": "Grenoble"
}
                </pre>
            </td>
            <td>
                <pre>
{
    "_id": "507f2d8d1s810c11k94d5a6pmz",
    "name": "Arcamelee 3",
    "organiser": "Team Arcaneum",
    "location": "Lyon"
}
                </pre>
            </td>
            <td>Optional parameter: <code>:id</code></td>
        </tr>
        <tr>
            <td>Match</td>
            <td><code>match</code></td>
            <td>Optional parameter: <code>:id</code></td>
            <td>
                <pre>
{
    "player1": "507f9a6e84q71972w4q86az7",
    "player2": "505d8a9ze4qofp83w7a969a6",
    "score1": 3,
    "score2": 1,
    "tournament": "505d89a6e47a4w1q2w7a4a7a6"
}
                </pre>
            </td>
            <td>
                <pre>
{
    "_id": "501w47a69a5q71979d5q417edw",
    "score1": 2,
    "score2": 0
}
                </pre>
            </td>
            <td>Optional parameter: <code>:id</code></td>
        </tr>
    </tbody>
</table>

**``matches`` field in the POST/PUT requests could be destructive. It has been disable for editing to avoid database corruption!**
**You cannot edit ``player1``, ``player2`` and ``tournament`` fields of a match for the same reason**

#### Authentication

Use ``api/user`` route for authentication as it is required to use most of POST/PUT/DELETE requests.

Authentication is based on [JSON Web Tokens](https://jwt.io). Use it as *Bearer Authentication Token* in your request header.

#### HTTP request examples

Get player id `509637a41d5q7az697d1417az5` data
```
GET http://localhost:3000/api/player/509637a41d5q7az697d1417az5
```

Get all matches data
```
GET http://localhost:3000/api/match
```

Sign in
```
POST http://localhost:3000/api/user/login

HEADERS
Content-Type: application/json

BODY
{
    "username": "admin",
    "password": "password"
}
```

Create a new player
```
POST http://localhost:3000/api/player

HEADERS
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I...
Content-Type: application/json

BODY
{
    "username": "admin",
    "password": "password"
}
```

Edit scores of an existing match
```
PUT http://localhost:3000/api/match

HEADERS
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I...
Content-Type: application/json

BODY
{
    "_id": "501w47a69a5q71979d5q417edw",
    "score1": 3,
    "score2": 1
}
```

Delete a tournament
```
DELETE http://localhost:3000/api/tournament/5a6f272493605913dbd0aa3c

HEADERS
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6I...
```

#### Roles

- without role (no authentication): have access to all GET requests except ``user``
- ``manager``: have access to all API excepting ``user``
- ``admin``: have access to all API

#### Elo Ranking System

A ranking system based on [Elo](https://en.wikipedia.org/wiki/Elo_rating_system) is implemented in the Tournament API.

When the manager has finished to upload all match results, he can run the Elo algorithm to compute new player score.
