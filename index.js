import express from "express"
import mysql2 from "mysql2"
import cors from "cors"

const app = express()


app.use(cors())
app.use(express.json())


const sql = mysql2.createPool({
    host: "benserverplex.ddns.net",
    user: "aluno_projetos",
    password: "aluno@projeto",
    database: "alunos_filmes03TB"
})


app.get("/", (request, response) => {
    const selectCommand = "SELECT * FROM filmes_RomuloFabricio"

    sql.query(selectCommand, (error, data) => {
        if (error) {
            console.log(error)
            return
        }

        response.json(data)
    })
})

app.post("/movies", (request, response) => {
    const { title, genre, duration, age_rating } = request.body

    const insertCommand = "INSERT INTO filmes_RomuloFabricio(title,genre,duration,age_rating) VALUES (?,?,?,?)"

    sql.query(insertCommand, [title, genre, duration, age_rating], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao cadastrar filme" })
        }

        response.status(201).json({
            message: "Filme cadastrado com sucesso!"
        })
    })
})

app.delete("/movies/:id", (request, response) => {
    const { id } = request.params

    const deleteCommand = "DELETE FROM filmes_RomuloFabricio WHERE id=?"

    sql.query(deleteCommand, [id], (error) => {
        if (error) {
            console.log(error)
            return response.status(500).json({ error: "Erro ao deletar filme" })
        }

        response.json({
            message: "Filme removido com sucesso!"
        })
    })
})


app.listen(3067, () => {
    console.log("Servidor rodando na porta 3067")
})