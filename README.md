# DPIII NIS Roadmap — Icon fix

Fixed the TypeScript error:
```
Type error: This expression is not callable. Not all constituents of type 'IconType' are callable.
```
by **rendering icons with JSX** instead of calling them as functions:

```tsx
const Icon = (r.icon || CheckCircle2) as IconType;
<Icon className="h-5 w-5" />
```

Then:
```bash
npm install
npm run build
```
