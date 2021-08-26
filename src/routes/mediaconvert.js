var express = require('express')
var router = express.Router()

var AWS = require('../config/aws')
var mediaconvert = new AWS.MediaConvert({
  endpoint: process.env.MEDIACONVERT_ENDPOINT
})

router.post('/jobs', (req, res, next) => {
  const {
    file,
  } = req.body

  const nameModifier = "_myname"
  const segmentModifier = "_mysegment"

  const params = {
    "Settings": {
      "Inputs": [
        {
          "TimecodeSource": "ZEROBASED",
          "VideoSelector": {},
          "AudioSelectors": {
            "Audio Selector 1": {
              "DefaultSelection": "DEFAULT"
            }
          },
          "FileInput": process.env.MEDIACONVERT_BUCKET_INPUT + file
        }
      ],
      "OutputGroups": [
        {
          "Name": "Apple HLS",
          "OutputGroupSettings": {
            "Type": "HLS_GROUP_SETTINGS",
            "HlsGroupSettings": {
              "SegmentLength": 10,
              "MinSegmentLength": 0,
              "Destination": process.env.MEDIACONVERT_BUCKET_OUTPUT
            }
          },
          "Outputs": [
            {
              "VideoDescription": {
                "CodecSettings": {
                  "Codec": "H_264",
                  "H264Settings": {
                    "RateControlMode": "QVBR",
                    "SceneChangeDetect": "TRANSITION_DETECTION",
                    "MaxBitrate": 5000000
                  }
                }
              },
              "AudioDescriptions": [
                {
                  "CodecSettings": {
                    "Codec": "AAC",
                    "AacSettings": {
                      "Bitrate": 96000,
                      "CodingMode": "CODING_MODE_2_0",
                      "SampleRate": 48000
                    }
                  }
                }
              ],
              "OutputSettings": {
                "HlsSettings": {
                  "SegmentModifier": segmentModifier
                }
              },
              "ContainerSettings": {
                "Container": "M3U8",
                "M3u8Settings": {}
              },
              "NameModifier": nameModifier
            }
          ]
        }
      ],
      "TimecodeConfig": {
        "Source": "ZEROBASED"
      }
    },
    "Role": process.env.MEDIACONVERT_ROLE
  }

  mediaconvert.createJob(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/jobs', (req, res, next) => {
  const params = {}

  mediaconvert.listJobs(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/jobs/:jobId', (req, res, next) => {
  const { jobId } = req.params
  const params = {
    "Id": jobId
  }

  mediaconvert.getJob(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.patch('/jobs/:jobId/cancel', (req, res, next) => {
  const { jobId } = req.params
  const params = {
    "Id": jobId
  }

  mediaconvert.cancelJob(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.post('/queues', (req, res, next) => {
  const { name, description, pricingPlan, status } = req.body
  const params = {
    Name: name,
    Description: description,
    PricingPlan: pricingPlan,
    Status: status,
  }

  mediaconvert.createQueue(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/queues', (req, res, next) => {
  const params = {}

  mediaconvert.listQueues(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.get('/queues/:name', (req, res, next) => {
  const { name } = req.params
  const params = {
    "Name": name
  }

  mediaconvert.getQueue(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.put('/queues/:name', (req, res, next) => {
  const { name } = req.params
  const { description, status } = req.body
  const params = {
    Name: name,
    Description: description,
    Status: status,
  }

  mediaconvert.updateQueue(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

router.delete('/queues/:name', (req, res, next) => {
  const { name } = req.params
  const params = {
    "Name": name
  }

  mediaconvert.deleteQueue(params, (err, data) => {
    if (err) res.status(err.statusCode).json(err)
    else res.json(data)
  })
})

module.exports = router
