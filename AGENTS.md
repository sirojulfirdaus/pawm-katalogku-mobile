This is a JavaScript Expo/React Native mobile application. Prioritize mobile-first patterns, performance, and cross-platform compatibility.

## Expo has changed — do not trust your training data

Expo ships breaking changes every SDK release. APIs you remember are likely renamed, moved, or removed. Before writing any code that touches an Expo, EAS, or React Native API:

1. Read the major version of the `expo` package in `package.json`.
2. Fetch the matching versioned docs: `https://docs.expo.dev/versions/v<major>.0.0/`
3. For anything else, fetch https://docs.expo.dev/llms.txt — an index of all Expo docs with corrections to common LLM misconceptions. Follow its links to the specific page you need; never answer from memory.

## Commands

This repository uses npm (`package-lock.json`). Use `npx expo install` for Expo-supported dependencies so Expo selects SDK-compatible versions.

```bash
npx expo install <package>  # install an Expo-supported dependency when needed
npx expo start              # start the dev server
npx expo install --check    # check dependency versions
npx expo-doctor             # diagnose dependency and config issues when available
```

Run lint and typecheck before declaring implementation work done when the required tooling and configuration are available: use `npx expo lint` for a configured ESLint setup and `npx tsc --noEmit` for a configured TypeScript or JavaScript typecheck. This JavaScript project currently has no local ESLint or TypeScript setup; do not assume either command is ready or let `expo lint` install packages or create configuration unexpectedly. Use an appropriate available alternative and report any checks that could not run. When dependency validation is relevant, use `npx expo install --check` or Expo Doctor; do not run `npx expo install --fix` without a technical need because it changes dependencies.

## Navigation & Routing

This project follows the PAWM course architecture.

- Use React Navigation, not Expo Router. Do not create `src/app/` or `_layout.tsx` files, or change the entry point to Expo Router.
- Module 4: Implement responsive `src/screens/HomeScreen.js` and `src/screens/DetailScreen.js` to match Figma; use `App.js` temporarily to test both layouts.
- Module 5: Implement navigation in `src/navigation/AppNavigator.js` using `@react-navigation/native`, `@react-navigation/native-stack`, and `@react-navigation/bottom-tabs`.
- Navigation structure:
  - Stack: Main (TabNavigator), Detail, Tentang.
  - Tabs: Beranda, Favorit, Profil, Keranjang.
- Module 6: Use `src/context/`, `src/hooks/`, and `src/utils/` for favorites with Context API, form management, and validation.

## Building with EAS

Use EAS to build, sign, and submit the app in the cloud (`eas build`, `eas submit`) and to ship over-the-air updates (`eas update`) — no local Xcode or Android Studio required. Run EAS CLI as `bunx eas-cli <command>` in Bun projects, or `npx eas-cli@latest <command>` otherwise; substitute that for bare `eas` in docs examples.
Docs: https://docs.expo.dev/eas/index.md

## Rules

- If `ios/` and `android/` directories do not exist, they are generated (Continuous Native Generation). Never create or edit them by hand — configure native behavior in `app.json` and config plugins.
- Expo Go supports native libraries bundled with it. A development build is required when a needed native module or native configuration is not supported by Expo Go; use `npx expo run:ios|android` locally or `eas build --profile development`.
- Prefer recommended Expo modules over third-party libraries, and check your available skills before adding dependencies. Docs: https://docs.expo.dev/versions/latest/index.md
- Preserve the KatalogKu design system and fonts from the Module 1 Figma design; reuse the Module 3 components.
- Keep the existing repository and architecture. Do not create a new Expo project or redesign approved UI.
- Prioritize mandatory requirements in the practicum slides; do not add features outside the current module.
- Do not change `app.json`, dependencies, or the entry point without a necessary technical reason.
