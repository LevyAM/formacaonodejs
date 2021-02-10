const express = require("express")
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

dotenv.config({path: "./config/config.env"});

const app = express();

const PORT = process.env.MY_PORT;

console.log(`Hostname:${process.env.BD_HOSTNAME}`)


const Game = require("./database/Game");
const connection = require("./database/database.js");

connection.authenticate().then(() =>{
	console.log("Conexão bem sucedida com o banco de dados");
}).catch((err) => {
	console.log("Conexão falhou com o banco de dados", err);
})


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.get("/games", async (req, res) => {

	try {
		let allGames = await Game.findAll({raw:true, order: [
			['id', 'ASC']
		]});
		allGames ? res.status(200).json(allGames) : res.sendStatus(204);
	} catch (error) {
		res.sendStatus(400)
	}
	
})

app.get("/games/:id", async (req, res) => {
	
	if(isNaN(req.params.id)){
		res.sendStatus(400);
	} else {

		try {
			let id = parseInt(req.params.id)
			let game = await Game.findOne({where: {id:id}});

			if(game.id != undefined){
				res.statusCode = 200;
				res.json(game);
		}
		} catch (error) {
			res.sendStatus(404);
		}

	}

	
})

app.post("/game", async (req, res) => {
	let {title, year, price} = req.body;
	try {
		await Game.create({
			title: title,
			year: year,
			price: price
		});
  		res.sendStatus(201);
	} catch (error) {
		console.log(error)
		res.sendStatus(400);
	}
});

app.delete("/game/:id", async (req,res) => {
	if(isNaN(req.params.id)){
		res.sendStatus(404);
	} else {
		try {
			let id = parseInt(req.params.id);
			let index = await Game.findOne({where: {id:id}})

			if(index != -1){
				await Game.destroy({where: {id: id}});
				res.sendStatus(200);
		}
		} catch (error) {
			res.sendStatus(404);
		}
	}
})

app.put("/game/:id", async (req, res) => {
	if(isNaN(req.params.id)){
		res.sendStatus(404)
	} else {

		try {
			let id = parseInt(req.params.id);
			let {title, year, price} = req.body;
			let game = await Game.findOne({where: {id:id}});
			
		
			if(game.id != undefined){
				await Game.update({
				title: title,
				year: year,
				price: price
				}, {where: {id:id}})
				res.sendStatus(200);
			}
		}
			catch (error) {
			res.sendStatus(404)
		}
			
		}
	}
)


app.listen(PORT, () => {
    console.log("API executando!")
})