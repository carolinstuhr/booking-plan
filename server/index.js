import express from 'express'
import bodyParser from 'body-parser'
import api from './api'
import cors from 'cors'

const server = express()
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cors())
server.use('/', api)
server.listen(8080)
