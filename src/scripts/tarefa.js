class Tarefa {
    static ultimoId = 0

    constructor(titulo, descricao) {
        this.id = Tarefa.ultimoId + 1
        this.titulo = titulo;
        this.descricao = descricao;
        this.estaCompleta = false

        Tarefa.ultimoId = this.id
    }
}