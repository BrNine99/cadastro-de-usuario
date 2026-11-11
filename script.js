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

    restaurarDados();
})

// BUSCA E PREENCHIMENTO AUTOMÁTICO DE ENDEREÇO

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

            salvarDados();

        }else {
            alert("CEP não encontrado.")
        }
    })
    .catch(error => console.error("Erro ao buscar CEP:", error));
})

//PERSISTENCIA DOS DADOS DO FORMULÁRIO

// Captura o formulário
const formulario = document.getElementById("form-cadastro");

// Captura todos os campos do formulário
const campos = formulario.querySelectorAll("input");

// Função responsável por salvar as informações
function salvarDados() {
    const dados = {};

    campos.forEach((campo) => {
        dados[campo.name] = campo.value;
    });

    localStorage.setItem("dadosFormulario", JSON.stringify(dados));
}

// Detectando alterações nos campos
campos.forEach((campo) => {
    campo.addEventListener("input", salvarDados);
});

// Restaurando os dados ao carregar a página
function restaurarDados() {
    const dadosSalvos = localStorage.getItem("dadosFormulario");

    if(dadosSalvos) {
        const dados = JSON.parse(dadosSalvos);

        campos.forEach((campo) => {
            campo.value = dados[campo.name] ?? "";
        });
    }
}

// ADICIONA MENSAGEM DE CONFIRMAÇÃO DE CADASTRO

// Captura o elemento da mensagem
const mensagemCadastro = document.getElementById("mensagem-cadastro");

// Escuta o envio do formulário
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    mensagemCadastro.textContent = "Cadastro realizado com sucesso!";
});