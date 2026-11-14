
const eventos = [
    { id: 1, titulo: "Treinamento WEB SGC para Regionais (RR)", inicio: "2027-01-23", fim: "2027-01-23", categoria: "Treinamento" },
    { id: 2, titulo: "Treinamento WEB SGC para Distritais (RR)", inicio: "2027-01-23", fim: "2027-01-23", categoria: "Treinamento" },
        { id: 1, titulo: "Treinamento WEB SGC para Regionais (AM)", inicio: "2027-01-30", fim: "2027-01-30", categoria: "Treinamento" },
    { id: 2, titulo: "Treinamento WEB SGC para Distritais (AM)", inicio: "2027-01-30", fim: "2027-01-30", categoria: "Treinamento" },
    { id: 3, titulo: "Treinamento WEB SGC para Diretoria de Clube", inicio: "2027-02-20", fim: "2027-02-20", categoria: "Treinamento" },
    { id: 4, titulo: "Treinamento Básico para Diretoria - TBD", inicio: "2027-02-13", fim: "2027-02-14", categoria: "Treinamento" },
    { id: 5, titulo: "Curso para Conselheiros – 4 horas (SGC)", inicio: "2027-02-10", fim: "2027-06-30", categoria: "Curso" },
    { id: 6, titulo: "Seminário para Liderança – 10 horas", inicio: "2027-03-06", fim: "2027-03-07", categoria: "Treinamento" },
    { id: 7, titulo: "Abertura da Fábrica de Líderes - Região", inicio: "2027-03-07", fim: "2027-03-07", categoria: "Liderança" },
    { id: 8, titulo: "DBV por 01 dia (Confirmar a data)", inicio: "2027-03-28", fim: "2027-03-28", categoria: "Evento" },
    { id: 9, titulo: "1ª Bateria de Provas", inicio: "2027-04-03", fim: "2027-04-03", categoria: "Prova" },
    { id: 10, titulo: "Concursos Espirituais – Fase Clube", inicio: "2027-04-01", fim: "2027-04-11", categoria: "Concurso" },
    { id: 11, titulo: "Concursos Espirituais – Fase Distrito", inicio: "2027-04-12", fim: "2027-05-02", categoria: "Concurso" },
    { id: 12, titulo: "2ª Bateria de Provas", inicio: "2027-05-01", fim: "2027-05-01", categoria: "Prova" },
    { id: 13, titulo: "Concursos Espirituais – Fase Região", inicio: "2027-05-03", fim: "2027-05-23", categoria: "Concurso" },
    { id: 14, titulo: "3ª Bateria de Provas", inicio: "2027-06-05", fim: "2027-06-05", categoria: "Prova" },
    { id: 15, titulo: "Concurso de Ordem Unida - Fase Região", inicio: "2027-06-01", fim: "2027-06-30", categoria: "Concurso" },
    { id: 16, titulo: "Entrega do Cartão Virtual – Máster e Avançado", inicio: "2027-06-01", fim: "2027-06-13", categoria: "Prazo" },
    { id: 17, titulo: "Entrega do Cartão Virtual - Líder", inicio: "2027-07-31", fim: "2027-08-07", categoria: "Prazo" },
    { id: 18, titulo: "Dia Mundial dos Desbravadores", inicio: "2027-09-18", fim: "2027-09-18", categoria: "Comemoração" },
    { id: 19, titulo: "VI ACAMP ESCOLA", inicio: "2027-10-08", fim: "2027-10-11", categoria: "Acampamento" },
    { id: 20, titulo: "IX CAMPORI DE DESBRAVADORES – Rumo à Eternidade", inicio: "2027-10-29", fim: "2027-11-02", categoria: "Campori" }
];

let mesAtual = 0;
let diaSelecionado = null;

const nomesMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril",
    "Maio", "Junho", "Julho", "Agosto",
    "Setembro", "Outubro", "Novembro", "Dezembro"
];

function formatarData(data) {
    const [ano, mes, dia] = data.split("-");
    return `${dia}/${mes}/${ano}`;
}

function dataLocal(data) {
    return new Date(`${data}T12:00:00`);
}

function eventoNoDia(evento, data) {
    return data >= evento.inicio && data <= evento.fim;
}

function atualizarResumo() {
    document.getElementById("totalEventos").textContent = eventos.length;
}

