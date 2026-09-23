    function buscarCarro() {
      alert("Busca realizada! Em um site real, os carros seriam filtrados aqui.");
    }

    function interesse(carro) {
      document.getElementById("contato").scrollIntoView({ behavior: "smooth" });
      alert("Você demonstrou interesse no: " + carro);
    }

    function enviarFormulario(event) {
      event.preventDefault();
      alert("Mensagem enviada com sucesso! Entraremos em contato.");
      event.target.reset();
    }
    const botaoMenu = document.getElementById("menu-button");
const menu = document.getElementById("menu");

botaoMenu.addEventListener("click", () => {
  const aberto = menu.classList.toggle("aberto");
  botaoMenu.setAttribute("aria-expanded", String(aberto));
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
  });
});