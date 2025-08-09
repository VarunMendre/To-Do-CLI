#!/usr/bin/env node
// Node.js script to manage a simple "todays-task" folder with basic file operations.
// Supports: create, rename, delete, and list commands.
// Usage examples:
//   ./app.js create task1.txt
//   ./app.js rename task1.txt task-renamed.txt
//   ./app.js delete task-renamed.txt
//   ./app.js list

import fs from "fs/promises"; // Promise-based file system API

// --- Command-line arguments ---
const command = process.argv[2]; // The main command: create, rename, delete, list
const arg1 = process.argv[3];    // First argument: file name or old name
const arg2 = process.argv[4];    // Second argument: new file name for rename

// Folder where all task files will be stored
const taskFolder = "./todays-task";

try {
  // Ensure that the folder exists before performing any action
  await fs.mkdir(taskFolder, { recursive: true });

  switch (command) {

    // --- CREATE a new file ---
    case "create":
      if (!arg1) {
        console.error("❌ Please provide a file name.");
        break;
      }
      await fs.writeFile(`${taskFolder}/${arg1}`, ""); // Create empty file
      console.log(`✅ File '${arg1}' created inside todays-task folder`);
      break;

    // --- RENAME an existing file ---
    case "rename":
      if (!arg1 || !arg2) {
        console.error("❌ Please provide old and new names.");
        break;
      }
      await fs.rename(`${taskFolder}/${arg1}`, `${taskFolder}/${arg2}`);
      console.log(`✅ File renamed from '${arg1}' → '${arg2}'`);
      break;

    // --- DELETE a file ---
    case "delete":
      if (!arg1) {
        console.error("❌ Please provide a file name to delete.");
        break;
      }
      await fs.unlink(`${taskFolder}/${arg1}`);
      console.log(`🗑️ Deleted file: ${arg1}`);
      break;

    // --- LIST all files ---
    case "list":
      const files = await fs.readdir(taskFolder); // Read folder contents

      if (files.length === 0) {
        console.log("📂 No files in the todays-task folder");
        break;
      }

      console.log("📋 Files in todays-task folder:");
      files.forEach(file => console.log(`- ${file}`));
      break;

    // --- UNKNOWN command ---
    default:
      console.log(`❓ Unknown command: ${command}`);
      console.log("Usage:");
      console.log("  create <filename>       Create a new file");
      console.log("  rename <old> <new>      Rename a file");
      console.log("  delete <filename>       Delete a file");
      console.log("  list                    List all files");
  }

} catch (err) {
  // Catch and display any file system errors
  console.error("❌ Error:", err.message);
}
