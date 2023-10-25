const state = {
    novaTarefa:{
        titulo:document.getElementById("title-add"),
        descricao:document.getElementById("description-add")
    },
    tabela:{
        tarefas: document.getElementById("tabela-tarefas")
    },
    action:{
        buttonAdd:document.getElementById("button-add"),
        buttonRemoveAll:document.getElementById("remove-all"),
        filterLabel:document.getElementById("label__filter"),
        menuFilter:document.getElementById("menu__filter"),
    }

}

async function showMenu(){
    state.action.filterLabel.classList.add("oculto")
    state.action.menuFilter.classList.remove("oculto")

}
async function hideMenu(){
    state.action.filterLabel.classList.remove("oculto")
    state.action.menuFilter.classList.add("oculto")
}

function adicionarTarefa(){
    // cria a nova tarefa e adiciona a lista de tarefas
    const tarefa = criarNovaTarefa(state.novaTarefa.titulo.value,state.novaTarefa.descricao.value)
    // limpa os campos de input
    state.novaTarefa.titulo.value = ""
    state.novaTarefa.descricao.value = ""
    // cria uma linha com a tarefa criada
    criarLinhaNaTabela(tarefa)
}

function removerTodasTarefas(){
    // apaga todas as tarefas da lista e apaga todas a linha da tabela
    excluirTodasTarefas()
    state.tabela.tarefas.innerHTML=""

}

function habilitarTarefa(id){
    const editId = "editar_"+id
    const saveId = "salvar_"+id
    const titleId = "title_"+id
    const descriptionId = "description_"+id
    // exibe o botão Salvar e Ocuta o botão Editar
    const buttonEditar = document.getElementById(editId)
    const buttonSalvar = document.getElementById(saveId)
    buttonEditar.classList.add("oculto")
    buttonSalvar.classList.remove("oculto")
    // habilita a edição nas celulas de titulo e descrição na linha da tabela
    const celulaTitle = document.getElementById(titleId)
    const celulaDescription = document.getElementById(descriptionId)
    celulaTitle.setAttribute("contenteditable", "true")
    celulaDescription.setAttribute("contenteditable", "true")
}

function salvarTarefa(id){
    const editId = "editar_"+id
    const saveId = "salvar_"+id
    const titleId = "title_"+id
    const descriptionId = "description_"+id
    // exibe o botão Editar e Ocuta o botão Salvar
    const buttonEditar = document.getElementById(editId)
    const buttonSalvar = document.getElementById(saveId)
    buttonEditar.classList.remove("oculto")
    buttonSalvar.classList.add("oculto")
    // desabilita a edição nas celulas de titulo e descrição na linha da tabela
    const celulaTitle = document.getElementById(titleId)
    const celulaDescription = document.getElementById(descriptionId)
    celulaTitle.setAttribute("contenteditable", "false")
    celulaDescription.setAttribute("contenteditable", "false")
    // realida a atualização na lista de tarefas
    editarTarefa(id,celulaTitle.innerText,celulaDescription.innerText)
}

function deletarTarefa(id){
    // remove a linha da tabela
    let linhaParaDeletar = document.getElementById(id)
    linhaParaDeletar.remove()
    // remove a tarefa da lista de tarefas
    excluirTarefa(id)
}

async function filtrarTabela(filter){
    // filtra a lista de tarefa antes de criar uma nova tabela
    state.tabela.tarefas.innerHTML=""
    hideMenu()
    switch(filter){
        case 'all':{
            listarTarefas(buscarTodos())
            break
        }
        case 'pending':{
            listarTarefas(buscarTodos().filter(t=>t.estaCompleta==false))
            break
        }
        case 'completed':{
            listarTarefas(buscarTodos().filter(t=>t.estaCompleta==true))
            break
        }
    }
}

function listarTarefas(lista){
    // criar uma linha na tabela para cada tarefa na lista de tarefas
    if (lista!=[]){
        lista.forEach(tarefa=>criarLinhaNaTabela(tarefa))
    }
}

function criarLinhaNaTabela(tarefa){
    const editId = "editar_"+tarefa.id
    const saveId = "salvar_"+tarefa.id
    const statusId = "status_"+tarefa.id
    const titleId = "title_"+tarefa.id
    const descriptionId = "description_"+tarefa.id
    // cria uma linha na tabela com o id da tarefa
    const linha = document.createElement("tr")
    linha.setAttribute("id", tarefa.id)
    linha.setAttribute("class","linha")
    const status = tarefa.estaCompleta?"checked":""
    // cria cada celula da linhas com os campos da tarefa com o id da tarefa no final de cada id da celula 
    linha.innerHTML = ` <td id = "${statusId}"> <input type="checkbox" onclick="editarStatusTarefa(${tarefa.id})" ${status}></td>
                        <td id = "${titleId}">${tarefa.titulo}</td>
                        <td id = "${descriptionId}">${tarefa.descricao}</td>
                        <td>
                        <button onclick="habilitarTarefa(${tarefa.id})" id= "${editId}" class = "editar"> Editar </button>
                        <button onclick="salvarTarefa(${tarefa.id})" id= "${saveId}" class = "salvar oculto"> Salvar </button>
                        <button onclick="deletarTarefa(${tarefa.id})" class = "remover">Remover</button>
                        </td>`
    // adiciona a linha criada na tabela
    state.tabela.tarefas.appendChild(linha)
}




function init(){
    listarTarefas(buscarTodos())
}

init()