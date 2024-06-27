# WeChat Group Finder
A platform to find and share WeChat groups for your hobbies and interests.
Still in early development stages, not yet launched.


## Getting Started

### Set local environment variables:
Run this command:
```bash
cp .env.example .env.local
```
Open .env.local in your text editor and fill out the variables

### Run migrations:
```bash
# update the database schema to the latest version
pnpm migrate latest
# run the next migration that has not yet been run 
pnpm migrate up 
# undo the last/specified migration that was run 
pnpm migrate down
# view all migration commands
pnpm migrate
```

### Run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
