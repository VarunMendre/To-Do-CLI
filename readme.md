# Varun's To-Do CLI (v1.0.1)

A simple, lightweight CLI tool to manage your daily tasks directly from the terminal.

## Features

* Add a task to your to-do list.
* Delete a specific task from the list.
* List all tasks.
* Clear all tasks.
* Data persistence using JSON file.

## Installation

```bash
npm install -g varun-to-do-cli
```

## Usage

### Add a Task

```bash
todo add "Buy groceries"
```

This will add the task **Buy groceries** to your `todays-task` folder.

### List All Tasks

```bash
todo list
```

Displays all saved tasks.

### Delete a Specific Task

```bash
todo delete "Buy groceries"
```

Deletes the specified task from the list.

### Clear All Tasks

```bash
todo clear
```

Removes all tasks.

## File Structure

```
project/
│
├── todays-task/
│   └── tasks.json   # Stores all your tasks
└── index.js         # CLI logic
```

## Example Workflow

```bash
# Add tasks
todo add "Finish Node.js project"
todo add "Prepare for AI exam"

# View tasks
todo list

# Delete a task
todo delete "Finish Node.js project"

# Clear all tasks
todo clear
```

## Requirements

* Node.js v14 or higher
* NPM

## Version

**1.0.1** - Initial public release with task add, list, delete, and clear functionality.

## License

MIT License

- we will add some new features in upcoming version