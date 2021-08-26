const express = require('express')
const router = express.Router()

const mediastore = require('../aws/elemental/mediastore')

router.post('/containers', (req, res, next) => {
  const { name } = req.body

  const params = {
    "ContainerName": name
  }

  mediastore.createContainer(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/containers', (req, res, next) => {
  const params = {}

  mediastore.listContainers(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/containers/:name', (req, res, next) => {
  const { name } = req.params

  const params = {
    "ContainerName": name
  }

  mediastore.describeContainer(params, function(err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/containers/:name', (req, res, next) => {
  const { name } = req.params

  const params = {
    "ContainerName": name
  }

  mediastore.deleteContainer(params, function(err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router