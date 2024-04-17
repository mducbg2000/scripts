# 🛠️ Repository for tool/scripts

## 1️⃣ Install dependencies

Recommend pnpm

```bash
npm i
```

or

```bash
pnpm i
```

## 2️⃣ Project structure

Project contains 2 main folder:

- `src` for source code
- `static` for other static files as pdf, image...

Access static files by relative path:

```typescript
import { readFileSync } from "node:fs";
const fileContent: Buffer = readFileSync("static/file.pdf");
```

## 3️⃣ Running scripts

Scripts written in Typescript and executed by [TypeScript Execute - tsx](https://github.com/privatenumber/tsx), for running a script file:

```bash
npx tsx src/${file-name}.ts
```

or with pnpm:

```bash
pnpm tsx src/${file-name}.ts
```
