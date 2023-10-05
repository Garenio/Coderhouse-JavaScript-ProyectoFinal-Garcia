// Card creations to page "Party Maker"

let pickCharContainer = document.getElementById("pick-char-container");

fetch('../js/json/characters.json')
    .then( (resp) => resp.json() )
    .then( (data) => {

        data.forEach((el) => {

            let pickCard = document.createElement("div");
            pickCard.className = "pick-character-card";
                 
            // ----------------- Card Logo --------------------//
        
            let cardLogo = document.createElement("div");
            cardLogo.className = "pick-character-card__logo";            
        
            let avatar = document.createElement("img");
            avatar.src = el.image;
        
            cardLogo.appendChild(avatar);
            pickCard.appendChild(cardLogo);
        
            // ----------------- Card Info --------------------//
        
            let cardInfo = document.createElement("div");          
            cardInfo.className = "pick-character-card__info";            
        
            let charName = document.createElement("h3");
            charName.innerText = `${el.charName}`;
            
            let race = document.createElement("p");
            race.innerText = `Raza: ${el.race}`;
            
            let charClass = document.createElement("p");
            charClass.innerText = `Clase: ${el.charClass}`;
        
            let playerName = document.createElement("p");
            playerName.innerText = `Jugador: ${el.playerName}`;
        
        
            cardInfo.appendChild(charName);
            cardInfo.appendChild(race);
            cardInfo.appendChild(charClass);
            cardInfo.appendChild(playerName);
            pickCard.appendChild(cardInfo);
        
            // ----------------- Card Buttons --------------------//
        
            let cardButtons = document.createElement("div");          
            cardButtons.className = "pick-character-card__buttons"; 
        
            let buttonAddToParty = document.createElement("button");
            buttonAddToParty.innerText = `Agregar a la Party`;
            buttonAddToParty.className = "btn btn-add";
        
            buttonAddToParty.onclick = () => addToParty(el.id);
        
            cardButtons.appendChild(buttonAddToParty);
            pickCard.appendChild(cardButtons);
        
            // ----------------- Fin de la card --------------------//
        
            pickCharContainer.appendChild(pickCard);
        
        });
    })

let party = JSON.parse(localStorage.getItem("party")) || [];
showParty();