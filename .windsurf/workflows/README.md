# Windsurf Workflow Guide

> **Strategic AI-assisted development through structured workflows**

---

## Philosophy

These workflows transform AI assistance from reactive Q&A into **deliberate, structured collaboration**. Each workflow encodes a specific problem-solving strategy—use them to guide Cascade toward the right approach for your task.

**The key insight**: Telling the AI *how* to think about a problem is often more valuable than describing what you want.

---

## Quick Reference

| Workflow | Purpose | When to Use |
|----------|---------|-------------|
| `/solve` | Systematic debugging | Something's broken, unclear why |
| `/reason` | Deep analysis | Complex decisions, architecture questions |
| `/review` | Design optimization | Evaluating/refining existing work |
| `/one_shot` | Full implementation | Well-defined task, want continuous execution |
| `/add_test` | Single feature testing | Need tests for one specific feature |
| `/build_test_suite` | Complete test coverage | Building comprehensive test infrastructure |
| `/add_logs` | Debugging instrumentation | Need visibility into runtime behavior |
| `/optimize` | Performance tuning | Slow code, bottleneck investigation |
| `/secure` | Security audit | Vulnerability assessment, hardening |
| `/document` | Documentation generation | APIs, architecture, user guides |
| `/refactor` | Code restructuring | Improving design without changing behavior |
| `/explore` | Time-boxed spike | Unknowns, feasibility questions, research |

---

## Workflow Categories

### 🔧 Problem Solving

#### `/solve` — Systematic Problem Solving
**Best for**: Bugs, errors, unexpected behavior

Forces structured root-cause analysis by generating 5 probable causes from obvious to subtle:
1. **Obvious** — Typos, missing imports
2. **Simple** — Configuration, environment
3. **Moderate** — Logic errors, state management
4. **Complex** — Race conditions, architecture
5. **Subtle** — Edge cases, implicit dependencies

```
Example: "The chat interface isn't sending messages. /solve"
```

#### `/reason` — Deep Analysis and Reasoning
**Best for**: Complex decisions, evaluating trade-offs, architecture

Produces multi-perspective analysis with:
- Root cause identification (not symptoms)
- Feasibility, scalability, maintainability evaluation
- Edge case and side effect consideration
- Clear implementation roadmap

```
Example: "Should we add real-time collaboration to the editor? /reason"
```

---

### 📐 Design & Review

#### `/review` — Design Review and Optimization
**Best for**: Evaluating existing designs, refactoring decisions

Applies structured critique:
- Logical coherence assessment
- Purpose validation for each element
- Redundancy and contradiction detection
- Best practices alignment check

```
Example: "Review the API endpoint structure in /review"
```

---

### 🚀 Implementation

#### `/one_shot` — One-Shot Complete Solution
**Best for**: Well-scoped tasks where you want continuous execution until done

Commits to:
- Complete implementation without stopping
- Continuous testing throughout
- Immediate debugging of any failures
- No stopping until 100% test passage

```
Example: "Add dark mode toggle to the settings page. /one_shot"
```

---

### 🧪 Testing

#### `/add_test` — Single Feature Test Suite
**Best for**: Adding tests to a specific feature or function

Creates honest, meaningful tests:
- Unit tests for all functions and edge cases
- Playwright E2E tests for user interactions
- Integrated logging for test failures
- No mocks or placeholder assertions

```
Example: "Add tests for the image upload feature. /add_test"
```

#### `/build_test_suite` — Comprehensive Test Infrastructure
**Best for**: Building out full test coverage across the application

Same rigor as `/add_test`, but scoped to entire application:
- Every user-accessible feature tested
- Full workflow coverage
- 100% pass = production ready

```
Example: "Build a complete test suite for the tutor chat. /build_test_suite"
```

---

### 🔍 Debugging

#### `/add_logs` — Comprehensive Logging
**Best for**: Understanding runtime behavior, debugging complex issues

Adds strategic instrumentation:
- Error states with full context (stack traces, variable states, timestamps)
- Debug-level logs at decision points and state transitions
- Structured format for easy parsing
- Actionable messages: what failed, why, what to check

```
Example: "Add logging to the API request pipeline. /add_logs"
```

---

### ⚡ Performance

#### `/optimize` — Performance Optimization
**Best for**: Slow code, resource bottlenecks, scalability issues

Structured optimization process:
1. **Measure** — Establish baseline metrics before touching code
2. **Profile** — Identify actual bottleneck (not assumed)
3. **Optimize** — Address highest-impact issues first
4. **Verify** — Confirm improvement with metrics

```
Example: "The API response takes 3 seconds. /optimize"
```

---

### 🔒 Security

#### `/secure` — Security Audit
**Best for**: Vulnerability assessment, pre-deployment hardening

Systematic security review:
- Input validation and sanitization
- Authentication and authorization checks
- Data protection (encryption, leakage)
- Common vulnerabilities (XSS, CSRF, SQL injection)
- Dependency vulnerabilities

