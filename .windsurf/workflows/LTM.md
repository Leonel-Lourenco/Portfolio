---
description: Long-Term Memory - Token-efficient codebase exploration
---

# LTM Workflow: Efficient Code Analysis

## Token-Efficient Exploration Strategy

### 1. Start with Targeted Search (NOT full file reads)
```
Use code_search for initial exploration:
- code_search(search_folder_absolute_uri="[project_root]/src", 
              search_term="Find all uses of [PATTERN]")
```

### 2. Use grep_search for Pattern Detection
```
grep_search(SearchPath="src/", Query="[PATTERN]", 
            Includes=["*.py"], MatchPerLine=False)
# Set MatchPerLine=True ONLY when you need surrounding context
```

### 3. Read Files Selectively
```
# BAD: read_file("path/to/file.py") - reads entire file
# GOOD: read_file("path/to/file.py", offset=50, limit=30) - lines 50-80 only
```

### 4. Use find_by_name Before Reading
```
find_by_name(SearchDirectory="src/", Pattern="*builder*.py", Extensions=["py"])
# Identify targets first, then read only what's needed
```

### 5. Store Patterns in Memories
```
create_memory for architectural patterns, common structures, naming conventions
# Avoid re-reading the same information
```

## Universal Exploration Patterns

### Architecture References
- Always check documentation (README, Architecture.md, docs/) via memory first
- Use grep_search to find specific sections rather than reading entire docs

### Common Patterns to Discover
- **Entry points**: Main files, route handlers, CLI commands
- **Core abstractions**: Base classes, interfaces, common utilities
- **Configuration**: Config files, environment variables, constants
- **Data flow**: Models, schemas, transformations

### What to Store in Memories
- Architectural patterns and project structure
- Naming conventions and coding standards
- Common imports and dependencies
- Key file locations and their purposes

### Token Budget Guidelines
- Initial exploration: <5,000 tokens
- Implementation: <15,000 tokens per major feature
- Testing/verification: <3,000 tokens

## Output
Store discovered patterns in memories with tags: `architecture`, `pattern`, `[project_name]`
