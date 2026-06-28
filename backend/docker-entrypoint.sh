#!/bin/sh
set -eu

echo "Starting Tolongin backend (NODE_ENV=${NODE_ENV:-development})"

if [ -n "${DATABASE_URL:-}" ]; then
  echo "Waiting for database..."
  i=0
  until printf 'SELECT 1;' | npx --no-install prisma db execute --stdin >/dev/null 2>&1; do
    i=$((i + 1))
    if [ "$i" -ge 30 ]; then
      echo "Database not reachable after 60 seconds." >&2
      exit 1
    fi
    sleep 2
  done
fi

echo "Applying database migrations..."
npx --no-install prisma migrate deploy

if [ "${SEED_ON_BOOT:-false}" = "true" ]; then
  echo "Seeding database..."
  npx --no-install prisma db seed
fi

exec "$@"