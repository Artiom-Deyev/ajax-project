// Создать форму добавления пользователя состоящую из следующих полей name, email, phone, website.
// При сабмите формы сделать POST запрос на сервер https://jsonplaceholder.typicode.com/users
// После ответа от сервера добавлять полученного пользователя на страницу в список.
// Для визуализации формы и спискаможете использовать произвольные стили.

//Elements
const main = document.querySelector('#main');
const container = document.querySelector('#list');
const showContainer = document.querySelector('#show-list');
const cardContainer = document.querySelector('#card-container');

const apiURL = 'https://jsonplaceholder.typicode.com'

//Functions
function getUsers(cb) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${apiURL}/users`);
    xhr.addEventListener('load', () => { 
        const response = JSON.parse(xhr.responseText);
        cb(response);
    });
    
    xhr.addEventListener('error', () => {
        console.log('error')
    })
    
    xhr.send();

}

function createUser(person) {    
    const card = document.createElement('div');
    card.classList.add('card');
    const fragment = document.createDocumentFragment();

    const name = document.createElement('div');
    name.textContent = person.name;
    fragment.appendChild(name);

    const username = document.createElement('div');
    username.textContent = person.username;
    fragment.appendChild(username);

    const email = document.createElement('div');
    email.textContent = person.email;
    fragment.appendChild(email);

    const address = document.createElement('div');
    address.textContent = 'Address';
    const addressList = document.createElement('ul');
    ;
    Object.values(person.address).forEach(el => {
        if(el.lat || el.lng) {   
            const geoList = document.createElement('ul');
            geoList.textContent = 'Geo';
            const lat= document.createElement('li');
            const lng = document.createElement('li');
            lat.textContent = el.lat;
            lng.textContent = el.lng;
            console.log(lat.textContent, lng.textContent)
            geoList.appendChild(lat);
            geoList.appendChild(lng);
            addressList.appendChild(geoList);
        } else {
            const li = document.createElement('li');
            li.textContent = el;
            console.log(li.textContent)
            addressList.appendChild(li)
        }        
    })
    address.appendChild(addressList);
    fragment.appendChild(address);

    const phone = document.createElement('div');
    phone.textContent = person.phone;
    fragment.appendChild(phone);

    const website = document.createElement('div');
    website.textContent = person.website;
    fragment.appendChild(website);
    
    const company = document.createElement('div');
    company.textContent = 'Company';
    const companyList = document.createElement('ul');
    ;
    Object.values(person.company).forEach(el => {
        const li = document.createElement('li');
        li.textContent = el;
        companyList.appendChild(li);
    })
    company.appendChild(companyList);
    fragment.appendChild(company);

    card.appendChild(fragment);
    cardContainer.appendChild(card);
}

function createBlock(item) {
    const fragment = document.createDocumentFragment();
    const listItem = document.createElement('li');
    listItem.textContent = item.name; 
    listItem.addEventListener('click', createDetails);
    fragment.appendChild(listItem);
}   

getUsers(response => {   
    function createDetails(e) {
        cardContainer.innerHTML = '';
        const user = response.filter(user => user.id == e.target.id).pop(0);
        createUser(user);
};

    response.forEach(el => {        
        const fragment = document.createDocumentFragment();
        const personName = document.createElement('li');
        personName.setAttribute('id', el.id)
        personName.textContent = el.name;
        personName.classList.add('list-group-item')
        personName.addEventListener('click', createDetails)
        fragment.appendChild(personName);
        container.appendChild(fragment);
    });
});
