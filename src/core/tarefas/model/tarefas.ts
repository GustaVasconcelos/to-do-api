interface Tarefas {
    id?: string,
    idUsuario: string,
    nome: string,
    descricao: string,
    prioridade: string,
    statusConclusao?: boolean
}

export default Tarefas;

