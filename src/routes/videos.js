var express = require('express')
var router = express.Router()

var AWS = require('aws-sdk')
var mediaconvert = new AWS.MediaConvert()

router.post('/', function (req, res, next) {
  const { fileInput } = req.body
  const params = {
    Settings: {
      "Inputs": [
        {
          "TimecodeSource": "ZEROBASED",
          "VideoSelector": {},
          "AudioSelectors": {
            "Audio Selector 1": {
              "DefaultSelection": "DEFAULT"
            }
          },
          "FileInput": fileInput
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
              "Destination": "s3://sample-media-content/video/"
            }
          },
          "Outputs": [
            {
              "VideoDescription": {
                "CodecSettings": {
                  "Codec": "H_264",
                  "H264Settings": {
                    "RateControlMode": "QVBR",
                    "SceneChangeDetect": "TRANSITION_DETECTION"
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
                "HlsSettings": {}
              },
              "ContainerSettings": {
                "Container": "M3U8",
                "M3u8Settings": {}
              }
            }
          ]
        }
      ],
      "TimecodeConfig": {
        "Source": "ZEROBASED"
      }
    },
    "Role": "role"
  }

  mediaconvert.createJob(params, function (err, data) {
    if (err) {
      console.log(err, err.stack)
      res.status(err.statusCode).json(data)
    }
    else {
      res.json(data)
    }
  })
})

module.exports = router
