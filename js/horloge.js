function bouge()
    {
        var aiguilleSecondes = document.querySelector("#secondes");
        var aiguilleMinutes = document.querySelector("#minutes");
        var aiguilleHeures = document.querySelector("#heures");

        var maDate = new Date();
        var valeursec = maDate.getSeconds();
        var valeurmin = maDate.getMinutes();
        var valeurh = maDate.getHours();

        console.log(valeursec);
        console.log(valeurmin);
        console.log(valeurh);

        aiguilleSecondes.style.transform = "rotate(" + ((valeursec*6)-90) + "deg)";
        aiguilleMinutes.style.transform = "rotate(" + ((valeurmin*6)-90) + "deg)";
        aiguilleHeures.style.transform = "rotate(" + ((valeurh*30)-90) + "deg)";
    }

    window.setInterval(bouge, 1000);
