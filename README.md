# Svelte skeleton

This is a skeleton of a svelte project using my preferred workflow. It includes:
1. SvelteKit static rendering (so the SSR is disabled)
2. Typescript
3. Tailwind
4. Playwright
5. Shadcn-svelte
6. Lucide icons
7. A bunch of free sans serif fonts auto included in the head
8. Automatic deployment to gh-pages when you push to main (includes running playwright and vitest tests) (Note: must manually give write access to GITUB_TOKEN)
9. Automatic sorting of tailwind styles with prettier

I heavily used [this medium article](https://medium.com/front-end-weekly/ci-cd-with-github-actions-to-deploy-on-github-pages-73e225f8f131) as a guide.

# Nontrivial discoveries while setting up
1. Creating a project with just Svelte (no kit) through vite has errors. I used SvelteKit and disabled SSR instead.
2. You need a static svelte adapter to deploy to gh-pages.
3. The export const prerender = true; line for static sites needs to go in a separately created and otherwise empty +layout.ts file, not the +layout.svelte file.
4. Github pages automatically uses Jekyll to display the webpage unless you include a .nojekyll file in the root of the build folder. You need to put a .nojekyll file in the /static folder (which gets transferred over to the /build folder) for manual deployments, and your deploy command, which is gh-pages -d build, must also have the -t true option or it won't copy the dot file over to the gh-pages branch (even though it will show up in the local /build folder). This may not be necessary for the automatic deployment since that has a configurable option for using jekyll or not - right now it's not set so my manually created .nojekyll file takes care of it.
5. The playwright tests are somewhat strict, so if they find multiple elements they will throw an error. The default test threw an error when I changed h1 to div since there were multiple divs.
6. The CI yaml workflow given in the medium article does not install the dependencies necessary for playwright to work; I added them with the Playwright documentation [https://playwright.dev/docs/ci-intro].
7. The GITHUB_TOKEN token explicitly needs to be given write access to push to the gh-pages branch in settings/actions.
8. The prerendering will fail the build on the github pages side if there's any routes that don't immediately resolve, so I configured the prerenderer to warn (but not fail) on HTTP errors in svelte.config.js.
9. In svelte.config.js, we configure the route which the project will be deployed to in production. This must be confgured for resources to fetch properly; also, any route that's fetching a local resource must be prefixed with ${base} and have the line: import { base } from "$app/paths"; at the top
10. If using a custom favicon that exists in the static folder, the routes in app.html must be prefixed with %sveltekit.assets%
11. To disable prettier sorting of tailwind styles, remove "prettier-plugin-tailwindcss" from .prettierrc
12. I had an issue once with the case of app.css, where it changed to uppercase on the github pages side and failed to import in the build in +layout.svelte. You may need to change the import to App.css.



Below this line is the default sveltekit readme.

# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.
