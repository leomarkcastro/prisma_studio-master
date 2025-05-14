const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

// Get the provider from environment variable or default to postgresql
const provider = process.env.DATABASE_PROVIDER || 'postgresql';
const validProviders = ['postgresql', 'mysql', 'sqlite', 'sqlserver', 'mongodb', 'cockroachdb'];

if (!validProviders.includes(provider)) {
  console.error(`Error: Invalid database provider "${provider}". Valid options are: ${validProviders.join(', ')}`);
  process.exit(1);
}

// Path to the schema file
const schemaPath = path.join(__dirname, 'prisma', 'schema.prisma');

try {
  // Read the current schema
  let schemaContent = fs.readFileSync(schemaPath, 'utf8');
  
  // Replace the provider in the datasource section
  schemaContent = schemaContent.replace(
    /datasource\s+db\s+{\s+provider\s*=\s*"[^"]*"/s,
    `datasource db {\n  provider = "${provider}"`
  );
  
  // Write the updated schema back to the file
  fs.writeFileSync(schemaPath, schemaContent);
  
  console.log(`Successfully updated schema.prisma to use ${provider} provider.`);
} catch (error) {
  console.error(`Error updating schema.prisma: ${error.message}`);
  process.exit(1);
} 