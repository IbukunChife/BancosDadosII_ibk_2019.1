/*INSERINDO OS ALUNOS NO BANCO DE DADO*/
db.alunos.insertMany([
    {matricula : 001, nome: "Didier", email:"didier@email.com", curso : "Ciencia da Computação"},
    {matricula : 002, nome: "Roger", email:"roger@email.com", curso : "Administração"},
    {matricula : 003, nome: "Amaury", email:"amaury@email.com", curso : "Agronomia"},
    {matricula : 004, nome: "Arthur", email:"arthur@email.com", curso : "Jornalismo"},
    {matricula : 005, nome: "Victor", email:"victor@email.com", curso : "Biologia"}

])

/*INSERINDO OS LIVROS NO BANCO DE DADO */
db.livros.insertMany([
    { titulo: " La fontaine ", autor : "Victor Hugo" },
    { titulo: " Le Contrat Social ", autor : "Jean Jacque Rousseau" },
    { titulo: " Le Dilemme ", autor : "serpos Tijani" },
    { titulo: " L'arbre fétiche ", autor : "Jean Pliya" },
    { titulo: " L'enfant noir ", autor : "Camara Laye" }
])

/*EMPRESTADO UM DETERMINADO LIVRO */
db.livros.updateOne(
    {titulo: " La fontaine "}, 
    {$set: 
        {
            "emprestimo" : 
            { 
                matricula_aluno : "005",
                periodoEmprestado : "",
                periodoDevolução : "",
                atraso : 0,
                multa : 0 
            }
        }
    }
)

/*IMPRIMINDO OS LIVROS EMPRESTADOS */
db.livros.find(
    {emprestimo :{ $exists : true} },
    {"emprestimo.matricula_aluno" : 1 , _id : 0}
)