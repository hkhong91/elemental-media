const AWS = require('../aws-default')

const mediaconvert = new AWS.MediaConvert({
  endpoint: process.env.MEDIACONVERT_ENDPOINT
})
module.exports = mediaconvert