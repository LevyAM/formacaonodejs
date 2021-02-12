async function getGames() {
  try {
    const response = await axios.get("http://localhost:8080/games");
    let games = response.data;
    let list = document.getElementById("games");
    games.forEach((game) => {
      let item = document.createElement("li");
      item.setAttribute("data-id", game.id);
      item.setAttribute("data-title", game.title);
      item.setAttribute("data-year", game.year);
      item.setAttribute("data-price", game.price);
      item.innerHTML = `${game.id} - ${game.title} - ${game.year} - $${game.price}  `;

      let deleteBtn = document.createElement("button");
      deleteBtn.innerHTML = "Deletar";
      deleteBtn.addEventListener("click", () => {deleteGame(item)});
      item.appendChild(deleteBtn);

      let editBtn = document.createElement("button");
      editBtn.innerHTML = "Editar";
      editBtn.addEventListener("click", () => {loadForm(item)});
      item.appendChild(editBtn);


      list.appendChild(item);
    });

    console.log(list);
  } catch (error) {
    console.error(error);
  }
}

async function createGame() {
  let titleInput = document.getElementById("title");
  let yearInput = document.getElementById("year");
  let priceInput = document.getElementById("price");

  let game = {
    title: titleInput.value,
    year: yearInput.value,
    price: priceInput.value,
  };

  try {
    await axios.post("http://localhost:8080/game", game);
  } catch (error) {
    console.log(error);
  }
}

async function deleteGame(listItem) {
    let id = listItem.getAttribute("data-id");
    console.log(id)
    try {
        await axios.delete("http://localhost:8080/game/"+id);
    } catch (error) {
        console.log(error)
    }
}

function loadForm(listItem) {
    let id = listItem.getAttribute("data-id");
    let title = listItem.getAttribute("data-title");
    let year = listItem.getAttribute("data-year");
    let price = listItem.getAttribute("data-price");

    document.getElementById("idEdit").value = id;
    document.getElementById("titleEdit").value = title;
    document.getElementById("yearEdit").value = year;
    document.getElementById("priceEdit").value = price;

}

async function updateGame() {
    let idInput = document.getElementById("idEdit")
    let titleInput = document.getElementById("titleEdit");
    let yearInput = document.getElementById("yearEdit");
    let priceInput = document.getElementById("priceEdit");
  
    let game = {
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value,
    };

    let id = idInput.value;
  
    try {
      await axios.put("http://localhost:8080/game/"+id, game);
    } catch (error) {
      console.log(error);
    }
  }

getGames();
