// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyAzI5Za6SPk0sXHww0sdfrk0lObT-SA1wI",
  authDomain: "email-firebase-83606.firebaseapp.com",
  databaseURL: "https://email-firebase-83606-default-rtdb.firebaseio.com",
  projectId: "email-firebase-83606",
  storageBucket: "email-firebase-83606.appspot.com",
  messagingSenderId: "474735747166",
  appId: "1:474735747166:web:1c93a92331706f0e5594cf",
  measurementId: "G-ZTGF6MS92K"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let name = document.querySelector(".name").value;
  let email = document.querySelector(".email").value;
  let message = document.querySelector(".message").value;
  console.log(name, email, message);

  saveContactInfo(name, email, message);

  document.querySelector(".contact-form").reset();

  sendEmail(name, email, message);
}

// Save infos to Firebase
function saveContactInfo(name, email, message) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    name: name,
    email: email,
    message: message,
  });

  retrieveInfos();
}

//retrive infos
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", getData);
}

function getData(data){
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++){
    let infoData = keys[i];
    let name = info[infoData].name;
    let email = info[infoData].email;
    let message = info[infoData].message;
    console.log(name, email, message);

    let infosResults = document.querySelector(".infosResults");

    infosResults.innerHTML += `<div>
    <p><strong>Name: </strong>${name}<br/>
    <a><strong>Email: </strong>${email}</a><br/>
    <a><strong>Message: </strong>${message}</a>
    </p>
    </div>`;
  }
}

retrieveInfos();

//send email info
function sendEmail(name, email, message){
  Email.send({
    Host: "smtp.gmail.com",
    Username: "luisdmtz501@gmail.com",
    Password: "ufkxqokflpyddpty",
    To: 'luisdmtz501@gmail.com',
    From: "luisdmtz501@gmail.com",
    Subject: `${name} sent you a message`,
    Body: `Name: ${name} <br/> Email: ${email} <br/> Message: ${message}`,
  }).then(
    message => alert(`${"¡Hola!"} ${name}, ${"Gracias por ponerte en contacto con nosotros"}, ${"Durante el transcurso del dia comunicaremos contigo."}`)
  );
}