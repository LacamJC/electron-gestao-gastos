const carregarGastos = () => {
    const gastos = window.gastosAPI.obter();
    const corpo = document.querySelector('#tabelaGastos tbody');
    corpo.innerHTML = '';
    let total = 0;

    gastos.forEach((gasto, i) => {
        total += gasto.valor;

        const linha = `
            <tr>
                <td>${gasto.categoria}</td>
                <td>${gasto.descricao}</td>
                <td>R$: ${gasto.valor.toFixed(2)}</td>
                <td>${gasto.data}</td>
                <td><button class="btn btn-danger btn-sm" onclick="removerGasto(${i})">Excluir</button></td>
            </tr>
        `;

        corpo.innerHTML += linha;
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

const gerarId = (gastos) => gastos.length ? Math.max(...gastos.map(g => g.id || 0)) + 1 : 1;

const adicionarGasto = () => {
    const categoria = document.getElementById('categoria').value;
    const descricao = document.getElementById('descricao').value;
    const valor = parseFloat(document.getElementById('valor').value);
    const data = document.getElementById('data').value;
    console.log(window.gastosAPI);
    if (!descricao || isNaN(valor) || !data) return alert('Preencha todos os campos');

    const gastos = window.gastosAPI.obter();
    gastos.push({ id: gerarId(gastos), categoria, descricao, valor, data });
    window.gastosAPI.salvar(gastos);
    carregarGastos();

    window.href= 'index.html';
}

function removerGasto(indice) {
    const gastos = window.gastosAPI.obter();
    gastos.splice(indice, 1);
    window.gastosAPI.salvar(gastos);
    carregarGastos();
}

window.onload = carregarGastos;
