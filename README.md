# Troubleshooting and Fixes for Vercel Deployment Issues in Next.js Monorepo

If you encounter deployment issues on Vercel, follow this structured approach to diagnose and resolve them.

---

## 1. Verify Local Build Works
Before deploying, ensure that the app builds successfully locally.

### Steps
1. **Clean the `.next` folder** to remove old artifacts:
   ```sh
   rm -rf apps/web/.next
   ```

2. **Run a local build with debugging enabled:**
   ```sh
   pnpm exec next build --debug
   ```

3. If the build fails, inspect the logs for:
   - **Missing module errors** → Check `tsconfig.json` and `paths`
   - **Static generation issues** → Identify pages that need `dynamic = "force-dynamic"`
   - **File path issues** → Ensure correct project root is set in `next.config.js`

4. If the build succeeds, check that `routes-manifest.json` is created:
   ```sh
   ls -l apps/web/.next/routes-manifest.json
   ```
   - If missing, something is wrong with the Next.js build process.

---

## 2. Ensure Correct Next.js Configurations
Check `next.config.js` for potential misconfigurations:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  transpilePackages: ['@equilibria-labs/shared-types'],
  output: 'standalone', 
  basePath: '',
};

module.exports = nextConfig;
```
- **Ensure `output: 'standalone'`** for Vercel deployments.

---

## 3. Verify Vercel Configuration
Check `vercel.json`:
```json
{
  "version": 2,
  "devCommand": "pnpm exec vercel dev",
  "buildCommand": "pnpm turbo build --filter=@equilibria-labs/web",
  "installCommand": "pnpm install",
  "framework": "nextjs"
}
```
### Fixes
- If `.next/routes-manifest.json` is not found, ensure that **`outputDirectory` is `.next`** in the Vercel project settings.
- If `buildCommand` is incorrect, try:
  ```sh
  pnpm exec vercel build
  ```

---

## 4. Check `.vercel/output` Contents
If the build is successful but deployment fails, check `.vercel/output`:
```sh
ls -l .vercel/output
```
- If `routes-manifest.json` is missing, **deploy and check production behavior**.

---

## 5. Deploy to Production
If everything works locally, deploy with:
```sh
pnpm exec vercel --prod
```
- Verify deployment URLs:
  ```sh
  pnpm exec vercel ls
  ```
- Check logs for production errors:
  ```sh
  pnpm exec vercel logs --prod
  ```

---

## What Worked Today
✅ **Clearing `.next` before building**  
✅ **Ensuring `routes-manifest.json` exists in `.next`**  
✅ **Deploying despite missing `.vercel/output/routes-manifest.json`**  
✅ **Production deployment worked even though `.vercel/output` looked incomplete**  

---

## Next Steps If Issues Persist
- **Check Vercel logs**: `pnpm exec vercel logs --prod`
- **Ensure correct Next.js version**: `pnpm list next`
- **Manually test production URL**: Open the deployed URL to confirm routing works.

This process should help resolve similar issues efficiently in the future. 🚀