# Dragon Bible: The Remembering

A playable mobile web prototype for readers who enjoy fantasy worlds, small discoveries, and a companion that grows with them. Open `/app/` after running the root project's `npm start`. It also works on static HTTPS hosting, including GitHub Pages. This is not an App Store or Google Play release.

## The first experience

Read four original verses, answer a lore question, recover a memory, and earn 40 XP. The seven quests introduce one book each. Wrong answers have no penalty. Completed quests can be replayed without farming additional rewards. Four companion forms and three earned appearances are reachable in the first journey. The archive includes all 27 original chapters.

Names, completion, appearance, and active days are saved locally. Skipped days never remove progress. No account, analytics, notifications, ads, checkout, AI calls, or real-money rewards are part of this prototype. Local progress is editable by the player and must never establish ownership of a paid product.

The service worker is scoped to `/app/`, uses a distinct `db-quest-` cache namespace, and downloads the app and lore after the first online visit. It uses network-first reads with a four-second offline fallback. Increase the cache version when changing the precache list. It does not cache API requests or the payment flow. Browser home-screen installation support varies; the app provides instructions and uses a native install prompt where offered.

## Revenue recommendation

Start by validating that the journey is enjoyable. The distinctive product is a pocket mythology game with a dragon companion. The reading archive remains free.

Pricing hypotheses to test, not live offers:

- Optional appearance packs around $2.99–$4.99, purchased directly with a preview of exactly what the player receives.
- New authored quest collections around $4.99, with a free opening quest. Write and test the content before selling it.
- A recurring membership only after establishing a reliable release schedule. Avoid a subscription that adds no continuing value.
- DM compendiums can remain a separate product for the tabletop audience. Do not assume casual players and DMs want the same purchase.

Do not begin with paid XP, lost-streak penalties, energy gates, random paid rewards, or unlimited lifetime AI. They add complexity or continuing costs before the core experience is proven. At a hypothetical $4.99 price, 100 purchases produce $499 gross, before fees, taxes, refunds, production, and operating costs. This arithmetic is not a sales forecast.

## The next validation step

Give the prototype to 10–20 fantasy readers. Observe whether they can finish the first quest unaided, understand why the dragon changes, voluntarily return for a second session, and complete the journey. Ask what they would want to buy after playing. This version sends no analytics, so collect feedback directly or add a clearly disclosed measurement system later. Revenue needs evidence of demand, not just a working checkout.

Then expand the story with meaningful choices and replayable authored encounters. Develop a content pipeline before promising monthly releases. Add optional accounts and cloud saves before paid digital ownership, server-verified entitlements and purchase restoration, accessibility testing, and device testing. A React Native/Expo client or a packaged web client are options to evaluate after playtesting; neither is included here.

## Store release considerations

Store-distributed digital purchases need platform-aware billing, purchase restoration, and a review of the applicable regional rules. The website's Stripe integration should not simply be copied into a native game's purchase screen. As checked October 6, 2026:

- [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) cover in-app purchases, digital content, subscriptions, and regional exceptions.
- [Google Play Payments policy](https://support.google.com/googleplay/android-developer/answer/9858738?hl=en) generally requires Play billing for in-app digital goods, subject to its stated exceptions and programs.
- [Apple Developer Program enrollment](https://developer.apple.com/help/account/membership/program-enrollment/) lists a $99 annual membership fee in USD, with regional pricing.
- [MDN's installable PWA guide](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) describes browser installation and manifest requirements.

## Verification

Root `npm test` covers completion and replay rules, forms and cosmetic unlocks, all seven quest flows, all 27 archive chapters, reload persistence, unsafe names, static asset serving, manifest icon sizes, and offline cache scope/fallback. Browser checks complement these tests. Physical-device installation, native store billing, cloud sync, and revenue remain unvalidated.
