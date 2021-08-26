const express = require('express')
const router = express.Router()

const mediapackage = require('../aws/elemental/mediapackage')

router.post('/channels', (req, res, next) => {
  const { id, description } = req.body

  const params = {
    Id: id,
    Description: description,
  }

  mediapackage.createChannel(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels', (req, res, next) => {
  const params = {}

  mediapackage.listChannels(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const params = {
    Id: id
  }

  mediapackage.describeChannel(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const { description } = req.body
  const params = {
    Id: id,
    Description: description,
  }

  mediapackage.updateChannel(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const params = {
    Id: id,
  }

  mediapackage.deleteChannel(params, function (err, data) {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router