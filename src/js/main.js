'use strict';

document.addEventListener('DOMContentLoaded', getUsers);

//FUNCION PARA OBTENER DATOS DE LA API

//LA HACEMOS ASÍNCRONA (ASYNC/AWAIT) PARA QUE CARGUE TODO A LA VEZ EN LA WEB Y SEA MÁS FLUIDA

async function getUsers(){
    const apiUrl ='//randomuser.me/api/?results=10';
    //USAMOS TRY...CATCH PARA HACER EL CÓDIGO MÁS ORDENADO. TRY DEFINE UN BLOQUE DE CÓDIGO A DEVOLVER. CATCH DEFINE UN BLOQUE DE CÓDIGO A MANEJAR SI SALTAN ERRORES.
    try{ 
        //FETCH PARA REALIZAR UNA PETICIÓN HTTP A LA API DADA Y GUARDAR LOS DATOS EN UN ARRAY CON .JSON
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('No se han podido obtener los datos de la API:', error);
    }
}

//FUNCION PARA MOSTRAR LOS USUARIOS EN LA WEB A TRAVÉS DE HTML

//USAMOS EL ARRAY USERS PARA REALIZAR UN BUCLE QUE POR CADA USER PINTE EN LA WEB NOMBRE, CIUDAD, FOTO Y NOMBRE DE USUARIO
function showUsers(users){
    const printedUsers = document.getElementById('printedUsers'); //USAMOS GETELEMENTBY PARA SELECCIONAR EL BLOQUE DE HTML QUE QUEREMOS MODIFICAR CON JS
    
    users.forEach(user => {
        const userInHTML = `
        <section class="userCard">
            <h2 class="userName">${user.name}</h2>
            <h2 class="userCity">${user.city}</h2>
            <img class="userImg" src="${user.picture}" alt="${user.name}">
            <h3 class="userNameTag">${user.username}</h3>
        `;
        printedUsers.innerHTML += userInHTML;
    });
}