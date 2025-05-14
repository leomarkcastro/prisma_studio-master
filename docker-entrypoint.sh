#!/bin/sh
set -e

# Run the provider update script
echo "Updating schema.prisma with provider: ${DATABASE_PROVIDER:-postgresql}"
node update-schema.js

# Run prisma db pull to update the schema
echo "Running prisma db pull..."
yarn prisma db pull

# Start Prisma Studio
echo "Starting Prisma Studio..."
exec yarn prisma studio 