var AWS = require('aws-sdk')

AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'jaeme'})
AWS.config.update({
  region: process.env.MEDIACONVERT_REGION,
})

module.exports = AWS