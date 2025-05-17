const { contextBridge } = require('electron');
const fs = require('fs');
const path = require('path');

const caminhoArquivo = path.join(__dirname, '..', 'database', 'gastos.json');


const lerGastos = () => {
    if (!fs.existsSync(caminhoArquivo)) return [];
    const dados = fs.readFileSync(caminhoArquivo);
    return JSON.parse(dados);
}

const lerCategorias = () => {
    const categorias = fs.readFileSync(caminhoArquivo)
    console.log(categorias)
}
lerCategorias()
const salvarGastos = (gastos) => {
    try {
        const dir = path.dirname(caminhoArquivo);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(caminhoArquivo, JSON.stringify(gastos, null, 2));
    } catch (error) {
        console.error('Erro ao salvar gastos:', error);
    }
}




contextBridge.exposeInMainWorld('gastosAPI', {
    obter: lerGastos,
    salvar: salvarGastos
});