function preencherMeses() {
    const select = document.getElementById("filtroMes");

    nomesMeses.forEach((mes, indice) => {
        const opcao = document.createElement("option");
        opcao.value = indice;
        opcao.textContent = mes;
        select.appendChild(opcao);
    });
}



function renderizarCalendario() {
    const calendario = document.getElementById("calendario");

    const trimestres = [
        "1º Trimestre",
        "2º Trimestre",
        "3º Trimestre",
        "4º Trimestre"
    ];

    const primeiroMes = mesAtual;
    const ultimoMes = mesAtual + 2;

    document.getElementById("tituloTrimestre").textContent =
        `${trimestres[mesAtual / 3]} — ${nomesMeses[primeiroMes]} a ${nomesMeses[ultimoMes]} de 2027`;

    let html = '<div class="calendario-trimestral">';

    for (let mes = primeiroMes; mes <= ultimoMes; mes++) {
        const primeiroDia = new Date(2027, mes, 1).getDay();
        const totalDias = new Date(2027, mes + 1, 0).getDate();

        html += `
            <div class="mes-trimestral">
                <h3>${nomesMeses[mes]}</h3>
                <div class="grade-calendario">
        `;

        ["D", "S", "T", "Q", "Q", "S", "S"].forEach(dia => {
            html += `<div class="dia-semana">${dia}</div>`;
        });

        for (let i = 0; i < primeiroDia; i++) {
            html += `<div></div>`;
        }

        for (let dia = 1; dia <= totalDias; dia++) {
            const data = `2027-${String(mes + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;

            const temEvento = eventos.some(evento =>
                eventoNoDia(evento, data)
            );

            html += `
                <button type="button"
                    class="dia-calendario ${temEvento ? "tem-evento" : ""} ${diaSelecionado === data ? "selecionado" : ""}"
                    data-data="${data}">
                    ${dia}
                </button>
            `;
        }

        html += `
                </div>
            </div>
        `;
    }

    html += "</div>";
    calendario.innerHTML = html;

    calendario.querySelectorAll("[data-data]").forEach(botao => {
        botao.addEventListener("click", () => {
            diaSelecionado = botao.dataset.data;
            renderizarCalendario();
            renderizarEventos();
        });
    });
}

function renderizarEventos() {
    const lista = document.getElementById("listaEventos");
    const busca = document.getElementById("busca").value.toLowerCase();
    const filtroMes = document.getElementById("filtroMes").value;
    
    const filtrados = eventos.filter(evento => {
        const texto = `${evento.titulo} ${evento.categoria}`.toLowerCase();
        const correspondeBusca = texto.includes(busca);
        const correspondeMes = filtroMes === "" ||
            dataLocal(evento.inicio).getMonth() === Number(filtroMes) ||
            (dataLocal(evento.fim).getMonth() === Number(filtroMes)) ||
            (evento.inicio.slice(0, 4) === "2027" &&
             evento.inicio.slice(5, 7) <= String(Number(filtroMes) + 1).padStart(2, "0") &&
             evento.fim.slice(5, 7) >= String(Number(filtroMes) + 1).padStart(2, "0"));
        const correspondeDia = !diaSelecionado || eventoNoDia(evento, diaSelecionado);
        
        return correspondeBusca && correspondeMes && correspondeDia;
    });

    filtrados.sort((a, b) => a.inicio.localeCompare(b.inicio));

    if (filtrados.length === 0) {
        lista.innerHTML = "<p>Nenhum evento encontrado.</p>";
        return;
    }

    lista.innerHTML = filtrados.map(evento => {
               
return `
    <article class="evento">
        <h3>${evento.titulo}</h3>

        <p>
            <strong>Data:</strong>
            ${formatarData(evento.inicio)}
            ${evento.fim !== evento.inicio
                ? " até " + formatarData(evento.fim)
                : ""}
        </p>

        <p>
            <strong>Categoria:</strong> ${evento.categoria}
        </p>
    </article>
`;

    }).join("");

       
}

document.getElementById("busca").addEventListener("input", renderizarEventos);
document.getElementById("filtroMes").addEventListener("change", renderizarEventos);

preencherMeses();
atualizarResumo();
renderizarEventos();

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("./sw.js").catch(console.error);
    });
}

