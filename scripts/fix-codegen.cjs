const fs = require('fs');
const path = require('path');

const file = path.resolve(__dirname, '../src/generated/graphql.ts');

if (!fs.existsSync(file)) {
  process.exit(0);
}

let content = fs.readFileSync(file, 'utf8');

const header = '// @ts-nocheck — SuspenseQuery overloads are incompatible with Apollo Client 4\n';
if (!content.startsWith('// @ts-nocheck')) {
  content = header + content;
}

// Fix: Apollo Client 4 does not export hooks from the root — they live in @apollo/client/react
content = content.replace(
  "import * as Apollo from '@apollo/client';",
  "import * as Apollo from '@apollo/client/react';",
);

fs.writeFileSync(file, content);
