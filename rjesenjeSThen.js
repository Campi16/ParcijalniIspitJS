const RjesenjeSThen = {
  pozoviServer: function (event) {
    let termin = event.target.previousElementSibling.value;
    document.getElementById("results1").innerHTML =
      "<p>Učitavamo podatke...</p>";
      fetch(`http://universities.hipolabs.com/search?name=${termin}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.length === 0)
          document.getElementById("results1").innerHTML =
            "<p>Nema rezultata za vaš upit! Pokušajte neki novi upit.</p>";
        else
          RjesenjeSThen.ubaciRezultateUdom(
            data,
            document.getElementById("results1")
          );
      });
  },
  ubaciRezultateUdom: function (data, element) {
    let rezultat = "<p>Rezultati: </p><ul>";

    data.forEach((ime) => {
      rezultat += `<li>Puno ime fakulteta: ${ime.name}<br>Drzava: ${ime.country}</li>`;
    });

    rezultat += "</ul>";
    element.innerHTML = rezultat;
  },
};
export default RjesenjeSThen;
