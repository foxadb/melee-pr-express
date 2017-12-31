# melee-pr-express
Super Smash Bros. Melee Power Ranking REST API designed with Express.js.

## Instructions

### Installation

Install project dependencies with `npm install`

### Development server

Run node server with `npm start`

Navigate to http://localhost:3000 to access the server.

The app will automatically reload if you change any of the source files.

### API Features

Send Ajax requests to http://localhost:3000/api

Use ``api/user`` for authentication.

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
    "matches": [ { match id here } ] // recommanded not to use
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
    "matches": [ { match id here} ] // destructive, use with caution!
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
    "player1": "507f9a679a87e719729a5861w15",
    "player2": "505d8a9ze4qofp83w7a969a6",
    "score1": 2,
    "score2": 0,
    "tournament": "505d89a6e47a4w1q2w7a4a7a6"
}
                </pre>
            </td>
            <td>Optional parameter: <code>:id</code></td>
        </tr>
    </tbody>
</table>

POST, PUT and DELETE are restricted with authentication system.

## Roles

- without role (no authentication): have access to all GET requests except ``user``
- ``manager``: have access to all API excepting ``user``
- ``admin``: have access to all API
