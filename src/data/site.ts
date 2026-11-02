// Kept free of imports: the build script reads it with Node.

/** Everything about the site's owner that only the owner can fill in, in one place. */
export const SITE = {
  name: "I'm living with psoriasis",
  // TODO(owner): the address the contact form writes to.
  email: 'hello@example.com',
  url: 'https://imlivingwithpsoriasis.vercel.app',
  repo: 'https://github.com/ElNahoko/imlivingwithpsoriasis',
  // TODO(owner): replace with your own words. Shown on the About page.
  story: [
    'I live with psoriasis. This is where I will tell that story: when it started, what I tried, what changed, and what I wish someone had told me at the beginning.',
  ],
}
