import { spawn } from "node:child_process";

const command =
  process.platform === "win32"
    ? { cmd: "cmd.exe", args: ["/d", "/s", "/c", "npm run build"] }
    : { cmd: "npm", args: ["run", "build"] };

const child = spawn(command.cmd, command.args, {
  stdio: "inherit",
  env: {
    ...process.env,
    ANALYZE: "true",
  },
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
