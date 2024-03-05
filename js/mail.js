document.addEventListener("DOMContentLoaded", ()=> {

    
    let imePrezime = document.getElementById("ime");
    let mobitel = document.getElementById("mob");
    let email = document.getElementById("email");
    let odabir = "";
    let poruka = document.getElementById("poruka");

    if(document.getElementById("odabir-mob").checked){
        odabir = "Mobitel";
    }else if(document.getElementById("odabir-mail")){
        odabir = "E-mail";
    }
    
    let statusSlanja = document.getElementById("status");
    
    let forma  = document.getElementById("form");

    forma.addEventListener("submit", (e)=>{
        e.preventDefault();

        let obj = {
            "ime-prezime" : imePrezime.value,
            "email" : email.value,
            "mobitel" : mobitel.value,
            "odabir" : odabir,
            "poruka" : poruka.value
        }
        fetch("/kontakt-forma.php", {
            method: "POST",
            body: JSON.stringify(obj),
        }).then((data)=>{
            console.log(data);
             if(data.status){
                statusSlanja.innerHTML = "<p>Poruka je uspješno poslana</p>"
             }else{
                statusSlanja.innerHTML = "<p>Greška! Poruka nije poslana</p>"
             }
        });
    });
});