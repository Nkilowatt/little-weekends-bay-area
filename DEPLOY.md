# Deployment Guide

The current app is a static site, so the fastest sharing path is static hosting.

## Recommended Option: Netlify Drop

Good for fast friend testing because it does not require changing the codebase.

Steps:

1. Go to `https://app.netlify.com/drop`.
2. Drag the project folder into the page, or upload only these files:
   - `index.html`
   - `styles.css`
   - `app.js`
   - `netlify.toml`
3. Netlify gives you a public URL.
4. Send that URL to friends with the message in `FRIEND_TESTING_MESSAGE.md`.

Pros:

- Fastest.
- Works well for static prototypes.
- Easy to replace with a newer version.

Cons:

- Manual upload unless connected to Git.

## Option 2: GitHub Pages

Good once the project is in a GitHub repository.

Steps:

1. Push this repo to GitHub.
2. Open repository settings.
3. Enable Pages from the main branch root.
4. Send the generated GitHub Pages URL.

Pros:

- Free and stable.
- Good for versioned prototypes.

Cons:

- Requires GitHub repository setup.

## Option 3: Vercel

Good if the next step is moving to Next.js.

Steps:

1. Import the repository into Vercel.
2. Keep the project as a static site for now.
3. Later, replace the static prototype with a Next.js app.

Pros:

- Best fit for the future Next.js version.
- Preview deployments are useful.

Cons:

- Slightly more setup than Netlify Drop.

## My Recommendation

For this exact moment, use Netlify Drop for the first friend test. Once the feedback is useful, move the project to GitHub and then choose either GitHub Pages for static prototypes or Vercel for the Next.js version.
