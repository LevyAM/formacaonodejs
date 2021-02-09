import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


var DB = {

	games: [
		{
			id: 101,
			title: "Batman",
			year: "2016",
			price: 130
		},
		{
			id: 102,
			title: "Dragon Ball Ultimate",
			year: "2017",
			price: 200
		},
		{
			id: 103,
			title: "Dragon Age: Inquisition",
			year: "2013",
			price: 70
		},
		{
			id: 104,
			title: "New World",
			year: "2021",
			price: 250
		},
		{
			id: 105,
			title: "Spider-Man",
			year: "2019",
			price: 150
		}
	]

}

app.get("/games", (req, res) => {
	res.statusCode = 200
	res.json(DB.games);
})

app.get("/games/:id", (req, res) => {
	
	if(isNaN(req.params.id)){
		res.sendStatus(400);
	} else {
		let id = parseInt(req.params.id)
		let game = DB.games.find(game => game.id == id);

		if(game != undefined){
			res.statusCode = 200;
			res.json(game);
		} else {
			res.sendStatus(404);
		}

	}
	
	
})

app.post("/game", (req, res) => {

	let {title, year, price} = req.body;

	if(isNaN(price) || isNaN(year)){
		res.sendStatus(400);
	} else {
		
		DB.games.push({
			id: 106,
			title,
			year,
			price
		});
		res.sendStatus(201);
	}

});

app.delete("/game/:id", (req,res) => {
	if(isNaN(req.params.id)){
		res.sendStatus(404);
	} else {
		let id = parseInt(req.params.id);
		let index = DB.games.findIndex(game => game.id == id)

		if(index != -1){
			DB.games.splice(index, 1);
			res.sendStatus(200);
		}else {
			res.sendStatus(404);
		}
	}
})

app.put("/game/:id", (req, res) => {
	if(isNaN(req.params.id)){
		res.sendStatus(404)
	} else {
		let id = parseInt(req.params.id);
		let game = DB.games.find(game => game.id == id);
		let {title, year, price} = req.body;
	
		if(game != undefined){

			if(title != undefined || year != undefined || price != undefined){
				
				
				game.title = title;
				game.price = price;
				game.year = year;
				res.sendStatus(200);
			}
			
		} else {
			res.sendStatus(404)
			
		}
	}
})









app.listen(3000, () => {
    console.log("API executando!")
})