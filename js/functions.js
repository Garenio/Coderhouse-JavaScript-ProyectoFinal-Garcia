function addToParty(id) {

    fetch('../js/json/characters.json')
    .then( (resp) => resp.json() )
    .then( (data) => {
        if (party.some((el) => el.id === id)) {
            Toastify({
                text: "El personaje ya está en la party",
                duration: 3000,
            }).showToast();
        } else {
            if(party.length == 5) {
                Toastify({
                    text: "Has alcanzado el máximo de jugadores permitidos.",
                    duration: 3000,
                }).showToast();
            } else {
                let charToAdd = data.find((el) => el.id === id);
                party.push({
                    ...charToAdd,
                });
                Toastify({
                    text: "Personaje agregado correctamente.",
                    duration: 3000,
                }).showToast();
            }
        }
    
        localStorage.setItem("party", JSON.stringify(party));
        showParty();
    });
};

function showParty() {
    let partyContainer = document.getElementById("party-container");

    partyContainer.innerHTML = "";

    // ----------------- Party Title --------------------//

    let partyTitle = document.createElement("div");          
    partyTitle.className = "party-title";

    partyTitle.innerText = "Previsualización de la Party";

    partyContainer.appendChild(partyTitle);

    // ---------------------- Party Card-------------------------//

    let partyCardContainer = document.createElement("div");          
    partyCardContainer.className = "party-card-container";  

    if (party.length == 0) {
        let partyEmpty = document.createElement("div");          
        partyEmpty.className = "party-empty";
    
        partyEmpty.innerText = "Para comenzar a crear una party presiona en el botón 'Agregar a la party' en el personaje que desees agregar.";
    
        partyContainer.appendChild(partyEmpty);
    }else {
        party.forEach((el, index) => {

            let partyCard = document.createElement("div");          
            partyCard.className = "party-card";  
    
            // ----------------- Party Card Logo & Info --------------------//
    
            let partyCardLogoInfo = document.createElement("div");          
            partyCardLogoInfo.className = "party-card__logoinfo";     
            
            let avatar = document.createElement("img");
            avatar.src = el.image;
        
            let charName = document.createElement("h3");
            charName.innerText = `${el.charName}`;
        
            partyCardLogoInfo.appendChild(avatar);
            partyCardLogoInfo.appendChild(charName);
            partyCard.appendChild(partyCardLogoInfo);
            
            // ----------------- Party Card Buttons --------------------//
    
            let partyCardButtons = document.createElement("div");          
            partyCardButtons.className = "party-card__buttons"; 
    
            let btnRemove = document.createElement("button");
            btnRemove.onclick = () => removeCharacter(index);
            btnRemove.innerText = "Quitar";
            btnRemove.className = "btn-remove-char";
    
            partyCardButtons.appendChild(btnRemove);
            partyCard.appendChild(partyCardButtons);
    
            partyCardContainer.appendChild(partyCard);
            partyContainer.appendChild(partyCardContainer)
        })
    }

    

    // ----------------- Party Buttons --------------------//

    let partyButtons = document.createElement("div");          
    partyButtons.className = "party-buttons";

    let buttonCreateParty = document.createElement("button");
    buttonCreateParty.innerText = `Crear Party`;
    buttonCreateParty.className = "btn btn-create-party";
    buttonCreateParty.onclick = createParty;

    let buttonClearAll = document.createElement("button");
    buttonClearAll.innerText = `Borrar Todo`;
    buttonClearAll.className = "btn btn-clear-all";
    buttonClearAll.onclick = clearAll;

    partyButtons.appendChild(buttonCreateParty);
    partyButtons.appendChild(buttonClearAll);
    partyContainer.appendChild(partyButtons);


};


function clearAll() {
    party = [];
    localStorage.setItem("party",(JSON.stringify(party)))
    showParty();
};

function removeCharacter(index) {

    party.splice(index, 1);
    localStorage.setItem("party", JSON.stringify(party));
    showParty();

    Toastify({
        text: "Personaje eliminado de la party.",
        duration: 3000,
    }).showToast();

}

function createParty() {
    if (party.length < 5) {
        Toastify({
            text: "Debe haber 5 jugadores para poder crear la party.",
            duration: 3000,
        }).showToast();
    } else{
        Swal.fire({
            title: `¿Estás seguro/a que quieres crear la party?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Modificar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: '¡Party creada exitosamente!',
                    icon: 'success',
                    text: `La party ha sido creada con los siguientes personajes: ${party[0].charName} | ${party[1].charName} | ${party[2].charName} | ${party[3].charName} | ${party[4].charName}`,
                })
                localStorage.setItem("party", JSON.stringify(party));
                showParty();
            };
        });
    }

}