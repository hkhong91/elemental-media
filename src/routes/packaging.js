const express = require('express')
const router = express.Router()

const mediapackage = require('../aws/elemental/mediapackage')

router.post('/channels', (req, res, next) => {
  const { id, description } = req.body
  const params = {
    "Id": id,
    "Description": description,
  }

  mediapackage.createChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels', (req, res, next) => {
  const params = {}

  mediapackage.listChannels(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const params = {
    "Id": id
  }

  mediapackage.describeChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const { description } = req.body
  const params = {
    "Id": id,
    "Description": description,
  }

  mediapackage.updateChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/channels/:id', (req, res, next) => {
  const { id } = req.params
  const params = {
    "Id": id,
  }

  mediapackage.deleteChannel(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.post('/channels/:id/endpoints', (req, res, next) => {
  const { id } = req.params
  const { endpointId, description } = req.body

  // default. more in the docs. or use the aws console.
  const params = {
    "Id": endpointId,
    "ChannelId": id,
    "Description": description,
    "StartoverWindowSeconds": 0,
    "TimeDelaySeconds": 0,
    "ManifestName": "index",
    "Whitelist": [],
    "HlsPackage": {
      "SegmentDurationSeconds": 6,
      "PlaylistWindowSeconds": 60,
      "AdMarkers": "NONE",
      "ProgramDateTimeIntervalSeconds": 0,
      "UseAudioRenditionGroup": false,
      "IncludeIframeOnlyStream": false,
      "AdTriggers": [
        "SPLICE_INSERT",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY"
      ],
      "AdsOnDeliveryRestrictions": "RESTRICTED",
      "StreamSelection": {
        "StreamOrder": "ORIGINAL"
      }
    },
    "Origination": "ALLOW"
  }

  mediapackage.createOriginEndpoint(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:id/endpoints', (req, res, next) => {
  const { id } = req.params
  const params = {
    "ChannelId": id,
  }

  mediapackage.listOriginEndpoints(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/channels/:id/endpoints/:endpointId', (req, res, next) => {
  const { id, endpointId } = req.params
  const params = {
    "Id": endpointId,
  }

  mediapackage.describeOriginEndpoint(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/channels/:id/endpoints/:endpointId', (req, res, next) => {
  const { id, endpointId } = req.params
  const { description } = req.body

  // default. more in the docs. or use the aws console.
  const params = {
    "Id": endpointId,
    "Description": description,
    "StartoverWindowSeconds": 0,
    "TimeDelaySeconds": 0,
    "ManifestName": "index",
    "Whitelist": [],
    "HlsPackage": {
      "SegmentDurationSeconds": 6,
      "PlaylistWindowSeconds": 60,
      "AdMarkers": "NONE",
      "ProgramDateTimeIntervalSeconds": 0,
      "UseAudioRenditionGroup": false,
      "IncludeIframeOnlyStream": false,
      "AdTriggers": [
        "SPLICE_INSERT",
        "PROVIDER_ADVERTISEMENT",
        "DISTRIBUTOR_ADVERTISEMENT",
        "PROVIDER_PLACEMENT_OPPORTUNITY",
        "DISTRIBUTOR_PLACEMENT_OPPORTUNITY"
      ],
      "AdsOnDeliveryRestrictions": "RESTRICTED",
      "StreamSelection": {
        "StreamOrder": "ORIGINAL"
      }
    },
    "Origination": "ALLOW"
  }

  mediapackage.updateOriginEndpoint(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/channels/:id/endpoints/:endpointId', (req, res, next) => {
  const { id, endpointId } = req.params
  const params = {
    "Id": endpointId,
  }

  mediapackage.deleteOriginEndpoint(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router