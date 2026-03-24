# Portfolio Deployment Script
# Usage: .\infrastructure\deploy.ps1

param(
    [string]$BucketName = "leonel-portfolio-site",
    [string]$Region = "us-east-1",
    [string]$DistributionId = "EPU8430RYZP7Q"
)

$ErrorActionPreference = "Stop"

Write-Host "🚀 Starting Portfolio Deployment..." -ForegroundColor Cyan

# Step 1: Build the site
Write-Host "`n📦 Building Astro site..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

# Step 2: Sync to S3
Write-Host "`n☁️ Uploading to S3..." -ForegroundColor Yellow
aws s3 sync dist/ "s3://$BucketName" --delete --region $Region

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ S3 sync failed!" -ForegroundColor Red
    exit 1
}

# Step 3: Invalidate CloudFront cache (if distribution ID is set)
if ($DistributionId) {
    Write-Host "`n🔄 Invalidating CloudFront cache..." -ForegroundColor Yellow
    aws cloudfront create-invalidation --distribution-id $DistributionId --paths "/*"
    
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️ Cache invalidation failed (non-critical)" -ForegroundColor Yellow
    }
}

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green

# Show the site URL
if ($DistributionId) {
    $distribution = aws cloudfront get-distribution --id $DistributionId --query "Distribution.DomainName" --output text
    Write-Host "🌐 Site URL: https://$distribution" -ForegroundColor Cyan
} else {
    Write-Host "🌐 S3 URL: http://$BucketName.s3-website-$Region.amazonaws.com" -ForegroundColor Cyan
    Write-Host "⚠️ Set `$DistributionId in this script after creating CloudFront" -ForegroundColor Yellow
}
