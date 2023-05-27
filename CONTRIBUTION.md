## develop

```sh
pnpm i

pnpm run dev
```

Go to chrome://extensions and 「Load unpacked」, select `dist`.

## publish

```sh
pnpm dlx commit-and-tag-version
git push --follow-tags origin main

pnpm package
```

Upload zip to store.
