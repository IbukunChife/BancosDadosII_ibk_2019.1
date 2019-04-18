
// 1)  Execute uma query (utilizando mapReduce()) que crie uma coleção nova chamada “total-por-estado” contendo somente as informações da sigla do estado e o total gasto por estado

let mapear = function() {emit(this.UF,this.ValorBeneficio);};
let reduzir = function(name,ValorBeneficio) {return Array.sum(ValorBeneficio);};

db.bolsa.mapReduce(
    mapear,
    reduzir,
    {out: "TotalEstado"}
);

// 2) Execute uma query (utilizando mapReduce()) que crie uma coleção nova chamada “n-por-estado” contendo somente as informações da sigla do estado e o numero total de beneficiados por estado
db.runCommand( {
    mapReduce: "bolsa",
    map: function(){
         emit( this.UF, 1 );
    },
    reduce: function(author, counters){
        count = 0;
        for (let index = 0; index < counters.length; ++index) {
            count += counters[index];
        }
        return count;
    },
    out: { replace: "NPorEstado" }
} );

// 3) Execute uma query (utilizando mapReduce()) que crie uma coleção nova chamada “n-boavista-rr” mostrando quantas pessoas recebem o beneficio na cidade de Boa Vista estado de RR.
db.runCommand( {
    mapReduce: "bolsa",
    map: function(){
         emit( this.UF, 1 );
    },
    reduce: function(author, counters){
        count = 0;
        for (let index = 0; index < counters.length; ++index) {
            count += counters[index];
        }
        return count;
    },
    
        query:{UF:"RR"},
        out: "NBoaVistaRR"
    
} );