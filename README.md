# AWS Elemental Media

vi ~/.aws/credentials

```
[jaeme]
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
```

touch .env

```
AWS_DEFAULT_REGION=ap-northeast-2

MEDIACONVERT_ROLE=arn:aws:iam::{account}:role/MediaConvertDefaultRole
MEDIACONVERT_ENDPOINT=https://{string}.mediaconvert.ap-northeast-2.amazonaws.com
MEDIACONVERT_BUCKET_INPUT=s3://sample-media-content/video/
MEDIACONVERT_BUCKET_OUTPUT=s3://sample-media-content/video/
```

npm install

npm start

## MediaConvert

Guide:
* [IAM Permissions for AWS Elemental MediaConvert](https://docs.aws.amazon.com/ko_kr/mediaconvert/latest/ug/creating-the-iam-role-in-iam.html)

API Docs:
* [MediaConvert](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaConvert.html)

Process:
1. Create S3 Bucket
2. IAM Role Settings
3. Upload files to the created S3 Bucket
4. Create Task

## MediaLive

Guide:
* [IAM Permissions for AWS Elemental MediaLive](https://docs.aws.amazon.com/medialive/latest/ug/setting-up.html)

API Docs:
* [MediaLive](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaLive.html)
* [MediaPackage](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaPackage.html)
* [MediaStore](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaStore.html)

Broadcast Client:
* [OBS Studio](https://obsproject.com/)

Process:
1. Create S3 Bucket
2. IAM Role Settings
3. Target Settings (MediaStore or MediaPackage)
4. Select Video
5. Create Channel

Simple Action:
1. Create MediaPackage Channel
2. MediaPackage Channel - Create endpoint - CloudFront Settings (CORS)
3. Create MediaLive Input Security Group
4. Create MediaLive Input
5. MediaLive Channel - with Input & MediaPacakage Channel
6. OBS Studio broadcast settings - service customization (Server, Stream key Input)
7. Access with CloudFront URL
