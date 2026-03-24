---
description: Verification - Token-efficient testing and validation
---

# Verify Workflow: Efficient Code Validation

## Token-Efficient Verification Strategy

### 1. Syntax Check First (Minimal Tokens)
```
// turbo
python -m py_compile [file1.py] [file2.py] [file3.py]
# Batch multiple files in one command
```

### 2. Run Existing Tests (Targeted)
```
// turbo
# Run specific test file
python -m pytest tests/test_[module].py -v --tb=short

# Run specific test function
python -m pytest tests/test_[module].py::TestClass::test_function -v
```

### 3. Use grep_search to Find Related Tests
```
grep_search(SearchPath="tests/", Query="def test_.*[feature_name]", 
            Includes=["*.py"], MatchPerLine=True)
# Find existing tests before writing new ones
```

### 4. Verify Imports Without Full File Read
```
grep_search(SearchPath="src/", Query="^from|^import", 
            Includes=["[modified_file].py"], MatchPerLine=True)
# Check imports are correct without reading entire file
```

### 5. Check for Common Issues with Targeted Searches
```
# Bare except clauses
grep_search(SearchPath="src/", Query="except:", Includes=["*.py"])

# Magic numbers
grep_search(SearchPath="src/", Query="\\+ [0-9]+\\.[0-9]|\\* [0-9]+\\.[0-9]", 
            Includes=["*.py"])

# Missing type hints
grep_search(SearchPath="src/", Query="def.*\\):", Includes=["*.py"])
```

## Universal Verification Patterns

### Critical Files to Verify After Changes
1. **API/Route changes**: Run relevant endpoint tests
2. **Service changes**: Check affected business logic tests
3. **Config changes**: Verify constants with `grep_search(Query="^[A-Z_]+ =", SearchPath="src/config/")`

### Common Validation Patterns
```python
# Verify consistent function signatures
grep_search(SearchPath="src/", Query="def [function_name]", MatchPerLine=True)

# Verify constant usage (not magic numbers)
grep_search(SearchPath="src/", Query="[CONSTANT_NAME]", MatchPerLine=False)

# Check for proper imports
grep_search(SearchPath="src/", Query="from.*import", Includes=["*.py"])
```

### Quick Validation Checklist
- [ ] Syntax check passes (compile/lint)
- [ ] Existing tests pass
- [ ] No bare except clauses (Python) / empty catch blocks (JS)
- [ ] Constants used instead of magic numbers
- [ ] Type hints/annotations present on new functions
- [ ] Imports are correct and minimal
- [ ] No console.log/print statements left in production code

## Integration Verification

### 1. Run Unit Tests
```
// turbo
pytest tests/unit/ -v --tb=short
# or: npm test -- --coverage
```

### 2. Run Integration Tests
```
// turbo
pytest tests/integration/ -v
# or: npm run test:integration
```

### 3. Manual Smoke Test
- Start the application locally
- Verify critical user flows work
- Check browser console for errors

### 4. API Verification
```
# Use REST client or curl to verify endpoints
curl -X GET http://localhost:5000/api/health
```

## Token Budget
- Syntax validation: <500 tokens
- Test execution: <2,000 tokens
- Issue detection: <1,000 tokens per pattern
- Visual verification: <3,000 tokens

## Output
Report pass/fail status with specific line numbers for any issues found.
For visual verification, include match percentage and discrepancy details.
