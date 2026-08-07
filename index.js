import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()

app.get("/", (request, response) => {
    response.json({
        message:"API de Filmes funcionando!"
    })
})

app.listen(3067,()=>{
    console.log("Servidor rodando na porta 3067")
})

app.post("/movies", (request, response) => {
    const { title, genre, duration, age_rating } = request.body

    const insertCommand= "INSERT INTO filmes_RomuloFabricio(title,genre,duration,age_rating) VALUES (?,?,?,?)";

    sql.query(insertCommand, [title,genre,duration,age_rating], (error) => {
            if(error) {
                console.log(error)
                return
            }

            response.status(201).json({
                message:"Filme cadastrado com sucesso!"
            })

        })

})

app.delete("/movies/:id", (request, response) => {
    const {id} = request.params

    const deleteCommand = "DELETE FROM filmes_RomuloFabricio WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if(error) {
            console.log(error)
            return
        }

        response.json({
            message:"Filme removido com sucesso!"
        })
    })
})

app.use(cors())
app.use(express.json())

app.get("/movies", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_RomuloFabricio"

    sql.query(selectCommand, (error, data) => {
        if(error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "alunos_filmes03TB"
})