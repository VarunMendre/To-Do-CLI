#!/usr/bin/env node
// Node.js CLI to manage a "todays-task" folder with basic file operations.
// Commands supported: create, rename, delete, delete-dir, list
// Usage examples:
//   ./app.js create folderName fileName
//   ./app.js rename oldFile newFile [folderName]
//   ./app.js rename-dir oldFolder newFolder [parentFolder]
//   ./app.js delete fileName [folderName]
//   ./app.js delete-dir folderName
//   ./app.js list [folderName]

import fs from "fs/promises";

// --- Command-line arguments ---
const command = process.argv[2]; // main command
const arg1 = process.argv[3]; // first argument (file/folder name)
const arg2 = process.argv[4]; // second argument (new name for rename)
const arg3 = process.argv[5]; // optional folder name for context

// Default folder for tasks
const taskFolder = "./todays-task";
const folderName = arg3 || taskFolder; // folder context for operations

try {
  // Ensure main task folder exists
  await fs.mkdir(taskFolder, { recursive: true });

  switch (command) {
    // --- CREATE a new file in a folder ---
    case "create":
      if (!arg1 || !arg2) {
        console.error("❌ Please provide a folder name and a file name to create.");
        break;
      }

      try {
        // Create folder if it doesn't exist
        try {
          await fs.access(arg1);
          console.log(`📂 Folder '${arg1}' already exists`);
        } catch {
          await fs.mkdir(arg1, { recursive: true });
          console.log(`✅ Folder '${arg1}' created`);
        }

        // Create the file inside the folder
        await fs.writeFile(`${arg1}/${arg2}`, "");
        console.log(`✅ File '${arg2}' created inside folder '${arg1}'`);
      } catch (error) {
        console.error(`❌ Error creating file: ${error.message}`);
      }
      break;

    // --- RENAME an existing file ---
    case "rename":
      if (!arg1 || !arg2) {
        console.error("❌ Please provide old and new file names.");
        break;
      }

      try {
        const oldPath = `${folderName}/${arg1}`;
        const newPath = `${folderName}/${arg2}`;
        await fs.rename(oldPath, newPath);
        console.log(`✅ File renamed from '${arg1}' → '${arg2}' in folder '${folderName}'`);
      } catch (error) {
        console.error(`❌ Error renaming file: ${error.message}`);
      }
      break;

    // --- RENAME a folder ---
    case "rename-dir":
      if (!arg1 || !arg2) {
        console.error("❌ Please provide old and new folder names.");
        break;
      }

      try {
        const oldFolderPath = folderName === taskFolder ? arg1 : `${folderName}/${arg1}`;
        const newFolderPath = folderName === taskFolder ? arg2 : `${folderName}/${arg2}`;
        await fs.rename(oldFolderPath, newFolderPath);
        console.log(`✅ Folder renamed from '${arg1}' → '${arg2}' in '${folderName}'`);
      } catch (error) {
        console.error(`❌ Error renaming folder: ${error.message}`);
      }
      break;

    // --- DELETE a file ---
    case "delete":
      if (!arg1) {
        console.error("❌ Please provide a file name to delete.");
        break;
      }

      const fileFolder = arg2 || taskFolder;
      const filePath = `${fileFolder}/${arg1}`;

      try {
        await fs.unlink(filePath);
        console.log(`🗑️ Deleted file '${arg1}' from folder '${fileFolder}'`);
      } catch (error) {
        console.error(`❌ Error deleting file: ${error.message}`);
      }
      break;

    // --- DELETE a folder ---
    case "delete-dir":
      if (!arg1) {
        console.error("❌ Please provide a folder name to delete.");
        break;
      }

      try {
        await fs.rm(`${arg1}`, { recursive: true, force: true });
        console.log(`🗑️ Folder '${arg1}' deleted successfully`);
      } catch (error) {
        console.error(`❌ Error deleting folder: ${error.message}`);
      }
      break;

    // --- LIST all files in a folder ---
    case "list":
      const folderToList = arg1 || taskFolder;

      try {
        const files = await fs.readdir(folderToList);

        if (files.length === 0) {
          console.log(`📂 No files in folder '${folderToList}'`);
          break;
        }

        console.log(`📋 Files in folder '${folderToList}':`);
        files.forEach((file) => console.log(`- ${file}`));
      } catch (error) {
        console.error(`❌ Error reading folder: ${error.message}`);
      }
      break;

    // --- UNKNOWN command ---
    default:
      console.log(`❓ Unknown command: ${command}`);
      console.log("Usage:");
      console.log("  create <folder> <filename>       Create a new file in folder");
      console.log("  rename <old> <new> [folder]     Rename a file in folder");
      console.log("  rename-dir <old> <new> [folder] Rename a folder");
      console.log("  delete <filename> [folder]      Delete a file from folder");
      console.log("  delete-dir <folder>              Delete a folder");
      console.log("  list [folder]                    List all files in folder");
  }
} catch (err) {
  console.error("❌ Error:", err.message);
}
