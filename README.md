# AWS Elemental Media

~/.aws/credentials

```
[jaeme]
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
```

Also check the .env file.

## MediaConvert

Guide:
* [IAM Permissions for AWS Elemental MediaConvert](https://docs.aws.amazon.com/ko_kr/mediaconvert/latest/ug/creating-the-iam-role-in-iam.html)

API Docs:
* [MediaConvert](https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaConvert.html)

Process:
1. S3 Bucket 생성
2. IAM Role 설정
3. 생성한 Bucket에 파일 업로드
4. 작업 생성

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
1. S3 Bucket 생성
2. IAM Role 설정
3. Target 설정 (MediaStore or MediaPackage)
4. 비디오 선택
5. 채널 생성

Simple Action:
1. MediaPackage Channel 생성
2. MediaPackage Channel - Endpoint 생성 - CloudFront 설정(CORS)
3. MediaLive Input Security Group 생성
4. MediaLive Input 생성
5. MediaLive Channel - with Input & MediaPacakage Channel
6. OBS Studio 방송 설정 - 서비스 사용자 지정 (서버,스트림키 입력)
7. CloudFront URL로 접근