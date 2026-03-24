---
description: Security Audit
auto_execution_mode: 1
---

## Objective
Systematically identify and remediate security vulnerabilities.

## Requirements
1. **Input Validation**
   - Check all user inputs for sanitization
   - Verify parameterized queries (no SQL injection)
   - Validate file uploads (type, size, content)

2. **Authentication & Authorization**
   - Verify authentication is required where needed
   - Check authorization on all protected resources
   - Ensure secrets are not hardcoded or exposed

3. **Data Protection**
   - Identify sensitive data flows
   - Verify encryption in transit (HTTPS) and at rest
   - Check for data leakage in logs, errors, or responses

4. **Common Vulnerabilities**
   - XSS (Cross-Site Scripting)
   - CSRF (Cross-Site Request Forgery)
   - Insecure direct object references
   - Security misconfiguration
   - Exposed debug endpoints or verbose errors

5. **Dependencies**
   - Check for known vulnerabilities in dependencies
   - Verify dependencies are from trusted sources
   - Identify outdated packages with security patches

## Deliverable
Security report with:
- Vulnerabilities found (severity: Critical/High/Medium/Low)
- Specific location and reproduction steps
- Recommended fix for each issue
- Verification that fixes don't break functionality
