# Weather In New Tab - Workspace Rules & Architecture Guide

This project is a browser extension built with WXT and React. To maintain clean operations, minimize token/context usage, and ensure consistent project style, all models and agents in future sessions must adhere to the rules outlined here.

## 📌 Codebase Reference

Before inspecting the workspace files, refer to the codebase specification file for the folder structure, files list, and function details:
👉 [agent.md](file:///Users/eneszengin/Desktop/workspace/weather-extension/agent.md)

## 🛠️ Rules for Future Models & Agents

1. **Consult agent.md First**: At the start of any new session, read [agent.md](file:///Users/eneszengin/Desktop/workspace/weather-extension/agent.md) to understand the codebase. Do not load/view all individual files unless specifically needed for the task.
2. **Keep agent.md Updated**: If you change the folder structure, add/remove files, or update any function parameters/types, you must update the specifications in [agent.md](file:///Users/eneszengin/Desktop/workspace/weather-extension/agent.md) immediately.
3. **Log Your Actions**: At the end of the session, append an entry to the **Change Log & Project History** table at the bottom of [agent.md](file:///Users/eneszengin/Desktop/workspace/weather-extension/agent.md) detailing the date, model name, and description of your changes.
4. **Coding Integrity**: Always preserve existing comments, hooks, and configuration structures unless explicitly asked to modify them.
