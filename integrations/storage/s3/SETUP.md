# AWS S3 Setup

## 1. Install dependencies

```bash
npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner
```

## 2. Create an S3 bucket

In the AWS console, create a bucket and configure CORS for your domain.

## 3. Set environment variables

```
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=us-east-1
AWS_S3_BUCKET=your-bucket-name
```
