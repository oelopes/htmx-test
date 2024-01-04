import express from 'express'

const app = express()

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json)

app.listen(3000, () => console.log("Server running on 3000"))