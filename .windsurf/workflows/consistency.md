---
description: Consistency check - Multiple solution approaches with token efficiency
---

# Consistency Workflow: Multi-Approach Validation

## Token-Efficient Consistency Strategy

### 1. Decide N attempts (3–5 is optimal for token budget)

### 2. Generate N independent solutions using different approaches:
- **Approach A**: grep_search with pattern matching
- **Approach B**: code_search with semantic query
- **Approach C**: Targeted file reads with offset/limit
- **Approach D**: find_by_name + selective reads
- **Approach E**: Memory lookup + verification

### 3. Extract the final answer from each attempt

### 4. Vote / tally:
- If clear majority: return it
- If split: explain why and what missing info would resolve it

## Universal Consistency Checks

### Example: Finding All Magic Numbers
```
Approach 1: grep_search(Query="\\+ [0-9]+\\.[0-9]", MatchPerLine=False)
Approach 2: code_search(search_term="Find hardcoded numeric values in calculations")
Approach 3: Read known service files at specific line ranges where calculations occur
```

### Example: Verifying Import Consistency
```
Approach 1: grep_search(Query="from.*config import", Includes=["*.py"])
Approach 2: Read each module's import section (lines 1-20 only)
Approach 3: Check memory for documented import patterns
```

### Example: Verifying API Response Structure
```
Approach 1: grep_search(Query="return.*json", Includes=["*route*.py", "*controller*.py"])
Approach 2: code_search(search_term="Find API response formatting")
Approach 3: Check test files for expected response assertions
```

### Token Budget Per Approach
- Each approach: <2,000 tokens
- Total consistency check: <10,000 tokens for 5 approaches

## Output Format
```
Final answer: [consensus result]

Tally: 
- Approach A: [result] (2,100 tokens)
- Approach B: [result] (1,800 tokens)  
- Approach C: [result] (1,900 tokens)
- Consensus: [A,B,C agree] or [split - needs clarification]

Disagreements: [explanation if any]
Token efficiency: [total used] / [budget]