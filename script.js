// Implementa botão de tema
const btnTema = document.getElementById("botao-tema");

btnTema.addEventListener("click", () => {

    // Verificar se usuario ja tem tema pré-definido
    const temaAtual = localStorage.getItem("tema");
    // Verificar qual o tema e inverter
    const novoTema = temaAtual === "dark" ? "light" : "dark";
    // Adicionar a classe dark no elemento body
    document.body.classList.toggle("dark", novoTema === "dark");
    // Salvar as preferencias no localStorage
    localStorage.setItem("tema", novoTema);
    // Atualizar o texto do botao
    btnTema.textContent = novoTema === "dark" ? "✹ Tema claro" : "☾ Tema escuro";
})