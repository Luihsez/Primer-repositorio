const express = require("express")
const cors = require("cors")
const app = express();

const jugadores = []

class Jugador {
    constructor(id) {
        this.id = id
    }
    
    asignarCharacter(character){
        this.character = character
    }

    actualizarPosicion(x, y){
        this.x = x
        this.y = y
    }

    asignarAtaques(ataques){
        this.ataques = ataques
    }
}

class Character {
    constructor(nombre){
        this.nombre = nombre
    }
}

app.use(express.static('public'))
app.use(cors())
app.use(express.json())

app.get("/unirse", (req, res) => {
    const id = `${Math.random()}`

    const jugador = new Jugador(id)

    jugadores.push(jugador)

    res.setHeader("Access-Control-Allow-Origin", "*")

    res.send (id)
})

app.post("/character/:jugadorId", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const nombre = req.body.character || ""
    const character = new Character(nombre)
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarCharacter(character)
    }

    console.log(jugadores)
    console.log(jugadorId)
    res.end()
})

app.post("/character/:jugadorId/posicion", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const x = req.body.x || 0
    const y = req.body.y || 0

    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if (jugadorIndex >= 0) {
        jugadores[jugadorIndex].actualizarPosicion(x, y)
    }

    const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id)

    res.send({
        enemigos
    })
})

app.post("/character/:jugadorId/ataques", (req, res) => {
    const jugadorId = req.params.jugadorId || ""
    const ataques = req.body.ataques || []
    
    const jugadorIndex = jugadores.findIndex((jugador) => jugadorId === jugador.id)

    if(jugadorIndex >= 0) {
        jugadores[jugadorIndex].asignarAtaques(ataques)

    }
    console.log(ataques)

    res.end()
})

app.get("/character/:jugadorId/ataques", (req, res) =>{
    const jugadorId = req.params.jugadorId || ""
    const jugador = jugadores.find((jugador) => jugador.id === jugadorId)

    res.send({
        ataques: jugador.ataques || []
    })
})

app.listen(9090,() => {
    console.log('Servidor funcionando')
})