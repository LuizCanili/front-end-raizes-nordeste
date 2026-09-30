const produtos = [
    { id: 1, nome: "Tapioca de Carne de Sol", categoria: "lanches", descricao: "Queijo coalho e manteiga da terra.", preco: 22.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Tapioca" },
    { id: 2, nome: "Cuscuz Recheado", categoria: "lanches", descricao: "Acompanha charque e ovo frito.", preco: 18.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Cuscuz" },
    { id: 3, nome: "Acarajé Tradicional", categoria: "lanches", descricao: "Vatapá, caruru, camarão seco e vinagrete.", preco: 25.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Acaraje" },
    { id: 4, nome: "Pastel de Vento com Caldo", categoria: "lanches", descricao: "Pastel gigante com caldo de cana.", preco: 15.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Pastel" },
    { id: 5, nome: "Esfirra de Carne de Sol", categoria: "lanches", descricao: "Massa leve com recheio nordestino.", preco: 8.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Esfirra" },
    { id: 6, nome: "Sanduíche de Pernil", categoria: "lanches", descricao: "Pão francês, pernil desfiado e queijo.", preco: 20.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Pernil" },
    { id: 7, nome: "Tapioca de Frango", categoria: "lanches", descricao: "Frango desfiado com catupiry.", preco: 19.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Tapioca+Frango" },
    { id: 8, nome: "Baião de Dois Mini", categoria: "lanches", descricao: "Porção individual com queijo coalho.", preco: 28.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Baiao" },
    
    { id: 9, nome: "Suco de Cajá", categoria: "bebidas", descricao: "500ml - Natural e refrescante.", preco: 9.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Caja" },
    { id: 10, nome: "Suco de Umbu", categoria: "bebidas", descricao: "500ml - Polpa natural.", preco: 9.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Umbu" },
    { id: 11, nome: "Guaraná Jesus", categoria: "bebidas", descricao: "Lata 350ml.", preco: 7.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Guarana+Jesus" },
    { id: 12, nome: "Caldo de Cana", categoria: "bebidas", descricao: "Copo 500ml gelado.", preco: 8.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Caldo+Cana" },
    { id: 13, nome: "Água de Coco", categoria: "bebidas", descricao: "Copo 400ml natural.", preco: 6.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Agua+Coco" },
    { id: 14, nome: "Suco de Graviola", categoria: "bebidas", descricao: "500ml com leite ou água.", preco: 10.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Graviola" },
    { id: 15, nome: "Cajuína", categoria: "bebidas", descricao: "Garrafa 500ml tradicional.", preco: 8.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Cajuina" },
    { id: 16, nome: "Refrigerante Cola", categoria: "bebidas", descricao: "Lata 350ml.", preco: 6.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Refri" },
    
    { id: 17, nome: "Bolo de Macaxeira", categoria: "sobremesas", descricao: "Fatia generosa servida quente.", preco: 12.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Bolo" },
    { id: 18, nome: "Cartola", categoria: "sobremesas", descricao: "Banana frita, queijo manteiga, canela e açúcar.", preco: 16.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Cartola" },
    { id: 19, nome: "Cocada Branca", categoria: "sobremesas", descricao: "Feita com coco fresco.", preco: 6.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Cocada" },
    { id: 20, nome: "Cocada Queimada", categoria: "sobremesas", descricao: "Tradicional e crocante.", preco: 6.50, imagem: "https://placehold.co/250x150/ff6b00/white?text=Cocada" },
    { id: 21, nome: "Pudim de Leite", categoria: "sobremesas", descricao: "Fatia com calda de caramelo.", preco: 14.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Pudim" },
    { id: 22, nome: "Tapioca Doce", categoria: "sobremesas", descricao: "Recheada com coco e leite condensado.", preco: 18.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Tapioca+Doce" },
    { id: 23, nome: "Sorvete de Tapioca", categoria: "sobremesas", descricao: "Duas bolas refrescantes.", preco: 12.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Sorvete" },
    { id: 24, nome: "Queijo Coalho com Mel", categoria: "sobremesas", descricao: "Espeto grelhado coberto com melaço.", preco: 15.00, imagem: "https://placehold.co/250x150/ff6b00/white?text=Queijo+Coalho" }
];

let carrinho = JSON.parse(localStorage.getItem('resumoPedido')) || [];

// === TELA 1: LOGIN E VALIDAÇÃO ===
function validarLogin() {
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;
    const lgpd = document.getElementById('lgpd').checked;
    const btnLogin = document.getElementById('btn-login');

    if (cpf.trim().length > 0 && email.includes('@') && lgpd) {
        btnLogin.disabled = false;
    } else {
        btnLogin.disabled = true;
    }
}

function iniciarPedido(event) {
    event.preventDefault();
    localStorage.removeItem('resumoPedido');
    localStorage.removeItem('usaFidelidade');
    window.location.href = 'unidade.html';
}

// === TELA 3: CARDÁPIO ===
function carregarCardapio(categoria = 'todos') {
    const grade = document.getElementById('grade-produtos');
    if (!grade) return; 

    grade.innerHTML = ''; 
    const produtosFiltrados = categoria === 'todos' ? produtos : produtos.filter(p => p.categoria === categoria);

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
    const produto = produtos.find(p => p.id === idProduto);
    carrinho.push(produto);
    atualizarTotalCarrinho();
}

function atualizarTotalCarrinho() {
    const valorTotal = carrinho.reduce((total, item) => total + item.preco, 0);
    const textoTotal = document.getElementById('valor-total');
    const btnFinalizar = document.getElementById('btn-finalizar');
    
    if (textoTotal) {
        textoTotal.innerText = `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
    
    if (btnFinalizar) {
        btnFinalizar.disabled = carrinho.length === 0;
    }

    localStorage.setItem('resumoPedido', JSON.stringify(carrinho));
}

// === TELA 4: PAGAMENTO E FIDELIDADE ===
function validarPagamento() {
    const metodo = document.getElementById('metodo-pagamento').value;
    const btnPagar = document.getElementById('btn-pagar');
    btnPagar.disabled = (metodo === "");
}

function atualizarTotalPagamento() {
    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    let totalPago = itensSalvos.reduce((total, item) => total + item.preco, 0);
    
    const fidelidadeCheckbox = document.getElementById('fidelidade');
    if (fidelidadeCheckbox && fidelidadeCheckbox.checked) {
        totalPago -= 10.00;
        if (totalPago < 0) totalPago = 0; // Impede que o total fique negativo
    }

    const elementoTotal = document.getElementById('total-pagamento');
    if (elementoTotal) {
        elementoTotal.innerText = `R$ ${totalPago.toFixed(2).replace('.', ',')}`;
    }
}

function carregarResumoPagamento() {
    const listaPagamento = document.getElementById('lista-resumo-pagamento');
    if (!listaPagamento) return; 

    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    listaPagamento.innerHTML = '';

    if (itensSalvos.length === 0) {
        listaPagamento.innerHTML = '<p style="text-align:center; color:#666;">Seu carrinho está vazio.</p>';
        document.getElementById('metodo-pagamento').disabled = true;
        return;
    }

    itensSalvos.forEach(item => {
        listaPagamento.innerHTML += `
            <li class="item-resumo-mini">
                <img src="${item.imagem}" alt="${item.nome}" class="img-mini">
                <div class="detalhes-mini">
                    <span>1x ${item.nome}</span>
                    <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong>
                </div>
            </li>
        `;
    });

    atualizarTotalPagamento(); // Calcula o total ao carregar a tela
}

function processarPagamento(event) {
    event.preventDefault(); 
    
    // Salva na memória se a fidelidade foi usada para aplicar o desconto na tela de sucesso
    const usaFidelidade = document.getElementById('fidelidade').checked;
    localStorage.setItem('usaFidelidade', usaFidelidade);
    
    const btnPagar = document.getElementById('btn-pagar');
    const mensagem = document.getElementById('mensagem-status');

    btnPagar.disabled = true;
    btnPagar.innerText = "Processando...";
    mensagem.style.color = "#ff6b00";
    mensagem.innerText = "Conectando ao sistema bancário...";

    setTimeout(() => {
        window.location.href = 'sucesso.html';
    }, 3000);
}

// === TELA 5: SUCESSO ===
function carregarResumoFinal() {
    const listaResumo = document.getElementById('lista-resumo');
    if (!listaResumo) return;

    const itensSalvos = JSON.parse(localStorage.getItem('resumoPedido')) || [];
    let totalPago = 0;

    itensSalvos.forEach(item => {
        totalPago += item.preco;
        listaResumo.innerHTML += `<li>1x ${item.nome} - <strong>R$ ${item.preco.toFixed(2).replace('.', ',')}</strong></li>`;
    });

    // Aplica o desconto visualmente no recibo
    const usaFidelidade = localStorage.getItem('usaFidelidade') === 'true';
    if (usaFidelidade) {
        listaResumo.innerHTML += `<li style="color: #ff6b00; margin-top: 0.5rem;">Desconto de Fidelidade <strong>- R$ 10,00</strong></li>`;
        totalPago -= 10.00;
        if (totalPago < 0) totalPago = 0;
    }

    document.getElementById('total-resumo').innerText = `R$ ${totalPago.toFixed(2).replace('.', ',')}`;
    
    // Limpa a memória
    localStorage.removeItem('resumoPedido');
    localStorage.removeItem('usaFidelidade');
}

window.onload = () => {
    carregarCardapio();          
    carregarResumoPagamento();   
    carregarResumoFinal();       
};