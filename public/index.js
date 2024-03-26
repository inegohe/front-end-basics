const basUrl = 'http://localhost:8383/';


const submitBtn = document.getElementById('submit');
const name = document.getElementById('input-name');
const email = document.getElementById('input-email');

const readProfiles = document.getElementById('read');
const clearProfiles = document.getElementById('clear');
const display = document.getElementsByClassName('screen')[0];

submitBtn.addEventListener('click', submit);

readProfiles.addEventListener('click', loadProfiles);
clearProfiles.addEventListener('click', ()=>{
    display.innerHTML = '';
});

let Array = [
    {
    name:'Negohe',
    email: 'ikhosler@gmail.com'
    },{
        name:'Evelyn',
    email: 'evelyn60@gmail.com'
    },{
        name:'Davis',
    email: 'davis300@gmail.com'
    }]

async function loadProfiles(){
    const res = await fetch(basUrl + 'load',{
        method: "GET"
    })
    const data = await res.json()
    //console.log(data);
    printProfiles(data);
}

function printProfiles(array){
    for(i=0; i<array.length; i++){
        display.innerHTML += `Name: ${array[i].name}<br> Email: ${array[i].email}<br><br>`;
    }
}

async function submit(e) {
    let profile = { name: name.value, email: email.value };
    //e.preventDefault();
    const res = await fetch(basUrl + 'submit',
        {
            method: "POST",
            headers: {
                'content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        })
    console.log('sent the form data');

}

/* const getBtn = document.getElementById('get');
const postBtn = document.getElementById('post');
const input = document.getElementById('input');

const basUrl = 'http://localhost:8383/'

getBtn.addEventListener('click', getInfo)
postBtn.addEventListener('click', postInfo)

async function getInfo(e){
    e.preventDefault()
    const res = await fetch(basUrl + 'info',{
        method: "GET"
    })
    console.log(res)
    const data = await res.json()
    input.value = data.info
}

async function postInfo(e){
    e.preventDefault()
    if(input.value == ''){return}
    const res = await fetch(basUrl,
    {
        method: "POST",
        headers:{
            'content-Type': 'application/json'
        },
        body:JSON.stringify({
            parcel: input.value
        }
        )
    })
} */

