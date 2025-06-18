# OVpaal
Wow er zijn nieuwe mensen! en we kunnen nu onze OV opzeggen!!

# Bussie OV-Paal Passagiers

Een interactieve webapplicatie om het in- en uitstappen van passagiers in een fictieve OV-bus te simuleren. Passagiers kunnen instappen, uitstappen, hun OV opzeggen en worden automatisch vervangen door nieuwe passagiers wanneer iemand zijn OV opzegt of geen saldo meer heeft.

## Features

- **Passagiers in- en uitchecken**
    - Passagiers stappen in en uit de bus via knoppen.
    - Per uitstap wordt €3 van het saldo afgetrokken.
- **Saldo en woonplaats**
    - Elke passagier heeft een saldo, een woonplaats en een telefoonnummer.
- **Nieuwe passagiers**
    - Als een passagier zijn OV opzegt of geen saldo meer heeft, verschijnt een nieuwe (“Nieuw” label) tot er maximaal 10 zijn.
    - Het “Nieuw”-label verdwijnt zodra de passagier voor het eerst uitcheckt.
- **OV opzeggen**
    - Via de knop "OV opzeggen" kun je een passagier definitief verwijderen.
    - Direct na verwijderen komt er automatisch een nieuwe passagier (indien beschikbaar).
- **Saldo op?**
    - Zodra een passagier €0 saldo heeft, wordt deze automatisch verwijderd en verschijnt een melding onderin het scherm.
- **"Bus is vol!" en andere meldingen**
    - Knoptekst verandert afhankelijk van het aantal passagiers en de wachtlijst.
- **Herstart-functionaliteit**
    - Als er niemand meer is, verschijnt een melding dat iedereen zijn rijbewijs heeft gehaald en kun je de app herstarten.
- **Responsief en overzichtelijk design**

## Installatie & Gebruik

1. Plaats beide bestanden in dezelfde map:
    - `index.html`
    - `ovpaal.js`
2. Open `index.html` in je browser.

## Bestanden

### index.html

Bevat de volledige UI, styling en koppelingen naar de JavaScript.

### ovpaal.js

Regelt alle logica: passagiersbeheer, saldo, events, meldingen, dynamisch toevoegen van nieuwe passagiers en alle interacties.

## Demo

![Schermafbeelding](screenshot.png) <!-- Voeg eventueel een eigen screenshot toe -->

## Nieuwe passagiers (namenlijst)

Als er iemand wordt verwijderd, wordt een nieuwe passagier gekozen uit deze lijst:

- Raymond
- Luuk
- Kyano
- Thijs
- Nando
- Elias
- Maks
- Mr L
- Ruhican
- Stan smith

Er kunnen maximaal 10 passagiers tegelijk in het systeem zitten.

## Credits

Gemaakt als oefenproject en demo voor interactieve JavaScript front-end logica en DOM-manipulatie.

---

Veel plezier! 🚍
