# melee-pr-express
Super Smash Bros. Melee Power Ranking REST API designed with Express.js.

## Instructions

### Installation

Install project dependencies with `npm install`

### Development server

Run node server with `npm start`

Navigate to http://localhost:3000 to access the server.

The app will automatically reload if you change any of the source files.

### API

Send Ajax requests to http://localhost:3000/api

|     Functionnality    |        URL       |      GET     |                                                                POST                                                               |                                                                          PUT                                                                         |    DELETE    |
|:---------------------:|:----------------:|:------------:|:---------------------------------------------------------------------------------------------------------------------------------:|:----------------------------------------------------------------------------------------------------------------------------------------------------:|:------------:|
| User (authentication) |    `api/user`    | Param: `:id` |              Body: ```json { "username": "samy", "password": "mystrongpassword", "role": ("manager" or "admin") } ```             |                       Body: ```json { "username": "samy", "password": "mystrongpassword", "role": ("manager" or "admin") } ```                       | Param: `:id` |
|         Player        |   `api/player`   | Param: `:id` |              Body: ```json { "name": "Kazoo", "mains": ["sheik", "ics"], "location": "Grenoble", "score": 1500 } ```              |                  Body: ```json { "_id": (player ID), "name": "Bobi", "mains": ["falco"], "location": "Grenoble", "score": 2000 } ```                 | Param: `:id` |
|         Match         |    `api/match`   | Param: `:id` | Body: ```json { "player1": (player 1 ID), "player2": (player 2 ID), "score1": 3, "score2": 1, "tournament": (tournament ID) } ``` | Body: ```json { "_id": (match ID), "player1": (player 1 ID), "player2": (player 2 ID), "score1": 2, "score2": 0, "tournament": (tournament ID) } ``` | Param: `:id` |
|       Tournament      | `api/tournament` | Param: `:id` |   Body: ```json { "name": "G.R.A.S. #9", "organiser": "Ensimag Gaming", "location": "Grenoble", "matches": [ (match ID) ] } ```   |                 Body: ```json { "name": "Arcamini", "organiser": "Team Arcaneum", "location": "Lyon", "matches": [ (match ID) ] } ```                | Param: `:id` |

POST, PUT and DELETE are restricted with authentication system.
