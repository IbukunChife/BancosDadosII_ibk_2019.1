/**RESOLUÇÂO DO EXERCICIO ****************
 * SOBRE AGGREGATION EM MONGODB***********
 * NA MATERIA DE BANCO DE DADOS II********
 * DO PROFESSOR ACAUAN RIBEIRO ***********
 * ***************************************
 * ALUNO: IBUKUN CHIFE DIDIER ADJITCHE****
 * ***************************************
 *  **************************************/

 
// 1) Liste todos os funcionários que trabalham na empresa 4Linux:
db.funcionarios.find({empresa: "4Linux"}).pretty()

// 2) Fazer uma consulta que mostre a empresa e o numero de funcionários que trabalha em cada empresa.
db.funcionarios.aggregate([
    { $group : {
        _id:"$empresa",
        nºfuncionario: { $sum: 1 }
    }}
]).pretty()

// 3)  Utilizando $match e $count retorne o numero de funcionários da empresa UFRR
db.funcionarios.aggregate([
    {$match : {empresa :"UFRR"}}
]).itcount()

// 4) Elabore uma consulta que traga somente o nome e o cargo dos funcionários que trabalham na empresa Byte:
db.funcionarios.aggregate([
    {$match : {empresa :"Byte"}},
    {$project :{ _id: 0, nome: 1 , cargo:1} }
]).pretty()

// 5) Faça uma consulta que retorne quantos funcionários existem por cargo na empresa UFRR, listando seus salários mínimo, máximo e médio:
db.funcionarios.aggregate([
    {$match : {empresa :"UFRR"}},
    {$group :{ 
        _id:"$cargo", 
        Total :{$sum :1},
        "salario mínimo" : {$min : "$salario"},
        "salario maximo" : {$max : "$salario"},
        "salario médio" : {$avg : "$salario"}
        }
    },
    {$project : { 
        Total:1 , "salario mínimo" : 1 ,"salario maximo" : 1 , "salario médio" : 1}
    }
]).pretty()

// 6) Fazer uma consulta que retorne o nome, sobrenome, empresa e data do desligamento dos funcionários que foram demitidos. 
db.funcionarios.aggregate([
    {$match: {"contrato.fim":{$ne : ""}}},
    {$project : {
       _id: 0, nome : 1 , sobrenome:1, empresa: 1, "data-desligamento":{$toDate:"$contrato.fim"}
    }}
]).pretty()

// 7) Listar o nome, cargo, data de inicio, data atual e tempo de serviço (em meses completos) dos funcionários que não tiveram o contrato encerrado
db.funcionarios.aggregate([
    {$match: {"contrato.fim":{$eq : ""}}},     
    {$project : {
        _id: 0,
        nome : 1,
        cargo : 1,
        "data de inicio": {$toDate:"$contrato.inicio"} ,
        "data atual": new Date(),
        "tempo de Serviço":{$toInt: {$divide: [{$subtract:[new Date(), "$contrato.inicio"]},1000*60*60*24*30]} }     
        }
    } 
]).pretty()

//** DESAFIO **
//8) Adicione a coleção de documentos “projetos” ao banco de dados “ti”:
//8.1) Listar os nomes, sobrenomes e cod dos funcionários que trabalham no projeto "p001". Fazer isso usando uma única consulta com aggregate()
db.projetos.aggregate([
    {
        $lookup:
        {
            from:"funcionarios",
            localField: "codFunc",
            foreignField: "cod",
            as: "projetos"
        }
    },
    {
        $match : {codProj: "p001"}
    },
    {$project :
        {
            _id : 0,
            codFunc : 1,
            "projetos.nome" : 1,
            "projetos.sobrenome" : 1
        }
    }
]).pretty()
