// app/api/utils/soroban.ts
import { exec } from "child_process";
import { NextResponse } from "next/server";

// Utility function to execute soroban commands
const executeCommand = (command: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) {
        reject(stderr);
      } else {
        resolve(stdout);
      }
    });
  });
};

// Common error handler with proper typing
const handleError = (error: Error | unknown) => {
  console.error("API Error:", error);
  const errorMessage = error instanceof Error ? error.message : String(error);
  return NextResponse.json({ error: errorMessage }, { status: 500 });
};

export { executeCommand, handleError };
