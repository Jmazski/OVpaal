// ----------- Data & helpers (Dutch) -----------

const plaatsen = ["Roermond", "Koningsbosch", "Reewoude", "Rotterdam"];
const origineleNamen = [
    "Ceylan", "Jonas", "Jan", "MX", "Pico",
    "Boyfriend", "Girlfriend", "Darnell", "Sharugina", "Roan"
];
const nieuweNamenLijst = [
    "Raymond", "Luuk", "Kyano", "Thijs", "Nando",
    "Elias", "Maks", "Mr L", "Ruhican", "Stan smith"
];
let nieuweNamenQueue = [...nieuweNamenLijst];

// Generate a Dutch phone number.
function randomTelefoon() {
    return "06" + Math.floor(10000000 + Math.random() * 90000000);
}
// Generate a random balance between 69 and 420.
function randomSaldo() {
    return Math.floor(69 + Math.random() * (420 - 68));
}
// Pick a random city.
function randomPlaats() {
    return plaatsen[Math.floor(Math.random() * plaatsen.length)];
}
// Shuffle an array in-place.
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

// ----------- Passenger management -----------

// Create a passenger object, optionally marked as "new".
function maakPassagier(naam, isNieuw) {
    return {
        naam: naam,
        saldo: randomSaldo(),
        plaats: randomPlaats(),
        telefoon: randomTelefoon(),
        isNieuw: !!isNieuw,
        ooitUitgestapt: false // True after first checkout
    };
}

let allePassagiers = origineleNamen.map(naam => maakPassagier(naam, false));
let wachtlijst = [];
let bus = [];

// Reset the waiting list with those not on the bus.
function resetWachtlijst() {
    wachtlijst = allePassagiers.filter(p => !bus.includes(p));
    shuffle(wachtlijst);
}

// ----------- UI Elements -----------

const addBtn = document.getElementById("addBtn");
const exitBtn = document.getElementById("exitBtn");
const outputDiv = document.getElementById("output");
const listDiv = document.getElementById("list");
const actionPassengerDiv = document.getElementById("actionPassenger");
const showListBtn = document.getElementById("showListBtn");
const saldoMeldingDiv = document.getElementById("saldoMelding");

// ----------- UI Functions -----------

// Render bus passenger list in the sidebar.
function renderPassengerList() {
    if (bus.length === 0) {
        listDiv.innerHTML = "<em>Niemand in de bus.</em>";
        return;
    }
    listDiv.innerHTML = bus.map((p) =>
        `<li>${p.naam}${p.isNieuw && !p.ooitUitgestapt ? ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>' : ''}</li>`
    ).join("");
}

// Show the last person that checked in or out.
function showActionPassenger(persoon, type) {
    if (!persoon) {
        actionPassengerDiv.innerHTML = "";
        return;
    }
    let naamTekst = persoon.naam;
    if (persoon.isNieuw && !persoon.ooitUitgestapt) {
        naamTekst += ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>';
    }
    if (type === "in") {
        actionPassengerDiv.innerHTML = `
            <span style="color:#1e90ff;">${naamTekst}</span> is ingestapt!<br><br>
            <strong>Saldo:</strong> €${persoon.saldo}<br>
            <strong>Woonplaats:</strong> ${persoon.plaats}<br>
            <strong>Telefoon:</strong> ${persoon.telefoon}
        `;
    } else if (type === "uit") {
        actionPassengerDiv.innerHTML = `
            <span style="color:#e53935;">${naamTekst}</span> is uitgestapt.<br><br>
            <strong>Nieuw saldo:</strong> €${persoon.saldo}<br>
            <strong>Woonplaats:</strong> ${persoon.plaats}<br>
            <strong>Telefoon:</strong> ${persoon.telefoon}
        `;
    }
}

// Render a table with all passengers in the bus.
function showPassengerTable() {
    if (bus.length === 0) {
        outputDiv.innerHTML = "";
        return;
    }
    let html = `<table>
        <tr>
            <th>#</th>
            <th>Naam</th>
            <th>Saldo</th>
            <th>Woonplaats</th>
            <th>Telefoon</th>
        </tr>`;
    bus.forEach((p, i) => {
        html += `<tr>
            <td>${i + 1}</td>
            <td>${p.naam}${p.isNieuw && !p.ooitUitgestapt ? ' <span style="font-size:0.85em;color:#fff;background:#b0885a;padding:2px 9px;border-radius:10px;margin-left:6px;">Nieuw</span>' : ''}</td>
            <td>€${p.saldo}</td>
            <td>${p.plaats}</td>
            <td>${p.telefoon}</td>
        </tr>`;
    });
    html += "</table>";
    outputDiv.innerHTML = html;
}

// Show a small notification at the bottom for saldo = 0.
function showSaldoMelding(naam) {
    if (!saldoMeldingDiv) return;
    saldoMeldingDiv.textContent = `${naam} heeft geen geld meer.`;
    saldoMeldingDiv.style.display = "block";
    setTimeout(() => {
        saldoMeldingDiv.style.display = "none";
    }, 2500);
}

// ----------- Event handlers -----------

// Handle check-in button click.
addBtn.addEventListener("click", () => {
    if (wachtlijst.length > 0) {
        const persoon = wachtlijst.shift();
        bus.push(persoon);
        showActionPassenger(persoon, "in");
        renderPassengerList();
        showPassengerTable();
        if (wachtlijst.length === 0) {
            addBtn.disabled = true;
            if (allePassagiers.length === 10) {
                addBtn.innerText = "Bus is vol!";
            } else {
                addBtn.innerText = "Er zijn niet meer mensen om in te stappen";
            }
        }
        if (bus.length > 0) {
            exitBtn.disabled = false;
        }
    }
});

