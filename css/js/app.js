/* ==================================================
   OLED VIRTUAL LAB
   Controle principal da interface
================================================== */


/* --------------------------------------------------
   ELEMENTOS DA INTERFACE
-------------------------------------------------- */

const botoesEmissores =
    document.querySelectorAll(".emitter");

const sliderTensao =
    document.getElementById("voltage");

const valorTensao =
    document.getElementById("voltageValue");

const botaoSimular =
    document.getElementById("simulateButton");


/* --------------------------------------------------
   SELEÇÃO DO MATERIAL EMISSOR
-------------------------------------------------- */

botoesEmissores.forEach(botao => {

    botao.addEventListener("click", () => {

        const material =
            botao.dataset.material;

        selecionarMaterial(material);

    });

});


/* --------------------------------------------------
   CONTROLE DA TENSÃO
-------------------------------------------------- */

sliderTensao.addEventListener("input", () => {

    const tensao =
        parseFloat(sliderTensao.value);


    /*
       Atualiza o valor mostrado
       ao lado do controle
    */

    valorTensao.innerText =
        tensao.toFixed(1) + " V";


    /*
       Atualiza o OLED visualmente
    */

    atualizarOLED(tensao);

});


/* --------------------------------------------------
   BOTÃO "ACENDER OLED"
-------------------------------------------------- */

botaoSimular.addEventListener("click", () => {

    const tensao =
        parseFloat(sliderTensao.value);


    atualizarOLED(tensao);

});


/* --------------------------------------------------
   INICIALIZAÇÃO
-------------------------------------------------- */

window.addEventListener("DOMContentLoaded", () => {

    const tensaoInicial =
        parseFloat(sliderTensao.value);


    valorTensao.innerText =
        tensaoInicial.toFixed(1) + " V";


    atualizarOLED(tensaoInicial);

});
