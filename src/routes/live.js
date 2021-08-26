const express = require('express')
const router = express.Router()

const medialive = require('../aws/elemental/medialive')

router.post('/input-security-groups', (req, res, next) => {
  const { whitelist } = req.body
  const whitelistRules = whitelist.map(cidr => ({
    "Cidr": cidr
  }))
  const params = {
    "WhitelistRules": whitelistRules,
  }

  medialive.createInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/input-security-groups', (req, res, next) => {
  const params = {}

  medialive.listInputSecurityGroups(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const params = {
    "InputSecurityGroupId": groupId
  }

  medialive.describeInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const { whitelist } = req.body
  const whitelistRules = whitelist.map(cidr => ({
    "Cidr": cidr
  }))
  const params = {
    "InputSecurityGroupId": groupId,
    "WhitelistRules": whitelistRules,
  }

  medialive.updateInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/input-security-groups/:groupId', (req, res, next) => {
  const { groupId } = req.params
  const params = {
    "InputSecurityGroupId": groupId
  }

  medialive.deleteInputSecurityGroup(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/inputs', (req, res, next) => {
  const params = {}

  medialive.listInputs(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/inputs/:inputId', (req, res, next) => {
  const { inputId } = req.params
  const params = {
    "InputId": inputId
  }

  medialive.describeInput(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/inputs/:inputId', (req, res, next) => {
  const { inputId } = req.params
  const params = {
    "InputId": inputId
  }

  medialive.deleteInput(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels', (req, res, next) => {
  const params = {}

  medialive.listChannels(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:channelId', (req, res, next) => {
  const { channelId } = req.params
  const params = {
    "ChannelId": channelId
  }

  medialive.describeChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/channels/:channelId', (req, res, next) => {
  const { channelId } = req.params
  const params = {
    "ChannelId": channelId
  }

  medialive.deleteChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router