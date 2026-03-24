---
description: Program of Thought - Token-efficient computational problem solving
---

# POT Workflow: Computational Problem Solving

## Token-Efficient POT Strategy

### 1. List assumptions + variables (units, definitions, given values)
```
Use grep_search to find existing constants/definitions:
grep_search(SearchPath="src/config.py", Query="^[A-Z_]+ =", MatchPerLine=True)
```

### 2. Write minimal code/pseudocode that computes the result
```
# Use existing utilities instead of reinventing
# Check for helpers in src/geometry/, src/execution/
find_by_name(SearchDirectory="src/", Pattern="*util*.py", Extensions=["py"])
```

### 3. Add sanity checks (units, bounds, quick cross-check)
```python
# Example: Verify coordinate transformation
assert 0 <= u <= frame.u_max, f"u={u} out of bounds [0, {frame.u_max}]"
assert 0 <= v <= frame.v_max, f"v={v} out of bounds [0, {frame.v_max}]"
```

### 4. Execute the code (calculator/Python/tool)
```
// turbo
python -c "import math; print([computation])"
```

### 5. Write the final answer using computed outputs, and mention assumptions

## Universal Computational Patterns

### Data Transformations
```python
# Use existing utility functions
from src.utils.transforms import normalize, scale
normalized_data = normalize(input_data)
scaled_result = scale(normalized_data, factor=SCALE_FACTOR)
```

### Common Calculations
```python
# Pagination
total_pages = math.ceil(total_items / page_size)
offset = (page_number - 1) * page_size

# Rate limiting
requests_per_second = max_requests / time_window_seconds

# Percentage calculations
percentage = (part / whole) * 100
```

### Token Budget
- Assumption gathering: <1,000 tokens (use grep_search)
- Code writing: <2,000 tokens
- Execution: <500 tokens
- Total: <3,500 tokens per computation

## Output Format
```
Assumptions:
- [list key assumptions]
- Units: [mm, degrees, etc.]

Computation:
[minimal code/pseudocode]

Sanity checks:
- [check 1]: PASS/FAIL
- [check 2]: PASS/FAIL

Result: [computed value with units]