// js/main.js

let carrinho = JSON.parse(localStorage.getItem('resumoPedido')) || [];

function validarLogin() {
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const lgpd = document.getElementById('lgpd').checked;
    const btnLogin = document.getElementById('btn-login');
    if (btnLogin) btnLogin.disabled = !(cpf.trim().length > 0 && email.includes('@') && lgpd);
}

function iniciarPedido(event) {
    event.preventDefault();
    localStorage.removeItem('resumoPedido');
    localStorage.removeItem('usaFidelidade');
    window.location.href = 'unidade.html';
}

function carregarCardapio(categoria = 'todos') {
    const grade = document.getElementById('grade-produtos');
    if (!grade) return; 

    grade.innerHTML = ''; 
    
    // Cria uma cópia da lista e aplica o filtro (se houver)
    let produtosFiltrados = categoria === 'todos' ? [...produtos] : produtos.filter(p => p.categoria === categoria);

    // Ordena os produtos em ordem alfabética (A-Z) pelo nome
    produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome));

    produtosFiltrados.forEach(produto => {
        const cartao = document.createElement('div');
        cartao.className = 'cartao-produto';
        cartao.innerHTML = `
            <img src="${produto.imagem}" alt="${produto.nome}" class="img-produto">
            <h3>${produto.nome}</h3>
            <p class="descricao">${produto.descricao}</p>
            <p class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</p>
            <button class="btn-primario" onclick="adicionarAoCarrinho(${produto.id})">Adicionar</button>
        `;
        grade.appendChild(cartao);
    });
    atualizarTotalCarrinho();
}

function filtrarCategoria(categoria, botaoClicado) {
    document.querySelectorAll('.btn-aba').forEach(btn => btn.classList.remove('ativo'));
    botaoClicado.classList.add('ativo');
    carregarCardapio(categoria);
}

function adicionarAoCarrinho(idProduto) {
    const index = carrinho.findIndex(item => item.id === idProduto);
    if (index > -1) {
        carrinho[index].quantidade = (carrinho[index].quantidade || 1) + 1;
    } else {
        const produto = produtos.find(p => p.id === idProduto);
        carrinho.push({ ...produto, quantidade: 1 });
    }
    atualizarTotalCarrinho();
}

