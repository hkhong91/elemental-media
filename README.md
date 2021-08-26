# AWS Elemental Media

### AWS Credentials Setting

~/.aws/credentials

```
[jaeme]
aws_access_key_id = <DEFAULT_ACCESS_KEY_ID>
aws_secret_access_key = <DEFAULT_SECRET_ACCESS_KEY>
```

## MediaConvert

IAM Role. https://docs.aws.amazon.com/ko_kr/mediaconvert/latest/ug/creating-the-iam-role-in-iam.html

API Doc. https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/MediaConvert.html

1. S3 Bucket 생성
2. IAM 권한 설정
3. 생성한 Bucket에 파일 업로드
4. 작업 생성