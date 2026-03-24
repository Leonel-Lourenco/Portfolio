---
description: Structured Refactoring
auto_execution_mode: 1
---

## Objective
Improve code structure without changing external behavior.

## Requirements
1. **Safety Net First**
   - Ensure adequate test coverage exists before refactoring
   - If tests are missing, create them first (use /build_test_suite)
   - Run tests to establish green baseline

2. **Identify Refactoring Target**
   - Code smells: duplication, long methods, large classes
   - Coupling issues: tight coupling, circular dependencies
   - Naming: unclear or misleading names
   - Structure: misplaced responsibilities, poor abstractions

3. **Apply Refactoring Patterns**
   - Extract Method/Class for long or duplicated code
   - Rename for clarity
   - Move for better organization
   - Replace conditionals with polymorphism
   - Introduce interfaces for flexibility

4. **Incremental Changes**
   - Make small, atomic changes
   - Run tests after each change
   - Commit working states frequently
   - Never mix refactoring with feature changes

5. **Verify Behavior Preserved**
   - All tests pass after refactoring
   - No new functionality added (that's a feature, not refactoring)
   - Performance not degraded (or intentionally traded)

## Red Flags
- Refactoring without tests = risky
- Large refactoring in one commit = hard to debug
- Refactoring while adding features = conflated changes

## Deliverable
Cleaner code that passes all existing tests with improved readability, maintainability, or structure.
