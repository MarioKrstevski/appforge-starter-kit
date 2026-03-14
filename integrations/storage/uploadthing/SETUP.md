# Uploadthing Setup

## 1. Install dependencies

```bash
npm install uploadthing @uploadthing/react
```

## 2. Set environment variables

```
UPLOADTHING_TOKEN=
```

Get your token from uploadthing.com → your app → API Keys.

## 3. Use in your app

```ts
import { useUploadThing } from '@/lib/uploadthing'
```
