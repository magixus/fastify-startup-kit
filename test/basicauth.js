import axios from 'axios'
const fastify = require('fastify')({ logger: true })



const url = "http://localhost:3000/"
const username = "oussama"
const password = "rootinfo"

const get = async (url) => axios.get(url, { auth: { username, password }})
const post = async (url, data) => axios.post(url, { data, auth: { username, password }})
const put = async (url, data) => axios.put(url, { data, auth: { username, password }})
const deleter = async (url, data) => axios.delete(url, {data, auth: { username, password }})
const patch = async (url, data) => axios.patch(url, {data, auth: { username, password }})

get(url)
  .then(({ data }) => {
    console.log(data)
  })
  .catch((err) => {
    console.error(err)
  })