function atualizarTotalCarrinho() {
    let valorTotal = 0;
    let qtdTotal = 0;
    
    carrinho.forEach(item => {
        const qtd = item.quantidade || 1;
        valorTotal += (item.preco * qtd);
        qtdTotal += qtd;
    });

    const textoSacola = document.getElementById('sacola-resumo');
    if (textoSacola) textoSacola.innerText = `${qtdTotal} itens | R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    
    const btnSacolaHeader = document.getElementById('btn-sacola-header');
    if (btnSacolaHeader) btnSacolaHeader.disabled = carrinho.length === 0;

    localStorage.setItem('resumoPedido', JSON.stringify(carrinho));
}

function alterarQuantidade(idProduto, alteracao) {
    const index = carrinho.findIndex(item => item.id === idProduto);
    if (index > -1) {
        carrinho[index].quantidade = (carrinho[index].quantidade || 1) + alteracao;
        if (carrinho[index].quantidade <= 0) {
            carrinho.splice(index, 1);
        }
    }
    localStorage.setItem('resumoPedido', JSON.stringify(carrinho));
    carregarResumoPagamento();
}

function removerDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    localStorage.setItem('resumoPedido', JSON.stringify(carrinho));
    carregarResumoPagamento();
}

function atualizarTotalPagamento() {
    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    
    let totalPago = itensSalvos.reduce((total, item) => {
        const qtd = item.quantidade || 1; 
        return total + (item.preco * qtd);
    }, 0);
    
    const fidelidade = document.getElementById('fidelidade');
    if (fidelidade && fidelidade.checked) {
        totalPago -= 10.00;
        if (totalPago < 0) totalPago = 0; 
    }

    const elementoTotal = document.getElementById('total-pagamento');
    if (elementoTotal) {
        elementoTotal.innerText = `R$ ${totalPago.toFixed(2).replace('.', ',')}`;
    }
    
    validarPagamento();
}

function validarPagamento() {
    const metodo = document.getElementById('metodo-pagamento');
    const btnPagar = document.getElementById('btn-pagar');
    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    if (metodo && btnPagar) {
        btnPagar.disabled = (metodo.value === "" || itensSalvos.length === 0);
    }
}

function carregarResumoPagamento() {
    const lista = document.getElementById('lista-resumo-pagamento');
    if (!lista) return; 

    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    lista.innerHTML = '';

    if (itensSalvos.length === 0) {
        lista.innerHTML = '<p style="text-align:center; color:#666; padding: 1rem;">Sua sacola está vazia.</p>';
        atualizarTotalPagamento();
        return;
    }

    itensSalvos.forEach(item => {
        const qtd = item.quantidade || 1;
        const totalItem = item.preco * qtd;
        
        lista.innerHTML += `
            <li class="item-resumo-mini">
                <div class="item-topo">
                    <img src="${item.imagem}" alt="${item.nome}" class="img-mini">
                    <div class="info-produto">
                        <span>${item.nome}</span>
                        <span>R$ ${totalItem.toFixed(2).replace('.', ',')}</span>
                    </div>
                </div>
                <div class="controles-acao">
                    <button type="button" class="btn-remover" onclick="removerDoCarrinho(${item.id})" title="Remover item">🗑️</button>
                    <div class="grupo-qtd">
                        <button type="button" class="btn-qtd" onclick="alterarQuantidade(${item.id}, -1)">-</button>
                        <span class="qtd-numero">${qtd}</span>
                        <button type="button" class="btn-qtd" onclick="alterarQuantidade(${item.id}, 1)">+</button>
                    </div>
                </div>
            </li>
        `;
    });
    atualizarTotalPagamento();
}

function processarPagamento(event) {
    event.preventDefault(); 
    localStorage.setItem('usaFidelidade', document.getElementById('fidelidade').checked);
    
    const btn = document.getElementById('btn-pagar');
    const msg = document.getElementById('mensagem-status');
    btn.disabled = true;
    btn.innerText = "Processando...";
    msg.style.color = "#ff6b00";
    msg.innerText = "Conectando ao sistema bancário...";

    setTimeout(() => window.location.href = 'sucesso.html', 3000);
}

function carregarResumoFinal() {
    const listaResumo = document.getElementById('lista-resumo');
    if (!listaResumo) return;

    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    let totalPago = 0;

    listaResumo.innerHTML = '';

    itensSalvos.forEach(item => {
        const qtd = item.quantidade || 1;
        const valorItem = item.preco * qtd;
        totalPago += valorItem;

        listaResumo.innerHTML += `
            <li class="item-recibo">
                <span class="nome-recibo">${qtd}x ${item.nome}</span>
                <strong class="preco-recibo">R$ ${valorItem.toFixed(2).replace('.', ',')}</strong>
            </li>
        `;
    });

    if (localStorage.getItem('usaFidelidade') === 'true') {
        listaResumo.innerHTML += `
            <li class="item-recibo desconto-recibo">
                <span class="nome-recibo">Desconto Fidelidade</span>
                <strong class="preco-recibo">- R$ 10,00</strong>
            </li>
        `;
        totalPago -= 10.00;
        if (totalPago < 0) totalPago = 0;
    }

    document.getElementById('total-resumo').innerText = `R$ ${totalPago.toFixed(2).replace('.', ',')}`;
    localStorage.removeItem('resumoPedido');
    localStorage.removeItem('usaFidelidade');
}

window.onload = () => {
    carregarCardapio();          
    carregarResumoPagamento();   
    carregarResumoFinal();       
};