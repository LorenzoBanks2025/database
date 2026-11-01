# Database

SQLite database schema and data models for the workspace. This package is ESM-only and requires Node.js 22 or newer.

## Build

```sh
pnpm --filter @nfa/database build
```

The build writes JavaScript modules and TypeScript declarations to `dist/`.

## Usage

```ts
import { createDatabase, UserModel } from "@nfa/database";

const connection = createDatabase("./app.sqlite");
const users = new UserModel(connection);

try {
  const user = users.create({
    firstName: "Ada",
    lastName: "Lovelace",
    email: "ada@example.com",
  });
  console.log(user.id);
} finally {
  connection.close();
}
```

The package root also exports the schema tables and initialization functions, the database connection types, model classes, row/insert/update types, `Address`, and `BrowserFingerprint`.
