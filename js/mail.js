let porukaGreske = "";
function CheckNameInput(name) {
    if (name.value.length < 3) {
        porukaGreske += "Ime i prezime mora sadržavati najmanje 3 slova! \n";
        name.style.borderRadius = "5px";
        name.style.border = "3px solid red";
        return false;
    }
    return true;
}
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function CheckEmailInput(email) {
    if (email.value.length == "" || regex.test(email) == false) {
        porukaGreske += "Email nije u ispravnom formatu! \n";
        email.style.borderRadius = "5px";
        email.style.border = "3px solid red";
        return false;
    }
    return true;
}

function CheckNumberInput(number) {
    if (number.value.length != 10) {
        porukaGreske += "Napišite broj u formatu 09x xxx xxxx! \n	";
        number.style.borderRadius = "5px";
        number.style.border = "3px solid red";
        return false;
    }
    return true;
}

function CheckMessageInput(message) {
    if (message.value.length < 10) {
        porukaGreske += "Poruka mora sadržavati najmanje 10 slova! \n";
        message.style.border = "3px solid red";
        message.style.borderRadius = "5px";
        return false;
    }
    return true;
}
function resetInputStyles(input) {
    input.style.border = "";
    input.style.borderRadius = "";
}

document.addEventListener("DOMContentLoaded", ()=> {
    
    let imePrezime = document.getElementById("ime");
    let mobitel = document.getElementById("mob");
    let email = document.getElementById("email");
    let odabir = "";
    let suglasnost = document.getElementById("suglasnost");
    let poruka = document.getElementById("poruka");


    if(document.getElementById("odabir-mob").checked){
        odabir = "Mobitel";
    }else if(document.getElementById("odabir-mail")){
        odabir = "E-mail";
    }else{
        odabir = "E-mail-a i Mobitel";
    }
    
    let statusSlanja = document.getElementById("status");
    
    let forma  = document.getElementById("form");

    forma.addEventListener("submit", (e)=>{
        e.preventDefault();
        let nameValid = CheckNameInput(imePrezime);
        let emailValid = CheckEmailInput(email);
        let messageValid = CheckMessageInput(poruka);

        if(nameValid && emailValid && messageValid){
            poruka.value = poruka.value.replace(/\n/g, '<br>');
            
            let obj = {
                "ime-prezime" : imePrezime.value,
                "email" : email.value,
                "mobitel" : mobitel.value,
                "odabir" : odabir,
                "poruka" : poruka.value
            }

            let h = new Headers();
            h.set("Content-Type", "application/json");

            fetch("/kontakt-forma.php", {
                headers: h,
                method: "POST",
                body: JSON.stringify(obj),
            }).then(data => data.json()).then((data)=>{
                if(data.status === true){
                    statusSlanja.innerHTML = "<p id='greska'>Poruka je uspješno poslana</p>"
                }else{
                    statusSlanja.innerHTML = "<p id='greska'>Greška! Poruka nije poslana</p>"
                }
            });
            fetch("/info-no-reply.php",{
                headers: h,
                method: "POST",
                body: JSON.stringify({"primatelj-mail" : email.value}),
            }).then((data)=>{
                console.log(data);
            });
            imePrezime.value = mobitel.value = email.value = odabir = poruka.value = suglasnost.value = "";
            document.getElementById("odabir-mob").checked = false;
            document.getElementById("suglasnost").checked = false;
            document.getElementById("odabir-mail").checked = true;
        }else{
            statusSlanja.innerHTML = `<p id='greska'>${porukaGreske}</p>`;
        }
    });
});