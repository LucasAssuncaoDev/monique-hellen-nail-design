
/* ==================================
   MENU MOBILE
================================== */

const menuToggle = document.querySelector(".menu-toggle");
const navbar = document.querySelector(".navbar");
const links = document.querySelectorAll(".navbar a");

menuToggle.addEventListener("click", () => {
  const aberto = navbar.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(aberto));
  menuToggle.textContent = aberto ? "✕" : "☰";
});

links.forEach((link) => {
  link.addEventListener("click", () => {
    navbar.classList.remove("active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

/* ==================================
   ANO AUTOMÁTICO NO RODAPÉ
================================== */

document.querySelector("#ano").textContent =
  new Date().getFullYear();

/* ==================================
   GALERIA INTERATIVA COM SETAS
================================== */

const fotos = document.querySelectorAll(".galeria-item");

const lightbox = document.querySelector("#lightbox");
const lightboxImg = document.querySelector("#lightbox-img");

const fecharLightbox = document.querySelector(".lightbox-fechar");

const setaAnterior = document.querySelector(".lightbox-anterior");
const setaProximo = document.querySelector(".lightbox-proximo");

const fotoAtual = document.querySelector("#foto-atual");
const totalFotos = document.querySelector("#total-fotos");

let indiceAtual = 0;
let ultimaFoto = null;

// Seleciona as fotos visíveis
function obterFotosVisiveis() {
  return Array.from(fotos).filter((foto) => {
    return getComputedStyle(foto).display !== "none";
  });
}

// Mostra a foto selecionada
function mostrarFoto(indice) {
  const fotosVisiveis = obterFotosVisiveis();

  if (fotosVisiveis.length === 0) return;

  indiceAtual =
    (indice + fotosVisiveis.length) % fotosVisiveis.length;

  const imagem = fotosVisiveis[indiceAtual].querySelector("img");

  lightboxImg.src = imagem.src;
  lightboxImg.alt = imagem.alt;

  fotoAtual.textContent = indiceAtual + 1;
  totalFotos.textContent = fotosVisiveis.length;
}

// Abre a foto ampliada
fotos.forEach((foto) => {
  foto.addEventListener("click", () => {
    const fotosVisiveis = obterFotosVisiveis();

    indiceAtual = fotosVisiveis.indexOf(foto);
    ultimaFoto = foto;

    mostrarFoto(indiceAtual);

    lightbox.classList.add("ativo");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
    fecharLightbox.focus();
  });
});

// Avança para a próxima foto
function proximaFoto() {
  mostrarFoto(indiceAtual + 1);
}

// Volta para a foto anterior
function fotoAnterior() {
  mostrarFoto(indiceAtual - 1);
}

// Eventos das setas
setaProximo.addEventListener("click", proximaFoto);
setaAnterior.addEventListener("click", fotoAnterior);

// Fecha a galeria
function fecharGaleria() {
  lightbox.classList.remove("ativo");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImg.removeAttribute("src");
  document.body.style.overflow = "";

  if (ultimaFoto) {
    ultimaFoto.focus();
  }
}

// Botão de fechar
fecharLightbox.addEventListener("click", fecharGaleria);

// Fecha clicando no fundo
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    fecharGaleria();
  }
});

// Navegação pelo teclado
document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("ativo")) return;

  if (event.key === "Escape") {
    fecharGaleria();
  }

  if (event.key === "ArrowRight") {
    proximaFoto();
  }

  if (event.key === "ArrowLeft") {
    fotoAnterior();
  }

  // Mantém o foco nos controles da galeria
  if (event.key === "Tab") {
    const controles = [
      fecharLightbox,
      setaAnterior,
      setaProximo
    ];

    const indice = controles.indexOf(document.activeElement);

    if (event.shiftKey && indice <= 0) {
      event.preventDefault();
      controles[controles.length - 1].focus();
    } else if (
      !event.shiftKey &&
      indice === controles.length - 1
    ) {
      event.preventDefault();
      controles[0].focus();
    }
  }
});

/* ==================================
   AGENDAMENTO PELO WHATSAPP
================================== */

const botaoAgendar = document.querySelector("#btn-whatsapp");
const nomeCliente = document.querySelector("#nome-cliente");
const selecionarServico = document.querySelector("#servico-agendamento");
const dataAgendamento = document.querySelector("#data-agendamento");
const horarioAgendamento = document.querySelector("#horario-agendamento");

// Número do WhatsApp do estúdio
const numeroWhatsApp = "5571999996732";

// Define a data mínima como hoje
function obterDataLocal() {
  const hoje = new Date();

  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, "0");
  const dia = String(hoje.getDate()).padStart(2, "0");

  return `${ano}-${mes}-${dia}`;
}

dataAgendamento.min = obterDataLocal();

// Ao clicar no botão
botaoAgendar.addEventListener("click", () => {
  const nome = nomeCliente.value.trim();
  const servico = selecionarServico.value;
  const data = dataAgendamento.value;
  const horario = horarioAgendamento.value;

  // Validação do nome
  if (!nome) {
    alert("Por favor, informe seu nome.");
    nomeCliente.focus();
    return;
  }

  // Validação do serviço
  if (!servico) {
    alert("Por favor, selecione um serviço.");
    selecionarServico.focus();
    return;
  }

  // Validação da data
  if (!data) {
    alert("Por favor, selecione uma data.");
    dataAgendamento.focus();
    return;
  }

  // Impede agendamentos em datas anteriores
  if (data < obterDataLocal()) {
    alert("Selecione uma data de hoje em diante.");
    dataAgendamento.focus();
    return;
  }

  // Validação do horário
  if (!horario) {
    alert("Por favor, selecione um horário.");
    horarioAgendamento.focus();
    return;
  }

  // Formata a data para DD/MM/AAAA
  const [ano, mes, dia] = data.split("-");
  const dataFormatada = `${dia}/${mes}/${ano}`;

  // Monta a mensagem automática
  const mensagem =
    `Olá, Monique! Gostaria de agendar um horário.\n\n` +
    `Nome: ${nome}\n` +
    `Serviço: ${servico}\n` +
    `Data desejada: ${dataFormatada}\n` +
    `Horário de preferência: ${horario}\n\n` +
    `Poderia confirmar a disponibilidade?`;

  // Cria o link do WhatsApp
  const linkWhatsApp =
    `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

  // Abre o WhatsApp em uma nova aba
  window.open(linkWhatsApp, "_blank", "noopener,noreferrer");
});
