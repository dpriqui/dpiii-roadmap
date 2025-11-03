# DPIII NIS Roadmap — Clean header fix

Fixed the build error `Expected unicode escape` by ensuring `app/page.tsx` starts with **exactly**:
```
'use client';
```
(no BOM or stray characters). Also standardized LF line endings.

Quick start:
```bash
npm install
npm run dev
```
