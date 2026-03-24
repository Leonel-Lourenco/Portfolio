---
description: Deploy to AWS staging or production environment
---

# AWS Deployment Workflow

## Prerequisites
- AWS CLI configured with proper credentials
- Docker Desktop running

## Deployment Flow

### Step 1: Deploy to Staging
// turbo
```powershell
.\infrastructure\deploy.ps1 -Environment staging
```

### Step 2: Verify Staging Deployment
Open the staging URL in browser and test:
- **URL**: http://brainwave-alb-733874761.us-east-1.elb.amazonaws.com:8081
- Test login/register functionality
- Test AI tutoring features
- Test any new features you implemented

### Step 3: Check Staging Logs (if issues)
```powershell
aws logs tail /ecs/brainwave-backend-staging --since 5m --follow
```

### Step 4: Deploy to Production (after staging verification)
```powershell
.\infrastructure\deploy.ps1 -Environment production
```
**Note**: Production deployment requires typing 'yes' to confirm.

### Step 5: Verify Production
- **URL**: http://brainwave-alb-733874761.us-east-1.elb.amazonaws.com
- Perform smoke tests on critical functionality

### Step 6: Check Production Logs (if issues)
```powershell
aws logs tail /ecs/brainwave-backend --since 5m --follow
```

## Quick Reference

| Environment | URL | Deploy Command |
|-------------|-----|----------------|
| **Local** | http://localhost:3000 | `docker compose up -d` |
| **Staging** | http://brainwave-alb-733874761.us-east-1.elb.amazonaws.com:8081 | `.\infrastructure\deploy.ps1 -Environment staging` |
| **Production** | http://brainwave-alb-733874761.us-east-1.elb.amazonaws.com | `.\infrastructure\deploy.ps1 -Environment production` |

## Rollback (if needed)
If production deployment breaks, redeploy the previous working version:
```powershell
# Force new deployment with existing image
aws ecs update-service --cluster brainwave-cluster --service brainwave-backend-service --force-new-deployment --region us-east-1
```

## Database Notes
- **Staging DB**: `brainwave_stg` (isolated from production)
- **Production DB**: `brainwave`
- Both share the same RDS instance but are completely separate databases
