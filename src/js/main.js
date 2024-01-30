'use strict';

let users =[]; //DECLARO ESTA VARIABLE PARA QUE ESTÉ ACCESIBLE EN TODAS MIS FUNCIONES. SI NO, NO FUNCIONA EL JS

document.getElementById("saveData").addEventListener('click', handleSaveData); // AÑADO UN EVENTO CLICK AL BOTÓN DE GUARDAR DATOS
document.getElementById("recoverData").addEventListener('click', handleRecoverData); //AÑADO UN EVENTO CLICK AL BOTÓN DE RECUPERAR DATOS

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
    printedUsers.innerHTML = '';
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

//FUNCIÓN PARA REVISAR SI EL USUARIO HA SIDO CLICKADO Y, SI LO HA SIDO, MARCARLO COMO "FRIEND" Y CAMBIARLO DE BACKGROUND-COLOR

function friendStatus(card, users) {
    const userId = card.dataset.userid; //CON .DATASET CAMBIO EL ATRIBUTO ID A DATA PARA PODER MANEJARLO MÁS FÁCILMENTE
    const user = users.find(user => user.login.uuid === userId);

    if (user) {
        user.isFriend = !user.isFriend; // CAMBIAMOS EL ESTADO DEL USUARIO AL CLICKAR
        card.style.backgroundColor = user.isFriend ? 'lightgreen' : 'rgb(137, 207, 240)'; // CAMBIAR EL COLOR DE FONDO SI EL USUARIO ES "AMIGO"
    }
}

//EVENTO PARA CARGAR LA FUNCIÓN "GETUSERS" EN CUANTO SE ABRE LA VENTANA DE LA APLICACIÓN

window.addEventListener('load', (event)=>{
    event.preventDefault();
    getUsers();

    //MODIFICO ESTE EVENTO PARA QUE SE QUEDEN LOS DATOS DEL LOCALSTORAGE AL CARGAR LA PÁGINA
    
    async function inicio(){
        const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
        if (savedUsers !== null) {
            users = savedUsers;
        }
        else {
            await fetch()

            users = await response.json();

            localStorage.setItem("savedUsers", JSON.stringify(users));
        }
    }

    window.addEventListener('load', inicio);
});

//CREO UNA FUNCIÓN PARA GUARDAR LOS AMIGOS EN EL LOCALSTORAGE

function handleSaveData() {
    const usersToSave = users.filter(user => user.isFriend);
    localStorage.setItem("savedUsers", JSON.stringify(usersToSave));
    alert('Los amigos se han guardado correctamente en el localStorage.'); //AÑADO ESTA LÍNEA PARA VER SI SE HAN AÑADIDO CORRECTAMENTE
}

//CREO UNA FUNCIÓN PARA PINTAR LOS DATOS GUARDADOS CON LA FUNCIÓN ANTERIOR

function handleRecoverData() {
    const savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
    if (savedUsers !== null) {
        users = savedUsers;
        showUsers(users);
        alert('Aquí están tus amigos guardados en la sesión anterior');
    } else {
        alert('No hay datos guardados en el localStorage.'); //USO LOS ALERT PARA SABER SI SE HAN MOSTRADO CORRECTAMENTE O NO
    }
}



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
