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
                statusSlanja.innerHTML = "<p>Poruka je uspješno poslana</p>"
             }else{
                statusSlanja.innerHTML = "<p>Greška! Poruka nije poslana</p>"
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
    });
});