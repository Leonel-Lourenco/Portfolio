---
description: ReAct - Token-efficient iterative reasoning and action
---

# ReAct Workflow: Reasoning + Acting

## Token-Efficient ReAct Strategy

### 1. Plan what must be looked up vs what can be inferred
```
Check memories first → Use grep_search → Use code_search → Read files (last resort)
```

### 2. Start a loop with token budget tracking:

**Thought** (brief, <100 tokens): what you need next

**Action** (choose most token-efficient tool):
```
Priority 1: Check memory (0 tokens)
Priority 2: grep_search with MatchPerLine=False (500-1000 tokens)
Priority 3: code_search (1000-2000 tokens)
Priority 4: Targeted file read with offset/limit (1000-3000 tokens)
Priority 5: Full file read (3000-10000 tokens) - AVOID if possible
```

**Observation** (record what you found - facts only, <200 tokens)

**Token tracking**: [cumulative tokens used]

### 3. Repeat until you have the required facts (max 5-7 iterations)

### 4. Assemble the final answer, explicitly using observations (and citing sources)

### 5. Stop rule: 
- If a key fact can't be verified, say so and state the minimum info needed
- If token budget exceeded (>15,000), summarize findings and request continuation

## Universal ReAct Patterns

### Example: Finding How a Feature is Implemented

**Iteration 1:**
- Thought: Need to find the service/handler implementation
- Action: `find_by_name(SearchDirectory="src/", Pattern="*[feature]*")`
- Observation: Found `feature_service.py`
- Tokens: 500

**Iteration 2:**
- Thought: Need to see the main method signature
- Action: `grep_search(SearchPath="src/services/feature_service.py", Query="def.*\\(", MatchPerLine=True)`
- Observation: `def process_feature(self, data: dict, context: Context) -> Result:`
- Tokens: 1,200 (cumulative)

**Iteration 3:**
- Thought: Need to understand data transformation approach
- Action: `grep_search(SearchPath="src/services/feature_service.py", Query="transform|convert|process", MatchPerLine=True)`
- Observation: Uses `transform_input()` and `validate_output()` for data flow
- Tokens: 2,000 (cumulative)

**Stop**: Have sufficient information to answer question

### Token Budget Guidelines
- Simple lookup: <3,000 tokens (1-3 iterations)
- Moderate investigation: <8,000 tokens (3-5 iterations)
- Complex analysis: <15,000 tokens (5-7 iterations)

## Output Format
```
Question: [original question]

ReAct Trace:
1. Thought: [what I need]
   Action: [tool + args]
   Observation: [facts found]
   Tokens: [cumulative]

2. Thought: [next need]
   Action: [tool + args]
   Observation: [facts found]
   Tokens: [cumulative]

[... continue ...]

Final Answer: [answer using observations with citations]
Total tokens: [final count]
Efficiency: [Good/Moderate/Poor based on tokens/iteration]