let porukaGreske = "";
function CheckNameInput(name) {
    if (name.value.length < 3) {
        porukaGreske += "Ime i prezime mora sadržavati najmanje 3 slova! \n";
        name.style.borderRadius = "5px";
        name.style.border = "3px solid #A70A0A";
        return false;
    }
    return true;
}
const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

function CheckEmailInput(email) {
    if (email.value.trim().length == 0 || regex.test(email.value) == false) {
        porukaGreske += "Email nije u ispravnom formatu! \n";
        email.style.borderRadius = "5px";
        email.style.border = "3px solid #A70A0A";
        return false;
    }
    return true;
}

function CheckNumberInput(number) {
    if (number.value.length != 10) {
        porukaGreske += "Napišite broj u formatu 09x xxx xxxx! \n	";
        number.style.borderRadius = "5px";
        number.style.border = "3px solid #A70A0A";
        return false;
    }
    return true;
}

function CheckMessageInput(message) {
    if (message.value.length < 10) {
        porukaGreske += "Poruka mora sadržavati najmanje 10 slova! \n";
        message.style.border = "3px solid #A70A0A";
        message.style.borderRadius = "5px";
        return false;
    }
    return true;
}

function CheckSuglasnost(suglasnost) {
    if (!suglasnost.checked) {
        porukaGreske += "Morate prihvatiti uvjete korištenja! \n";
        return false;
    }
    return true;
}
function resetInputStyles(input) {
    input.style.border = "";
    input.style.borderRadius = "";
}

document.addEventListener("DOMContentLoaded", () => {
    let imePrezime = document.getElementById("ime");
    let mobitel = document.getElementById("mob");
    let email = document.getElementById("email");
    let odabir = "";
    let suglasnost = document.getElementById("suglasnost");
    let poruka = document.getElementById("poruka");

    if (document.getElementById("odabir-mob").checked) {
        odabir = "Mobitel";
    } else if (document.getElementById("odabir-mail").checked) {
        odabir = "E-mail";
    } else {
        odabir = "E-mail-a i Mobitel";
    }

    let statusSlanja = document.getElementById("status");
    let forma = document.getElementById("form");

    forma.addEventListener("submit", (e) => {
        e.preventDefault();

        porukaGreske = "";
        resetInputStyles(imePrezime);
        resetInputStyles(mobitel);
        resetInputStyles(email);
        resetInputStyles(poruka);

        let nameValid = CheckNameInput(imePrezime);
        let messageValid = CheckMessageInput(poruka);
        let emailValid = CheckEmailInput(email);
        let numberValid = CheckNumberInput(mobitel);
        let suglasnostValid = CheckSuglasnost(suglasnost);

        if (nameValid && messageValid && emailValid && numberValid && suglasnost.checked) {
            poruka.value = poruka.value.replace(/\n/g, '<br>');
            let obj = {
                "ime-prezime": imePrezime.value,
                "email": email.value,
                "mobitel": mobitel.value,
                "poruka": poruka.value
            };

            let h = new Headers();
            h.set("Content-Type", "application/json");

            fetch("/kontakt-forma.php", {
                headers: h,
                method: "POST",
                body: JSON.stringify(obj),
            }).then(data => data.json()).then((data)=>{
                if(data.status === true){
                    statusSlanja.innerHTML = "<p id='porukaPoslana'>Poruka je uspješno poslana</p>"
                }else{
                    statusSlanja.innerHTML = "<p id='greskaSlanja'>Greška! Poruka nije poslana</p>"
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
            resetInputStyles(imePrezime);
            resetInputStyles(mobitel);
            resetInputStyles(email);
            resetInputStyles(poruka);
            porukaGreske = "";
            statusSlanja.innerHTML = "";
        }else{
            statusSlanja.innerHTML = `<p id='greskaSlanja'>${porukaGreske}</p>`;
        }
    });
});