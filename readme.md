# To-Do CLI

A simple and efficient Command-Line Interface (CLI) application to manage your daily tasks directly from the terminal. Built with Node.js, this tool allows you to create, list, rename, and delete tasks or folders for better organization.

## 📦 Installation

You can install the package globally from npm:

```bash
npm install -g varun-to-do-cli
```

## 🚀 Usage

After installation, you can use the CLI by running:

```bash
todo
```

### Commands

| Command    | Arguments                               | Description                   | Example                                            |
| ---------- | --------------------------------------- | ----------------------------- | -------------------------------------------------- |
| create     | <folder> <filename>                     | Create a new file in a folder | todo create todays-task task1.txt                  |
| rename     | <oldFile> <newFile> \[folder]           | Rename a file                 | todo rename task1.txt task-renamed.txt todays-task |
| rename-dir | <oldFolder> <newFolder> \[parentFolder] | Rename a folder               | todo rename-dir old-folder new-folder todays-task  |
| delete     | <filename> \[folder]                    | Delete a file                 | todo delete task-renamed.txt todays-task           |
| delete-dir | <folder>                                | Delete a folder               | todo delete-dir old-folder                         |
| list       | \[folder]                               | List all files in a folder    | todo list todays-task                              |

## 🌟 Features

* Organize tasks in folders.
* Add new task files quickly.
* Rename files or folders easily.
* Delete tasks or folders safely.
* List all tasks in a folder.
* Lightweight and fast.

## 💼 Repository

GitHub Repository: [To-Do-CLI](https://github.com/yourusername/To-Do-CLI)

## 🔗 NPM Package

NPM: [varun-to-do-cli](https://www.npmjs.com/package/varun-to-do-cli)

## 📜 License

This project is licensed under the MIT License.

---

Easily manage your daily tasks with folder organization directly from the terminal!
