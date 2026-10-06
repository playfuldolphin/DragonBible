# We Had Wings collection

`shop.html` is the public-facing collection preview for dragonbible.com. It intentionally says orders are not open and labels the displayed prices as planned launch prices. It has no cart, payment collection, or fabricated checkout URLs. The homepage links to it, and the optional Node server allows the page and its stylesheet.

## Printful products

The following account-wide templates are saved but unpublished:

| Item | Saved template | Planned USD retail | Configuration |
| --- | --- | --- | --- |
| Crest Tee | https://www.printful.com/dashboard/product-templates/108468207 | $32 | Bella + Canvas 3001, Black, XS–5XL; front 7 × 8.75 in, top aligned and horizontally centered |
| Book Tote | https://www.printful.com/dashboard/product-templates/108468311 | $30 | Econscious EC8000, Oyster, one size; front 7 × 8.75 in, centered |
| Art Print | https://www.printful.com/dashboard/product-templates/108468446 | $16 | Enhanced Matte Paper Poster, only 5 × 7 in; 3.5 × 4.9 in artwork centered on a #123229 full-page field |

The tee and tote source art is 1122 × 1402 px (160 DPI at the saved size). The poster source is 1060 × 1484 px (303 DPI at its inset size). Use the saved templates to preserve placement. Do not expand the poster source to full bleed. Gold is printed color, not metallic foil. Product photos in `images/merch-*.jpg` are official mockups downloaded from these Printful templates, not photographs of inspected samples. `images/merch-gold-crest.png` is the original AI-assisted crest used in the collection hero.

No samples have been ordered or inspected. Displayed Printful base costs on October 6, 2026 were $11.92–$19.92 for the tee, $15.87 for the tote, and $5.50 for the print. Verify each size's final cost and retail price when publishing. Shipping and applicable taxes are separate; these prices are not profit guarantees.

## Completing checkout

The proposed route is a dedicated **Dragon Bible** Printful Quick Store, linked from this site. The setup form has been prepared with `dragonbible.printful.me`; availability is not confirmed until creation. No store was created and no terms were accepted. Existing Dolphin Singularity stores were not changed.

Printful currently requires US tax residence and agreement to its [Quick Stores terms](https://www.printful.com/policies/quick-stores). The merchant must confirm eligibility and authorize acceptance before creation; any identity, tax, banking, or payout setup should be completed directly by the merchant. Preserve the existing account-wide markup setting and set these products' prices individually.

According to [Printful's comparison](https://help.printful.com/hc/en-us/articles/50265713299857-How-is-Quick-Stores-different-from-ecommerce-platform-integrations), Quick Stores has no monthly fee, ships only to US addresses, and cannot use a custom domain. Keep dragonbible.com on its existing website host. The collection page stays on dragonbible.com; buyers leave for Printful checkout. No DNS migration or paid ecommerce subscription is part of this change.

After the merchant completes those requirements:

1. Publish the three saved templates to the dedicated Dragon Bible Quick Store. Set product titles, descriptions, prices, and size options; verify the saved print layouts remain intact.
2. Inspect each public listing and copy its actual public URL. Replace each `Coming soon` status in `shop.html` with a descriptive purchase link to that product. Never use an account dashboard or guessed URL as a customer checkout link.
3. Update the opening status, price labels, metadata, homepage collection description, and FAQ together. Clearly state that checkout is hosted by Printful and shipping is US-only. Do not invent a return policy or delivery promise; link the published store's actual policies and estimates.
4. Verify checkout can be reached without a Printful account and that the three prices and product variants agree. Do not place a chargeable test order without merchant approval.
5. Update this status document and deploy the reviewed site changes. The domain is served from GitHub Pages `main`; pushing this feature branch does not change production.

The physical collection is separate from the optional DM-access Stripe integration and the free mobile prototype. Never send merchandise buyers through the existing subscription checkout.
