class AsyncDebounce{
  constructor(elemRazultata, elemPretrage) {
    this.timeout = null;
    this.elemRazultata = elemRazultata;
    this.elemPretrage = elemPretrage;
    console.log(this.elemPretrage);
    this.elemPretrage.addEventListener("input", this.debounce.bind(this));
    this.pozoviServer = this.pozoviServer.bind(this);
  }

  debounce() {
    console.log("U debounceu sam");
    clearTimeout(this.timeout);
    this.timeout = setTimeout(this.pozoviServer, 750);
  }

  async pozoviServer() {
    console.log("U pozoviServer sam");
    let termin = this.elemPretrage.value;
    this.elemRazultata.innerHTML = "<p>Učitavamo podatke...</p>";
    let rezultat = await fetch(
      `https://universities.hipolabs.com/search?name=${termin}`
    );
    rezultat = await rezultat.json();

    if (rezultat.length === 0)
      this.elemRazultata.innerHTML =
        "<p>Nema rezultata za vaš upit! Pokušajte neki novi upit.</p>";
    else this.ubaciRezultateUdom(rezultat);
  }
  ubaciRezultateUdom(data) {
    let rezultat = "<p>Rezultati:</p><ul>";

    data.forEach((ime) => {
      rezultat += `<li>Puno ime fakulteta: ${ime.name}<br>Drzava: ${ime.country}</li>`;
    });

    rezultat += "</ul>";
    this.elemRazultata.innerHTML = rezultat;
  }
}

export default AsyncDebounce;
