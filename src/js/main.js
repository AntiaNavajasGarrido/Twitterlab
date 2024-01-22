'use strict';

//FUNCION PARA OBTENER DATOS DE LA API

//LA HACEMOS ASÍNCRONA (ASYNC/AWAIT) PARA QUE CARGUE TODO A LA VEZ EN LA WEB Y SEA MÁS FLUIDA

async function getUsers(){
    const apiUrl ='https://randomuser.me/api/?results=10';
    //USAMOS TRY...CATCH PARA HACER EL CÓDIGO MÁS ORDENADO. TRY DEFINE UN BLOQUE DE CÓDIGO A DEVOLVER. CATCH DEFINE UN BLOQUE DE CÓDIGO A MANEJAR SI SALTAN ERRORES.
    try{ 
        //FETCH PARA REALIZAR UNA PETICIÓN HTTP A LA API DADA Y GUARDAR LOS DATOS EN UN ARRAY CON .JSON
        const response = await fetch(apiUrl);
        const data = await response.json();
        const randomUsers = data.results.map(user => ({ ...user, isFriend: false })); // Agregar la propiedad isFriend a cada usuario
        showUsers(randomUsers);
    } catch (error) {
        console.error('No se han podido obtener los datos de la API:', error);
    }
}

//FUNCION PARA MOSTRAR LOS USUARIOS EN LA WEB A TRAVÉS DE HTML

//USAMOS EL ARRAY USERS PARA REALIZAR UN BUCLE QUE POR CADA USER PINTE EN LA WEB NOMBRE, CIUDAD, FOTO Y NOMBRE DE USUARIO
function showUsers(users){
    const printedUsers = document.getElementById('printedUsers'); //USAMOS GETELEMENTBY PARA SELECCIONAR EL BLOQUE DE HTML QUE QUEREMOS MODIFICAR CON JS//USAMOS GETELEMENTBY PARA SELECCIONAR EL BLOQUE DE HTML QUE QUEREMOS MODIFICAR CON JS
    
    users.forEach(user => {
        const userInHTML = `
        <section class="userCard" data-userid="${user.login.uuid}">
            <img class="userImg" src="${user.picture.medium}" alt="${user.name.title} ${user.name.first} ${user.name.last}">
            <h2 class="userName">${user.name.title} ${user.name.first} ${user.name.last}</h2>
            <h3 class="userCity">${user.location.city}</h3>
            <h3 class="userNameTag">${user.login.username}</h3>
        </section>
        `;
        printedUsers.innerHTML += userInHTML;
    });

  
    const userCards = document.querySelectorAll('.userCard');
    userCards.forEach(card => {
        card.addEventListener('click', () => friendStatus(card, users));
    });
}

function friendStatus(card, users) {
    const userId = card.dataset.userid;
    const user = users.find(u => u.login.uuid === userId);

    if (user) {
        user.isFriend = !user.isFriend; // CAMBIAMOS EL ESTADO DEL USUARIO AL CLICKAR
        card.style.backgroundColor = user.isFriend ? 'lightgreen' : 'rgb(137, 207, 240)'; // CAMBIAR EL COLOR DE FONDO SI EL USUARIO ES "AMIGO"
    }
}

window.addEventListener('load', (event)=>{
    event.preventDefault();
    getUsers();
});


/*
elem.addEventListener(  'click',  handle    );

elem.addEventListener(  'click',   handle   );

elem.addEventListener(  'click',   handle2  );



function handle(event) {
    console.log();
    console.log();
    console.log();
    console.log();

    console.log();
    console.log();
}

const handle2 = (event) => {
    console.log();
    console.log();
    console.log();
    console.log();

    console.log();
    console.log();
}
*/
