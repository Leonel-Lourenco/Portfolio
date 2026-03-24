---
description: Retrieve-and-Revise - Token-efficient fact verification
---

# RARR Workflow: Evidence-Based Revision

## Token-Efficient RARR Strategy

### 1. Draft once (fast)
Use existing knowledge and memories first

### 2. Extract "checkable claims" (3–7): specific statements with names/numbers/dates/definitions

### 3. For each claim, retrieve evidence using token-efficient tools:

**Find sources efficiently:**
```
# Check documentation files
grep_search(SearchPath=".", Query="[claim_keyword]", 
            Includes=["README.md", "Architecture.md", "*.md"], 
            MatchPerLine=True)

# Check code for actual implementation
code_search(search_folder_absolute_uri="[project_root]/src",
            search_term="Find implementation of [claim]")

# Check memories first
# Search memories with tags: architecture, pattern, [project_name]
```

**Pull short supporting snippet** (use offset/limit for file reads)

### 4. Mark each claim:
- Supported (found in 2+ sources)
- Unclear (found in 1 source or ambiguous)
- Contradicted (conflicts with evidence)

### 5. Revise:
- Keep supported claims
- Remove or soften unclear ones
- Correct contradicted ones

## Universal Verification Sources

### Primary Sources (check in order):
1. **Memories** - Check existing memories first (0 tokens)
2. **Documentation** - Use grep_search for README, Architecture.md (<500 tokens)
3. **Type definitions** - Use grep_search for interfaces/schemas (<500 tokens)
4. **Source code** - Use code_search or targeted grep_search (<2,000 tokens)
5. **Tests** - Check test files for expected behavior (<1,000 tokens)

### Example Claims to Verify:
```
Claim: "All services inherit from BaseService"
Source 1: grep_search(SearchPath="src/services/", 
                      Query="class.*Service.*BaseService")
Source 2: Read Architecture.md section on services
Status: Supported

Claim: "API_TIMEOUT is 30 seconds"
Source 1: grep_search(SearchPath="src/config/", Query="API_TIMEOUT")
Source 2: Check usage in API client
Status: Supported or Contradicted (verify actual value)
```

### Token Budget
- Draft: <1,000 tokens
- Evidence retrieval per claim: <1,000 tokens
- Total for 5 claims: <6,000 tokens

## Output Format
```
Revised answer: [corrected version with inline citations]

Evidence list:
1. Claim: [statement]
   - Source 1: [Architecture.md:150-155] → Supported
   - Source 2: [src/pipelines/base.py:25-30] → Supported
   
2. Claim: [statement]
   - Source 1: [Data_Dictionary.md:200] → Unclear
   - Action: Softened claim to "typically" instead of "always"

Token efficiency: [total used] / [budget]