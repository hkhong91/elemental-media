# AWS Elemental Media

### AWS Credentials Setting

~/.aws/credentials

```
[jaeme]
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
```

## MediaConvert

Guide:
* [IAM Permissions for AWS Elemental MediaConvert](https://docs.aws.amazon.com/ko_kr/mediaconvert/latest/ug/creating-the-iam-role-in-iam.html)

API Docs:
* [MediaConvert](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaConvert.html)

Transcoding process:
1. S3 Bucket 생성
2. IAM Role 설정
3. 생성한 Bucket에 파일 업로드
4. 작업 생성

Also check the .env file.

## MediaLive

Guide:
* [IAM Permissions for AWS Elemental MediaLive](https://docs.aws.amazon.com/medialive/latest/ug/setting-up.html)

API Docs:
* [MediaLive](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaLive.html)
* [MediaPackage](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaPackage.html)
* [MediaStore](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaStore.html)

Transcoding process:
1. S3 Bucket 생성
2. IAM Role 설정
3. Target 설정 (MediaStore or MediaPackage)
4. 비디오 선택
5. 채널 생성