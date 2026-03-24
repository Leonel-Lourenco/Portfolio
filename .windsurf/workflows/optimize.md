---
description: Performance Optimization
auto_execution_mode: 1
---

## Objective
Systematically identify and resolve performance bottlenecks.

## Requirements
1. **Measure First** — Never optimize without baseline metrics
   - Identify what to measure (load time, response time, memory, CPU)
   - Establish current performance baseline
   - Define target performance goals

2. **Profile Before Guessing**
   - Use profiling tools appropriate to the stack
   - Identify the actual bottleneck (not assumed bottleneck)
   - Quantify the impact of each bottleneck

3. **Optimize Strategically**
   - Address highest-impact bottlenecks first
   - Consider algorithmic improvements before micro-optimizations
   - Evaluate trade-offs (memory vs speed, complexity vs performance)

4. **Verify Improvement**
   - Re-measure after each optimization
   - Ensure no regression in functionality
   - Document the improvement achieved

## Anti-Patterns to Avoid
- Premature optimization without profiling
- Optimizing code that runs rarely
- Sacrificing readability for marginal gains
- Caching without invalidation strategy

## Deliverable
Optimized code with documented before/after metrics and explanation of changes made.
