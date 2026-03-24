# AWS Infrastructure Setup Script
# Run once to create S3 bucket and CloudFront distribution

param(
    [string]$BucketName = "leonel-portfolio-site",
    [string]$Region = "us-east-1"
)

$ErrorActionPreference = "Stop"

Write-Host "🏗️ Setting up AWS Infrastructure..." -ForegroundColor Cyan

# Step 1: Create S3 Bucket
Write-Host "`n📦 Creating S3 bucket: $BucketName" -ForegroundColor Yellow
try {
    aws s3 mb "s3://$BucketName" --region $Region
    Write-Host "✅ Bucket created" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Bucket may already exist or error occurred: $_" -ForegroundColor Yellow
}

# Step 2: Configure bucket for static website hosting
Write-Host "`n🌐 Configuring static website hosting..." -ForegroundColor Yellow
$websiteConfig = @"
{
    "IndexDocument": {"Suffix": "index.html"},
    "ErrorDocument": {"Key": "404.html"}
}
"@
$websiteConfig | Out-File -FilePath ".\infrastructure\website-config.json" -Encoding UTF8
aws s3api put-bucket-website --bucket $BucketName --website-configuration file://infrastructure/website-config.json

# Step 3: Create bucket policy for public read (will be restricted by CloudFront OAC later)
Write-Host "`n🔐 Setting bucket policy..." -ForegroundColor Yellow
$bucketPolicy = @"
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::$BucketName/*"
        }
    ]
}
"@
$bucketPolicy | Out-File -FilePath ".\infrastructure\bucket-policy.json" -Encoding UTF8
aws s3api put-bucket-policy --bucket $BucketName --policy file://infrastructure/bucket-policy.json

# Step 4: Create CloudFront Origin Access Control
Write-Host "`n☁️ Creating CloudFront distribution..." -ForegroundColor Yellow

$cloudfrontConfig = @"
{
    "CallerReference": "portfolio-$(Get-Date -Format 'yyyyMMddHHmmss')",
    "Comment": "Leonel Portfolio Site",
    "DefaultCacheBehavior": {
        "TargetOriginId": "S3-$BucketName",
        "ViewerProtocolPolicy": "redirect-to-https",
        "AllowedMethods": {
            "Quantity": 2,
            "Items": ["GET", "HEAD"],
            "CachedMethods": {
                "Quantity": 2,
                "Items": ["GET", "HEAD"]
            }
        },
        "CachePolicyId": "658327ea-f89d-4fab-a63d-7e88639e58f6",
        "Compress": true
    },
    "Origins": {
        "Quantity": 1,
        "Items": [
            {
                "Id": "S3-$BucketName",
                "DomainName": "$BucketName.s3-website-$Region.amazonaws.com",
                "CustomOriginConfig": {
                    "HTTPPort": 80,
                    "HTTPSPort": 443,
                    "OriginProtocolPolicy": "http-only"
                }
            }
        ]
    },
    "Enabled": true,
    "DefaultRootObject": "index.html",
    "PriceClass": "PriceClass_100",
    "CustomErrorResponses": {
        "Quantity": 1,
        "Items": [
            {
                "ErrorCode": 404,
                "ResponsePagePath": "/404.html",
                "ResponseCode": "404",
                "ErrorCachingMinTTL": 300
            }
        ]
    }
}
"@
$cloudfrontConfig | Out-File -FilePath ".\infrastructure\cloudfront-config.json" -Encoding UTF8

$distribution = aws cloudfront create-distribution --distribution-config file://infrastructure/cloudfront-config.json --output json | ConvertFrom-Json

$distributionId = $distribution.Distribution.Id
$domainName = $distribution.Distribution.DomainName

Write-Host "`n✅ Infrastructure setup complete!" -ForegroundColor Green
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "CloudFront Distribution ID: $distributionId" -ForegroundColor White
Write-Host "CloudFront Domain: https://$domainName" -ForegroundColor White
Write-Host "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" -ForegroundColor Cyan
Write-Host "`n⚠️ Update deploy.ps1 with: -DistributionId `"$distributionId`"" -ForegroundColor Yellow
Write-Host "⚠️ CloudFront takes ~15 minutes to deploy globally" -ForegroundColor Yellow