```
Example: "Audit the user authentication flow. /secure"
```

---

### 📝 Documentation

#### `/document` — Generate Documentation
**Best for**: APIs, architecture docs, user guides, inline comments

Produces audience-appropriate documentation:
- README: Quick start, installation, usage
- API docs: Endpoints, parameters, examples
- Architecture: System design, data flow
- Inline: Complex logic, non-obvious decisions

```
Example: "Document the tutor chat API endpoints. /document"
```

---

### ♻️ Code Quality

#### `/refactor` — Structured Refactoring
**Best for**: Improving code structure without changing behavior

Safe refactoring process:
1. **Safety net** — Ensure tests exist first
2. **Identify** — Code smells, coupling, naming issues
3. **Apply patterns** — Extract, rename, move, simplify
4. **Verify** — All tests still pass

```
Example: "The UserService class is too large. /refactor"
```

---

### 🔬 Research

#### `/explore` — Time-Boxed Exploration
**Best for**: Unknowns, feasibility questions, technology evaluation

Structured spike with clear outcomes:
- **Proceed** — Viable, here's how
- **Pivot** — Alternative approach needed
- **Abandon** — Not feasible, here's why
- **Extend** — Need more investigation

```
Example: "Can we integrate real-time WebSocket updates? /explore"
```

---

## Strategic Usage Patterns

### The Debugging Ladder

For persistent bugs, escalate through workflows:

```
1. First attempt: Direct fix
   ↓ (didn't work)
2. /solve — Systematic root cause analysis
   ↓ (still unclear)
3. /add_logs — Add visibility into runtime behavior
   ↓ (logs reveal issue)
4. /solve — Now with better information
```

### The Feature Development Flow

For new features:

```
1. /reason — Analyze approach and design
2. /one_shot — Implement with continuous testing
3. /add_test — Ensure comprehensive coverage
4. /review — Validate design quality
```

### The Refactoring Approach

For improving existing code:

```
1. /build_test_suite — Establish safety net first
2. /review — Identify what needs improvement
3. /refactor — Execute structured refactoring
4. Tests validate nothing broke
```

### The Security Hardening Flow

For pre-deployment security:

```
1. /secure — Identify vulnerabilities
2. /solve — Fix each issue systematically
3. /add_test — Add security regression tests
4. /secure — Verify fixes, no new issues
```

### The Performance Improvement Cycle

For optimization work:

```
1. /optimize — Profile and identify bottlenecks
2. /explore — Spike alternative approaches if needed
3. /one_shot — Implement optimization
4. /optimize — Verify improvement with metrics
```

### The Unknowns Resolution Path

For uncertain requirements or technology:

```
1. /explore — Time-boxed investigation
2. /reason — Analyze findings, decide approach
3. /document — Record decisions and rationale
4. /one_shot — Implement with confidence
```

---

## Token-Efficient Research Workflows

These workflows optimize how Cascade explores the codebase:

| Workflow | Purpose | Token Budget |
|----------|---------|--------------|
| `/LTM` | Codebase exploration, pattern discovery | <5,000 |
| `/verify` | Testing and validation | <3,000 |
| `/consistency` | Multi-approach validation | <10,000 |
| `/POT` | Computational problem solving | <3,500 |
| `/rarr` | Fact verification | <6,000 |
| `/react` | Iterative investigation | 3,000–15,000 |

### Tool Efficiency Reference

| Tool | Token Cost | Use Case |
|------|------------|----------|
| Memory lookup | 0 | Always check first |
| `grep_search` | 500–1,000 | Pattern detection |
| `find_by_name` | 300–800 | Locating files |
| `code_search` | 1,000–2,000 | Semantic exploration |
| `read_file` (partial) | 1,000–3,000 | Targeted sections |
| `read_file` (full) | 3,000–10,000 | Last resort |

---

## Best Practices

1. **Match workflow to task** — Use `/solve` for bugs, `/reason` for decisions
2. **Combine strategically** — `/add_logs` + `/solve` for stubborn bugs
3. **Trust the structure** — Workflows encode proven problem-solving patterns
4. **Iterate up the ladder** — Start simple, escalate if needed
5. **Tests as verification** — Use test-focused workflows to validate work

---

## Anti-Patterns

- ❌ Using `/one_shot` for unclear requirements (use `/reason` first)
- ❌ Skipping tests after implementation (always `/add_test`)
- ❌ Debugging without logs (add visibility with `/add_logs`)
- ❌ Refactoring without test coverage (use `/build_test_suite` first)
- ❌ Optimizing without measuring (use `/optimize` to profile first)
- ❌ Deploying without security review (use `/secure` before launch)
- ❌ Committing to approach without spike (use `/explore` for unknowns)
- ❌ Undocumented APIs or architecture (use `/document` to capture knowledge)

---

*Last updated: January 14, 2026*
