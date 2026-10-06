# The Dragon Bible

An original fantasy setting with seven books and 27 published chapters. All published lore is freely readable. The reader includes chapter links, browser narration, search, bookmarks, reading progress, and a ten-question dragon quiz.

## Run and test

Use Node.js 22.12 or later:

```sh
npm ci
npm test
npm start
```

Open http://localhost:3000. No keys are required to browse the library or test the site. `npm test` exercises all published chapters, reader interactions, Oracle rendering, local links, and the API using mocked Stripe and Anthropic clients. It does not charge cards or call paid AI services.

## Current hosting

The production domain uses GitHub Pages from the root of `main`. Pushing a feature branch does not publish it. Merging into `main` publishes the static site.

GitHub Pages cannot run `server.js`. The static `api/config` file reports that checkout and live AI are unavailable. The Oracle displays explicitly labeled prewritten examples. No payment success or subscriber access is simulated.

To enable paid services, deploy this repository on a Node-capable host behind HTTPS, or route `/api/*` on the same domain to the Node server. The API intentionally accepts only same-origin browser requests. Configure `.env` using `.env.example`, keep secrets out of Git, and configure the public `DOMAIN` and host binding. Configure the exact trusted proxy count when applicable. Do not point a public site at localhost.

Checkout is enabled only when Stripe, both the selected price and a signing secret, and the live Oracle client are configured. The API checks that the Stripe price matches the displayed $5/month or $40 one-time USD plan before creating checkout. A valid configured key is not a guarantee that an external service is operational; verify both integrations in Stripe test mode before enabling live purchases. Configure a currently available Anthropic model for your account.

## Access and billing

A confirmed paid Stripe session produces a signed access token saved in that browser. Every protected request rechecks the purchase and current entitlement with Stripe. A customer ID or a browser `subscriber` flag alone grants no access. Monthly cancellations and refunded or disputed lifetime payments stop subscriber access. The billing portal uses the verified customer and a server-controlled return URL.

The private checkout confirmation link can restore access on another browser. This is a bearer-link access mechanism, not a full account system; keep it private. Changing `ACCESS_TOKEN_SECRET` invalidates saved tokens. Existing purchases using different Stripe price IDs or amounts require a deliberate migration before enabling this version of the API. No customer data is migrated by this change.

The demo Oracle allows three successful requests per IP per 24 hours. Its limiter is held in memory, resets on restart, and is intended for a single instance. A multi-instance deployment needs a shared limiter before launch.

## Content and files

The playable mobile prototype lives at `/app/`: seven lore quests, a growing dragon companion, collectible memories, and the complete free archive. See [app/README.md](app/README.md) for the product concept, revenue hypotheses, installation details, and limitations. It uses local progress and has no paid purchases or accounts.

- `content.js`: original published lore and quiz data, preserved from the previous reader.
- `index.html`, `site.css`, `script.js`: home page and reader.
- `site.js`: shared mobile navigation for home and article pages.
- `payment.js`, `oracle.js`, `success.js`: service availability, payments, and Oracle UI.
- `server.js`: optional API and allowlisted public file server.
- `tests/`: regression tests; GitHub Actions runs them on pushes and pull requests.

Reading progress, bookmarks, and notes are local to a browser; storage failures do not prevent reading. Earlier local comments are preserved as private reading notes. Narration depends on the voices supported by the user's device. The old cache-first service worker retires its own caches so it cannot indefinitely pin visitors to obsolete files.

Expanded compendium PDFs, faction dossiers, enhanced recordings, email capture, and a community service are not implemented deliverables in this repository. Marketing text should not promise that they are already available. The sampler can be printed or saved as PDF using the browser.

Original fiction by Noah Wilson. Contact: noah@dragonbible.com.
