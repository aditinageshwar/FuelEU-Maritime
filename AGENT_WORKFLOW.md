# AI Agent Workflow Log

## Agents Used
- **GitHub Copilot**: For inline code completions, boilerplate generation (e.g., React components, Express routes), and quick fixes.
- **Claude Code**: For refactoring domain logic, ensuring Hexagonal Architecture compliance, and generating unit tests.
- **Cursor Agent**: For task planning via `tasks.md` (e.g., breaking down frontend tabs and backend endpoints into subtasks), and iterative code generation.

## Prompts & Outputs
- **Example 1: Generating a React Component for Routes Tab**  
  Prompt: "Generate a React functional component for a Routes tab using TypeScript, TailwindCSS, and Hexagonal Architecture. It should fetch routes from an API, display a table with filters, and have a 'Set Baseline' button. Use ports for API calls."  
  Output: Copilot generated the initial component structure, including hooks and table markup. I refined it by adding error handling and ensuring it calls an outbound port (e.g., `RouteApiPort`).  
  Refined Snippet:  
  ```typescript
  // src/adapters/ui/routes/RoutesTab.tsx
  import { useEffect, useState } from 'react';
  import { RouteApiPort } from '../../core/ports/outbound/RouteApiPort';
  // ... (full component with table and filters)