// Handle check-out button click.
exitBtn.addEventListener("click", () => {
    if (bus.length === 0) {
        actionPassengerDiv.innerHTML = "<em>Niemand kan uitstappen!</em>";
        return;
    }
    const index = Math.floor(Math.random() * bus.length);
    const persoon = bus[index];
    persoon.saldo = Math.max(0, persoon.saldo - 3);
    if (persoon.isNieuw) {
        persoon.ooitUitgestapt = true;
    }
    bus.splice(index, 1);

    // If saldo is 0, remove OV immediately and show message.
    if (persoon.saldo === 0) {
        showSaldoMelding(persoon.naam);
        allePassagiers = allePassagiers.filter(q => q !== persoon);
        bus = bus.filter(q => q !== persoon);
        wachtlijst = wachtlijst.filter(q => q !== persoon);
        // Add a new passenger if possible.
        if (allePassagiers.length < 10 && nieuweNamenQueue.length > 0) {
            const nieuweNaam = nieuweNamenQueue.shift();
            const nieuwePassagier = maakPassagier(nieuweNaam, true);
            allePassagiers.push(nieuwePassagier);
            wachtlijst.push(nieuwePassagier);
        }
        renderRemoveModal();
        renderPassengerList();
        showPassengerTable();
        if (bus.length === 0) exitBtn.disabled = true;
        if (addBtn.disabled && wachtlijst.length > 0) {
            addBtn.disabled = false;
            addBtn.innerText = "Instappen";
        }
        checkIedereenRijbewijs();
        showActionPassenger(persoon, "uit");
        return;
    }

    showActionPassenger(persoon, "uit");
    renderPassengerList();
    showPassengerTable();
    wachtlijst.push(persoon);

    if (bus.length === 0) {
        exitBtn.disabled = true;
    }
    if (addBtn.disabled && wachtlijst.length > 0) {
        addBtn.disabled = false;
        addBtn.innerText = "Instappen";
    }
});

// ----------- Initialization -----------

resetWachtlijst();
renderPassengerList();
showActionPassenger();
showPassengerTable();
exitBtn.disabled = true;

// ----------- "De Lijst" button functionality -----------

document.addEventListener("DOMContentLoaded", function () {
    let lijstZichtbaar = false;
    if (showListBtn && outputDiv) {
        showListBtn.addEventListener('click', () => {
            lijstZichtbaar = !lijstZichtbaar;
            if (lijstZichtbaar) {
                outputDiv.classList.add('visible');
                showListBtn.innerText = 'Verberg Lijst';
            } else {
                outputDiv.classList.remove('visible');
                showListBtn.innerText = 'De Lijst';
            }
        });
        outputDiv.classList.remove('visible');
        showListBtn.innerText = 'De Lijst';
    }
});

// ----------- OV cancellation functionality -----------

const ovOpzegBtn = document.getElementById("ovOpzegBtn");
const removeModal = document.getElementById("removeModal");
const modalNames = document.getElementById("modalNames");
const closeModalBtn = document.getElementById("closeModalBtn");

// --- Modal for "everyone has their license" ---
const rijbewijsModal = document.getElementById("rijbewijsModal");
const herstartBtn = document.getElementById("herstartBtn");

// Show the big modal if no passengers are left.
function checkIedereenRijbewijs() {
    if (allePassagiers.length === 0) {
        rijbewijsModal.classList.add("active");
    }
}

// Page reloads when the restart button is pressed.
if (herstartBtn) {
    herstartBtn.addEventListener("click", () => {
        location.reload();
    });
}

// Render the modal for cancelling OV for a passenger.
function renderRemoveModal() {
    modalNames.innerHTML = "";
    allePassagiers.forEach((p) => {
        const btn = document.createElement("button");
        btn.textContent = p.naam + (p.isNieuw && !p.ooitUitgestapt ? ' (Nieuw)' : '');
        btn.className = "removeNameBtn";
        btn.onclick = () => {
            allePassagiers = allePassagiers.filter(q => q !== p);
            bus = bus.filter(q => q !== p);
            wachtlijst = wachtlijst.filter(q => q !== p);

            // Add a new passenger if possible.
            if (allePassagiers.length < 10 && nieuweNamenQueue.length > 0) {
                const nieuweNaam = nieuweNamenQueue.shift();
                const nieuwePassagier = maakPassagier(nieuweNaam, true);
                allePassagiers.push(nieuwePassagier);
                wachtlijst.push(nieuwePassagier);
            }

            renderRemoveModal();
            renderPassengerList();
            showPassengerTable();
            if (bus.length === 0) exitBtn.disabled = true;
            if (addBtn.disabled && wachtlijst.length > 0) {
                addBtn.disabled = false;
                addBtn.innerText = "Instappen";
            }
            checkIedereenRijbewijs();
        };
        modalNames.appendChild(btn);
    });
    if (allePassagiers.length === 0) {
        modalNames.innerHTML = "<em>Geen passagiers meer over!</em>";
    }
}

// Open and close the OV cancellation modal.
if (ovOpzegBtn && removeModal && modalNames && closeModalBtn) {
    ovOpzegBtn.addEventListener("click", () => {
        renderRemoveModal();
        removeModal.classList.add("active");
    });
    closeModalBtn.addEventListener("click", () => {
        removeModal.classList.remove("active");
    });
    window.addEventListener("keydown", (e) => {
        if (removeModal.classList.contains("active") && e.key === "Escape") {
            removeModal.classList.remove("active");
        }
    });
    removeModal.addEventListener("click", function (e) {
        if (e.target === removeModal) {
            removeModal.classList.remove("active");
        }
    });
}