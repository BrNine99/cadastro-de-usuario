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

// Restaura tema salvo no localStorage
document.addEventListener("DOMContentLoaded", () => {
    // Verifica se tem tema salvo
    const temaSalvo = localStorage.getItem("tema");

    // Se for dark. adiciona classe e altera o botão
    if(temaSalvo === "dark"){
        document.body.classList.add("dark");
        btnTema.textContent = "✹ Tema claro";
    }else {
        btnTema.textContent = "☾ Tema escuro";
    }
})

// Ouvir o evento de quando o usuario sair do campo de CEP
document.getElementById("cep").addEventListener("blur", (evento) => {
    const elemento = evento.target;
    const cepInformado = elemento.value;

    // Validar o CEP
    if(!(cepInformado.length === 8)){
        return;
    }

    // Fazer busca no ViaCEP
    fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
    .then(response => response.json())
    .then(data => {
        // Processamento da Página
        if(!data.erro){
            document.getElementById("logradouro").value = data.logradouro;
            document.getElementById("bairro").value = data.bairro;
            document.getElementById("cidade").value = data.localidade;
            document.getElementById("estado").value = data.uf;
        }else {
            alert("CEP não encontrado.")
        }
    })
    .catch(error => console.error("Erro ao buscar CEP:", error));
})
