const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(cors());
const jwtSecret = process.env.MY_SECRET;
const PORT = process.env.MY_PORT;

const User = require("./database/User");
const Game = require("./database/Game");
const connection = require("./database/database.js");

connection
  .authenticate()
  .then(() => {
    console.log("Conexão bem sucedida com o banco de dados");
  })
  .catch((err) => {
    console.log("Conexão falhou com o banco de dados", err);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function auth(req, res, next) {
  const authToken = req.headers.authorization;
  if (authToken != undefined) {
    [, token] = authToken.split(" ");

    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "Token inválido" });
      } else {
        req.token = token;
        req.loggedUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "Token inválido" });
  }
}

app.post("/auth", async (req, res) => {
  let { email, password } = req.body;

  if (email != undefined) {
    let user = await User.findOne({ where: { email: email } });

    try {
      if (user.password == password) {
        jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret,
          { expiresIn: "24h" },
          (error, token) => {
            if (error) {
              res.status(404);
              console.log("sem token");
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
        res.status(200);
      } else {
        res.sendStatus(401);
        console.log("senha incorreta");
      }
    } catch (error) {
      res.sendStatus(404);
    }
  } else {
    res.sendStatus(400);
    console.log("email errado");
  }
});

app.get("/users", auth, async (req, res) => {
  try {
    let allUsers = await User.findAll({ raw: true, order: [["id", "ASC"]] });
    allUsers ? res.status(200).json(allUsers) : res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
    console.log(error);
  }
});

app.post("/user", auth, async (req, res) => {
  let { name, email, password } = req.body;
  try {
    await User.create({
      name: name,
      email: email,
      password: password,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.get("/games", auth, async (req, res) => {
  try {
    let allGames = await Game.findAll({ raw: true, order: [["id", "ASC"]] });
    allGames ? res.status(200).json(allGames) : res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.get("/games/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(400);
  } else {
    try {
      let id = parseInt(req.params.id);
      let game = await Game.findOne({ where: { id: id } });

      if (game.id != undefined) {
        res.statusCode = 200;
        res.json(game);
      }
    } catch (error) {
      res.sendStatus(404);
    }
  }
});

app.post("/game", auth, async (req, res) => {
  let { title, year, price } = req.body;
  try {
    await Game.create({
      title: title,
      year: year,
      price: price,
    });
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    res.sendStatus(400);
  }
});

app.delete("/game/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(404);
  } else {
    try {
      let id = parseInt(req.params.id);
      let index = await Game.findOne({ where: { id: id } });

      if (index != -1) {
        await Game.destroy({ where: { id: id } });
        res.sendStatus(200);
      }
    } catch (error) {
      res.sendStatus(404);
    }
  }
});

app.put("/game/:id", auth, async (req, res) => {
  if (isNaN(req.params.id)) {
    res.sendStatus(404);
  } else {
    try {
      let id = parseInt(req.params.id);
      let { title, year, price } = req.body;
      let game = await Game.findOne({ where: { id: id } });

      if (game.id != undefined) {
        await Game.update(
          {
            title: title,
            year: year,
            price: price,
          },
          { where: { id: id } }
        );
        res.sendStatus(200);
      }
    } catch (error) {
      res.sendStatus(404);
    }
  }
});

app.listen(PORT, () => {
  console.log("API executando!");
});
