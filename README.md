# TodoMan CLI

A simple Command Line Interface (CLI) tool built with Node.js to manage your to-do tasks directly from the terminal. The app supports essential task management operations such as adding, updating, removing, and listing tasks. All tasks are stored in a `db.json` file located in the root directory.

## Features:

- Add new tasks to your to-do list.
- List all tasks.
- Update tasks (toggle complete status).
- Remove tasks.
- Clear all tasks.

## Installation

1. Clone this repository:

   ```bash
   git clone https://github.com/yourusername/todoman-cli.git
   ```

2. Navigate to the project directory:

   ```bash
   cd todoman-cli
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

## Usage

### Available Commands

- **Add a new task:**

  ```bash
  todo new <task>
  ```

  Example:

  ```bash
  todo new "Buy groceries"
  ```

- **List all tasks:**

  ```bash
  todo list
  ```

- **Update task (toggle complete status):**

  ```bash
  todo update <id>
  ```

  Example:

  ```bash
  todo update 1
  ```

- **Remove a task:**

  ```bash
  todo remove <id>
  ```

  Example:

  ```bash
  todo remove 1
  ```

- **Clear all tasks:**
  ```bash
  todo clear
  ```

## Data Storage

All tasks are saved in a `db.json` file located in the root directory of the project. Ensure the file is created if it doesn't exist already.
