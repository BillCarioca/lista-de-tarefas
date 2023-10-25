
const listaTarefas = []

function criarNovaTarefa(titulo, descricao){
    // Adiciona uma nova tarefa na lista de tarefas
    if (titulo!=""&&descricao!=""){
        const tarefa = new Tarefa(titulo, descricao);
        listaTarefas.push(tarefa)
        return tarefa 
    }else {
        throw new ReferenceError("Campos título e descrição não podem ser vazios!")
    }
    
}
    
function buscarPorId(id){
    // Busca uma tarefa especifica a partir do ID passado por parâmetro
    if (listaTarefas.some(tarefa => tarefa.id === id)){
        return listaTarefas.find(tarefa => tarefa.id === id)
    }else {
        throw new ReferenceError("Tarefa não encontrada!")
    }
}

function buscarTodos(){
    return listaTarefas
}

function editarTarefa(id, novoTitulo, novaDescricao){
    // Permite alterar uma determinada tarefa com base no ID passado por parâmetro

    const index = listaTarefas.indexOf(buscarPorId(id))
    if (index!=-1) {

        if (novoTitulo !== "" || novoTitulo !== null){
            listaTarefas[index].titulo=novoTitulo
        }
        if (novaDescricao !== "" || novaDescricao !== null){
            listaTarefas[index].descricao=novaDescricao
        }   
    }
}

function editarStatusTarefa(id){
    const index = listaTarefas.indexOf(buscarPorId(id))
    if(index!=-1){
        listaTarefas[index].estaCompleta = !listaTarefas[index].estaCompleta
    }else{
        alert("Tarefa não encontrada!")
    }
}

function excluirTarefa (id){
    // Exclui uma tarefa da lista a partir de um ID passado. 
    // Por conta dos ids começarem a partir do número um e ele reomver pelo índice (começa no zero), é feita a subtração do id - 1
    const index = listaTarefas.indexOf(buscarPorId(id))
    if (index!=-1) {
        listaTarefas.splice(index, 1)
    }else{
        throw new ReferenceError("Não foi possível excluir a tarefa pois ela não existe!")
    } 
}

function excluirTodasTarefas(){
    if (listaTarefas.length === 0){
        throw new Error("Não é possível excluir todas as tarefas pois não existem tarefas!")
    }else{
        listaTarefas.splice(0, listaTarefas.length)
    }
    
}

function exibirTarefas(){
    // Exibe todas as tarefas dentro da lista
    listaTarefas.forEach(tarefa => {
        console.log(tarefa)
    });
}
