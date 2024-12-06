// Array inicial para armazenar os itens
const estoque = [];

// Função para renderizar a lista de estoque
function renderizarEstoque() {
    const estoqueUl = document.getElementById("estoque-ul");
    estoqueUl.innerHTML = "";

    estoque.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = `${item.nome} - ${item.categoria} - R$${item.preco}`;
        li.setAttribute("onclick", `excluirItem(${item.id})`); // Adiciona o evento onclick com o ID
        estoqueUl.appendChild(li);
    });

    atualizarValorTotal();
}

// Função para atualizar o valor total do estoque
function atualizarValorTotal() {
    const valorTotalTexto = document.getElementById("valor-total-texto");
    const total = estoque.reduce((soma, item) => soma + item.preco, 0);
    valorTotalTexto.textContent = `R$${total}`;
}

// Função para adicionar item ao estoque
function adicionarItem(event) {
    event.preventDefault();

    const id = Number(document.getElementById("item-id").value);
    const nome = document.getElementById("item-nome").value;
    const categoria = document.getElementById("item-categoria").value;
    const preco = Number(document.getElementById("item-preco").value);

    if (estoque.some((item) => item.id === id)) {
        alert("Erro: Item com este ID já existe.");
        return;
    }

    /***** forma 1 *****/
    //criando o objeto item com os key-value para posteriormente adicionar ao array estoque
    /*let item = {
        id: id,
        nome: nome,
        categoria: categoria,
        preco: preco,
    };
    estoque.push(item);/*
    /***** fim forma 1 *****/

    //forma 2 - adicionando diretamente ao array
    estoque.push({ id, nome, categoria, preco });
    
    document.getElementById("form-adicionar").reset();
    renderizarEstoque();
    exibirToast('Item adicionado com sucesso!');
}

// Função para buscar itens por categoria
function buscarPorCategoria() {
    const inputBuscaCategoria = document.getElementById("buscar-categoria-input");
    const categoria = inputBuscaCategoria.value.trim();
    const resultadosBusca = document.getElementById("resultados-busca");

    if (!categoria) return;

    const resultados = estoque.filter((item) => item.categoria === categoria);
    resultadosBusca.innerHTML = "";

    if (resultados.length === 0) {
        resultadosBusca.textContent = "Nenhum item encontrado.";
        return;
    }

    resultados.forEach((item) => {
        const p = document.createElement("p");
        p.textContent = `${item.nome} - R$${item.preco}`;
        resultadosBusca.appendChild(p);
    });
}

// Função para excluir item do estoque
function excluirItem(id) {
    const confirmar = confirm("Tem certeza de que deseja excluir este item?");
    if (confirmar) {
        const indice = estoque.findIndex((item) => item.id === id);
        if (indice !== -1) {
            estoque.splice(indice, 1);
            renderizarEstoque();
            exibirToast("Item excluído com sucesso!");
        } else {
            alert("Erro: Item não encontrado.");
        }
    }
}

// Inicializar com estoque vazio
renderizarEstoque();


function exibirToast(message, duration = 1500) {
    // Cria o elemento do toast
    const toast = document.createElement('div');
    toast.classList.add('toast');
    toast.textContent = message;

    // Adiciona o toast ao contêiner
    const toastContainer = document.getElementById('toast-container');
    toastContainer.appendChild(toast);

    // Mostra o toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    // Remove o toast após o tempo especificado
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 2500); // Tempo para o efeito de fade-out
    }, duration);
}