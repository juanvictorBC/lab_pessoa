const apiUrl = 'http://localhost:8080/api/pessoas';

// Função para carregar pessoas e preencher a tabela
async function carregarPessoas() {
    const tabela = document.querySelector('#pessoasTable tbody');
    if (!tabela) return; // Se a tabela não existir, sai da função

    const response = await fetch(apiUrl);
    const pessoas = await response.json();
    tabela.innerHTML = ''; // Limpar a tabela

    pessoas.forEach(pessoa => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td><input type="text" value="${pessoa.id}" disabled></td>
            <td><input type="text" value="${pessoa.nome}" id="nome-${pessoa.id}" disabled></td>
            <td><input type="text" value="${pessoa.sobrenome}" id="sobrenome-${pessoa.id}" disabled></td>
            <td><input type="text" value="${pessoa.genero}" id="genero-${pessoa.id}" disabled></td>
            <td><input type="text" value="${pessoa.telefone}" id="telefone-${pessoa.id}" disabled></td>
            
            <td>
                <button onclick="editarPessoa(${pessoa.id})" id="editar-${pessoa.id}">Editar</button>
                <button class="deletar-btn" onclick="deletarPessoa(${pessoa.id})" id="deletar-${pessoa.id}">Deletar</button>
                <button class="cancelar-btn" onclick="cancelarEdicao(${pessoa.id})" id="cancelar-${pessoa.id}" style="display: none;">Cancelar</button>
                <button class="salvar-btn" onclick="salvarAlteracoes(${pessoa.id})" id="salvar-${pessoa.id}" style="display: none;">Salvar</button>
            </td>
        `;
        tabela.appendChild(tr);
    });
}


// Função para adicionar ou editar uma pessoa
function configurarFormulario() {
    const form = document.getElementById('pessoaForm');
    if (!form) return; // Se o formulário não existir, sai da função

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const id = document.getElementById('pessoaId').value;
        const nome = document.getElementById('nome').value;
        const sobrenome = document.getElementById('sobrenome').value;
        const genero = document.getElementById('genero').value;
        const telefone = document.getElementById('telefone').value;

        const pessoa = { nome, sobrenome, genero, telefone };

        const mensagemDiv = document.getElementById('mensagem');

        try {
            let response;
            if (id) {
                // Se há id, é edição
                response = await fetch(`${apiUrl}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pessoa),
                });
            } else {
                // Se não há id, é inserção
                response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(pessoa),
                });
            }

            // Verificar se a resposta foi bem-sucedida
            if (response.ok) {
                mensagemDiv.className = 'mensagem sucesso';
                mensagemDiv.innerText = 'Pessoa cadastrada com sucesso!';
            } else {
                throw new Error('Erro ao cadastrar a pessoa');
            }
        } catch (error) {
            mensagemDiv.className = 'mensagem erro';
            mensagemDiv.innerText = error.message || 'Erro desconhecido';
        }

        mensagemDiv.style.display = 'block'; // Exibir a mensagem

        // Ocultar a mensagem após 5 segundos
        setTimeout(() => {
            mensagemDiv.style.display = 'none';
        }, 3000);

        form.reset();
        document.getElementById('formTitle').innerText = 'Adicionar Pessoa';
        carregarPessoas();
    });
}

// Função para editar pessoa
async function editarPessoa(id) {
    const response = await fetch(`${apiUrl}/${id}`);
    const pessoa = await response.json();

    // Preencher os campos do formulário com os dados da pessoa
    document.getElementById('pessoaId').value = pessoa.id;
    document.getElementById('nome').value = pessoa.nome;
    document.getElementById('sobrenome').value = pessoa.sobrenome;
    document.getElementById('genero').value = pessoa.genero;
    document.getElementById('telefone').value = pessoa.telefone;
    
    // Exibir o título "Editar Pessoa"
    document.getElementById('formTitle').innerText = 'Editar Pessoa';

    // Mostrar o botão de salvar e esconder o de deletar
    document.querySelector('.deletar-btn').style.display = 'none'; 
    document.querySelector('.cancelar-btn').style.display = 'inline-block'; // Mostrar o botão de cancelamento
}

