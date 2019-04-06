load("/home/Ibk_Akaigen/Dropbox/Sexto\ Semestres/Banco\ De\ Dados\ II/Aulas/movies.js")

/* a) Quantos filmes foram dirigidos pelo diretor Stanley Kubrick?*/
db.movies.find({ director: "Standey Kubrick"}).count()

Resultado : 0;
/* b) Quantos filmes foram dirigidos pelos diretores Stanley Kubrick ou Sergio Leone? */
db.movies.find({ $or : [{director:"Standey Kubrick"},{ director: "Sergio Leone"}] }).count() 
db.movies.find({ director: { $in :[ "Standey Kubrick", "Sergio Leone"]} }).count() 

/*c) Quantos são os filmes publicados em 1991 e que possuem o gênero de comédia? */
db.movies.find({ $and : [{year:1991 }, {genres: "Comedy"}] }).count()

/* d) Quantos são os filmes publicados em 1991 e que possuem o gênero de comédia como o seu principal (listado na
    primeira posição do vetor de gêneros)*/
db.movies.find({ $and : [{year:1991 }, {"genres.0": "Comedy"}] }).count()

/* e) Qual o nome do filme que possui o maior tempo de execução dentre os publicados em 1991 e que possuem o
gênero de comédia como o seu principal (listado na primeira posição do vetor de gêneros)? */
db.movies.find({ $and : [{year:1991 }, {"genres.0": "Comedy"}]},{title: 1, _id:0}).sort({runtime: -1}).limit(1)

/* f) Quantos filmes foram publicados na década de 1990 ? */
db.movies.find({ year : 1990}).count()

/* g) Quais filmes foram publicados na década de 1990 e possuem nota do IMDb maior que 8.5? Ordene pelo título do
filme de forma crescente. */
db.movies.find( { $and : [{ year : 1990} , {"imdb.rating" : { $gt : 8.5 }} ]}, {title:1, _id:0} ).sort({title:1})

/* h) Dentre todos os filmes da coleção, quem foi o diretor do filme brasileiro que mais ganhou prêmios? */
db.movies.find({ "countries": "Brazil"},{ director : 1,_id : 0 }).sort({"awards.wins":-1})

/* i) Atualize o número de prêmios do filme de título Brazilian Western, para 8 prêmios. Também atualizar o texto
localizado no campo awards.text. */
db.movies.updateOne(
    {title: "Brazilian Western"},
    {$set :
        {
            "awards.wins" : 8,
            "awards.text": " 8 wins & 6 nominations"
        }
    }

)

/* j) Remova o campo poster de todos os filmes italianos. */
db.movies.updateMany(
    {countries: "Italy"},
    { $unset: { poster: ""} }
 )

/* k) Retire o gênero drama da lista de gêneros do filme de título Bound for Glory. */
db.movies.updateOne(
    {title:"Bound for Glory"},
    { $unset : {"genres.1": ""}}
)

/* l) Remova todos os filmes do ano 1968 e 1975. */
db.movies.remove({ $or:[{year : 1968 },{ year : 1975 }] })

/* m) Liste todos os títulos, ordenados por nome de forma crescente, que não possuem os gêneros ação, família e
aventura. */
db.movies.find({
    genres : { $nin : ["Action","Family","Adventure" ]  } 
}, {title:1,_id:0}).sort({title:1})

/* n) Quais filmes possuem apenas os gêneros comédia e crime, estando comédia na primeira posição do vetor de
gêneros ? */
 db.movies.find({ genres: ["comedy","Crime"]})