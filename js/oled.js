/* ==================================================
   OLED VIRTUAL LAB
   Controle do OLED
================================================== */


/* --------------------------------------------------
   Dados iniciais dos materiais emissores

   Por enquanto são valores demonstrativos.
   Depois vamos substituir ou complementar pelos
   dados do seu banco de dados.
-------------------------------------------------- */

const materiaisOLED = {

    FIrpic: {
        nome: "FIrpic",
        cor: "Azul",
        comprimentoOnda: 470,
        rgb: "rgb(40, 100, 255)",
        brilho: "rgba(40, 100, 255, 0.9)"
    },

    Alq3: {
        nome: "Alq3",
        cor: "Verde",
        comprimentoOnda: 530,
        rgb: "rgb(34, 197, 94)",
        brilho: "rgba(34, 197, 94, 0.9)"
    },

    DCM: {
        nome: "DCM",
        cor: "Vermelho",
        comprimentoOnda: 620,
        rgb: "rgb(239, 68, 68)",
        brilho: "rgba(239, 68, 68, 0.9)"
    }

};


/* --------------------------------------------------
   Material inicialmente selecionado
-------------------------------------------------- */

let materialSelecionado = "FIrpic";


/* --------------------------------------------------
   Seleção dos elementos HTML
-------------------------------------------------- */

const oledDevice =
    document.getElementById("oledDevice");

const materialInfo =
    document.getElementById("materialInfo");

const wavelengthInfo =
    document.getElementById("wavelengthInfo");

const voltageInfo =
    document.getElementById("deviceVoltageInfo");


/* --------------------------------------------------
   Atualiza o OLED
-------------------------------------------------- */

function atualizarOLED(tensao) {

    const dados =
        materiaisOLED[materialSelecionado];


    /*
       Intensidade luminosa.

       O OLED só começa a emitir acima de
       aproximadamente 2 V nesta versão didática.
    */

    let intensidade =
        (tensao - 2) / 10;


    intensidade =
        Math.max(0, intensidade);


    intensidade =
        Math.min(1, intensidade);


    /*
       Área luminosa central
    */

    const oledLight =
        document.querySelector(".oled-light");


    oledLight.style.background =
        dados.rgb;


    /*
       Brilho externo.

       Quanto maior a tensão,
       maior será o brilho.
    */

    const tamanhoBrilho =
        20 + intensidade * 100;


    oledLight.style.boxShadow =
        `0 0 ${tamanhoBrilho}px ${dados.brilho}`;


    /*
       Transparência da luz
    */

    oledLight.style.opacity =
        0.25 + intensidade * 0.75;


    /*
       Atualização das informações
    */

    materialInfo.innerText =
        dados.nome;


    wavelengthInfo.innerText =
        dados.comprimentoOnda + " nm";


    voltageInfo.innerText =
        tensao.toFixed(1) + " V";

}


/* --------------------------------------------------
   Função para selecionar um material
-------------------------------------------------- */

function selecionarMaterial(material) {

    materialSelecionado =
        material;


    /*
       Remove a seleção visual
       dos outros botões
    */

    const botoes =
        document.querySelectorAll(".emitter");


    botoes.forEach(botao => {

        botao.classList.remove("selected");

    });


    /*
       Adiciona seleção ao botão clicado
    */

    const botaoSelecionado =
        document.querySelector(
            `[data-material="${material}"]`
        );


    botaoSelecionado.classList.add(
        "selected"
    );


    /*
       Atualiza o OLED
       usando a tensão atual
    */

    const slider =
        document.getElementById("voltage");


    const tensao =
        parseFloat(slider.value);


    atualizarOLED(tensao);

}