function editarPessoa(id) {
    document.getElementById(`nome-${id}`).disabled = false;
    document.getElementById(`sobrenome-${id}`).disabled = false;
    document.getElementById(`genero-${id}`).disabled = false;
    document.getElementById(`telefone-${id}`).disabled = false;

    document.getElementById(`editar-${id}`).style.display = 'none';
    document.getElementById(`deletar-${id}`).style.display = 'none';
    document.getElementById(`salvar-${id}`).style.display = 'inline-block';
    document.getElementById(`cancelar-${id}`).style.display = 'inline-block';
}

function cancelarEdicao(id) {
    const nomeField = document.getElementById(`nome-${id}`);
    const sobrenomeField = document.getElementById(`sobrenome-${id}`);
    const generoField = document.getElementById(`genero-${id}`);
    const telefoneField = document.getElementById(`telefone-${id}`);

    // Restaurar valores originais
    nomeField.value = nomeField.defaultValue;
    sobrenomeField.value = sobrenomeField.defaultValue;
    generoField.value = generoField.defaultValue;
    telefoneField.value = telefoneField.defaultValue;

    // Desativar os campos
    nomeField.disabled = true;
    sobrenomeField.disabled = true;
    generoField.disabled = true;
    telefoneField.disabled = true;

    // Restaurar os botões
    document.getElementById(`editar-${id}`).style.display = 'inline-block';
    document.getElementById(`deletar-${id}`).style.display = 'inline-block';
    document.getElementById(`salvar-${id}`).style.display = 'none';
    document.getElementById(`cancelar-${id}`).style.display = 'none';
}


// Função para deletar pessoa
async function deletarPessoa(id) {
    const confirmar = confirm('Você tem certeza de que deseja excluir esta pessoa?');
    if (confirmar) {
    await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
    } else {
        console.log('Exclusão cancelada')
    }

    carregarPessoas();
}

async function salvarAlteracoes(id) {
    const nome = document.getElementById(`nome-${id}`).value;
    const sobrenome = document.getElementById(`sobrenome-${id}`).value;
    const genero = document.getElementById(`genero-${id}`).value;
    const telefone = document.getElementById(`telefone-${id}`).value;

    const pessoaAtualizada = { nome, sobrenome, genero, telefone };

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pessoaAtualizada),
    });

    if (response.ok) {
        alert('Alterações salvas com sucesso!');
        carregarPessoas();
    } else {
        alert('Erro ao salvar alterações.');
    }
}

// Função para salvar a pessoa editada
async function salvarPessoa(id) {
    const nome = document.getElementById(`nome-${id}`).value;
    const sobrenome = document.getElementById(`sobrenome-${id}`).value;
    const genero = document.getElementById(`genero-${id}`).value;
    const telefone = document.getElementById(`telefone-${id}`).value;

    const pessoa = { nome, sobrenome, genero, telefone };

    const mensagemDiv = document.getElementById('mensagem'); // Mensagem de sucesso/erro

    try {
        // Enviar a atualização via API
        const response = await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pessoa),
        });

        // Verificar se a resposta foi bem-sucedida
        if (response.ok) {
            mensagemDiv.className = 'mensagem sucesso';
            mensagemDiv.innerText = 'Pessoa atualizada com sucesso!';
        } else {
            throw new Error('Erro ao atualizar a pessoa');
        }

    } catch (error) {
        mensagemDiv.className = 'mensagem erro';
        mensagemDiv.innerText = error.message || 'Erro desconhecido';
    }

    mensagemDiv.style.display = 'block'; // Exibir a mensagem

    // Ocultar a mensagem após 5 segundos
    setTimeout(() => {
        mensagemDiv.style.display = 'none';
    }, 5000);
}
    // Recarregar a lista de pessoas
    carregarPessoas();

// Inicializar funcionalidades dependendo da página
document.addEventListener('DOMContentLoaded', () => {
    configurarFormulario();
    carregarPessoas();
});
