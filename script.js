//Variáveis
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia(
    "(min-width: 400px) and (max-width: 600px)"
);
const notes = document.querySelectorAll(".js-note");
const envelopContent = document.querySelector(".js-envelop-content");
const upPaper = document.querySelector(".js-up-paper");
const sticker = document.querySelector(".js-sticker");

//-> Função que reseta o tamanho das notas.
function resetNotesSize() {
    notes.forEach(note => {
        if (note.classList.contains("active")) {
            note.classList.remove("active");
            gsap.set(note, {
                height: "30%",
                clearProps: "all"
            });
        }
    });
}

//-> Função principal que habilita todas as notas.
function prepareNotes() {
    gsap.to(envelopContent, {
        height: "110%",
        duration: 0.5
    });

    notes.forEach((note, i) => {
        note.addEventListener("click", function() {
            let heightValue;

            if (mobile_media_query.matches) {
                heightValue = 125 + 40 * i;
            } else if (tablet_media_query.matches) {
                heightValue = 80 + 21 * i;
            } else {
                heightValue = 70 + 20 * i;
            }

            if (this.classList.contains("active")) {
                this.classList.remove("active");
                gsap.set(this, {
                    height: "30%",
                    clearProps: "all"
                });
            } else {
                resetNotesSize(); // Reset all notes before activating the clicked one
                this.classList.add("active");
                gsap.set(this, {
                    height: heightValue + "%"
                });
            }
        });
    });
}

//-> Função que configura a aba superior do envelope.
function setupUpPaper() {
    const clipPathValues = [0, 0, 100, 0, 50, 61];
    gsap.set(upPaper, {
        bottom: "97%",
        rotation: 180,
        zIndex: 200,
        clipPath: `polygon(${clipPathValues[0]}% ${clipPathValues[1]}%, ${clipPathValues[2]}% ${clipPathValues[3]}%, ${clipPathValues[4]}% ${clipPathValues[5]}%)`,
        onComplete: prepareNotes
    });
}

//-> Função que inicia a transição da aba superior.
function startEnvelopTransition() {
    gsap.to(upPaper, {
        bottom: "1%",
        duration: 0.25,
        onComplete: setupUpPaper
    });
    upPaper.removeEventListener("click", startEnvelopTransition);
    upPaper.classList.remove("cursor");
}

//-> Função que permite cortar o adesivo.
function cutSticker() {
    gsap.set(sticker, {
        width: "20%",
        left: "-80%"
    });
    document.body.classList.remove("scissors");
    sticker.removeEventListener("click", cutSticker);
    upPaper.addEventListener("click", startEnvelopTransition);
    upPaper.classList.add("cursor");
}

sticker.addEventListener("click", cutSticker);

window.addEventListener('resize', resetNotesSize);