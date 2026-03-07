# Push Docs And Repo

Use these commands from the project root (`/workspaces/AutoServiceHoute`).

## 1) Build docs output

```bash
npm run build
```

This updates the `docs/` folder with the latest production files.

## 2) Commit and push everything

```bash
git add -A
git commit -m "Update docs and source files"
git push origin main
```

## Optional quick check

```bash
git status --short
```

If it prints nothing, everything is committed and pushed.
