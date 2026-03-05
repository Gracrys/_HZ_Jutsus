# Database Layer

This folder contains Sequelize ORM setup and models for the project.

## Structure

- `sequelize.ts` - Sequelize instance configuration (SQLite)
- `models/Jutsu.ts` - Jutsu model schema
- `index.ts` - Export and sync utilities

## Usage

### Initialize Database on Server Startup

In your server file:

```typescript
import { syncDatabase } from '$lib/server/db';

// On startup
await syncDatabase();
```

### Using the Model

```typescript
import models from '$lib/server/db';
const { Jutsu } = models;

// Create
const jutsu = await Jutsu.create({
  name: 'Fireball',
  romanji: 'Go Gouka no Jutsu',
  element: 'Fire',
  kanji: '炎',
  symbol: '🔥',
  details: { spread: 10, distance: 50 }
});

// Read
const all = await Jutsu.findAll();
const one = await Jutsu.findByPk(1);

// Update
await jutsu.update({ element: 'Lightning' });

// Delete
await jutsu.destroy();
```

## Database File

The SQLite database is stored at:
- `src/lib/server/db/jutsus.db`
