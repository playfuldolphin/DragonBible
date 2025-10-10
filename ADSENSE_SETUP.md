# Google AdSense Setup Guide for Dragon Bible

## Quick Start

### 1. Sign Up for AdSense
- Go to https://www.google.com/adsense
- Click "Get Started"
- Fill out application with dragonbible.com
- Wait 1-3 days for approval

### 2. Get Your Publisher ID
Once approved, you'll receive a Publisher ID that looks like:
`ca-pub-1234567890123456`

### 3. Update Your Site

Replace `ca-pub-YOUR_PUBLISHER_ID` in these files with your actual Publisher ID:
- `index.html` (line 420)

Or just send me your Publisher ID and I'll update it for you!

## Ad Placement Locations

### Current Ad Spots:
1. **Support Section** - Main ad display (sidebar)

### Recommended Additional Spots:
2. **Between Books** - In the books grid
3. **After Every 5 Chapters** - In the reader
4. **Bottom of Game** - After quiz/battle results
5. **Footer** - Sticky banner ad

## Ad Types Available

### Display Ads (Current)
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_ID"
     crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

### In-Article Ads
```html
<ins class="adsbygoogle"
     style="display:block; text-align:center;"
     data-ad-layout="in-article"
     data-ad-format="fluid"></ins>
```

### Multiplex Ads (Related Content)
```html
<ins class="adsbygoogle"
     style="display:block"
     data-ad-format="autorelaxed"
     data-ad-client="ca-pub-YOUR_ID"></ins>
```

## Expected Revenue

### Traffic Based Estimates:
- **100 visitors/day**: $1-5/day ($30-150/month)
- **1,000 visitors/day**: $10-50/day ($300-1,500/month)
- **10,000 visitors/day**: $100-500/day ($3,000-15,000/month)

*Note: Actual revenue varies by niche, location, engagement*

## AdSense Policies to Follow

✅ **Do:**
- Create original, quality content (you have this!)
- Have clear navigation (you have this!)
- Ensure site loads fast
- Be patient - revenue grows with traffic
- Focus on SEO to get more visitors

❌ **Don't:**
- Click your own ads
- Ask others to click ads
- Put ads in popups
- Have more than 3 ads per page
- Use misleading content

## Alternative Ad Networks

If AdSense doesn't approve you, try:

1. **Media.net** - Good alternative, similar to AdSense
2. **PropellerAds** - Lower requirements, popunders available
3. **Ezoic** - AI-optimized ads (need 10k monthly visitors)
4. **Amazon Associates** - Affiliate links for books/dragon merch
5. **Direct Sponsorships** - Contact dragon/mythology brands

## SEO Tips to Increase Traffic (= More Ad Revenue)

1. **Keywords**: dragon mythology, dragon bible, biblical dragons
2. **Social Media**: Share on Reddit (r/mythology, r/dragons)
3. **Pinterest**: Create dragon art pins linking to site
4. **YouTube**: Read chapters aloud, link to site
5. **TikTok**: Short dragon lore videos
6. **Blog Posts**: Write about dragon symbolism in religion

## Next Steps

1. ✅ Site is ready for ads (placeholder already added)
2. ⏳ Sign up for AdSense
3. ⏳ Get approved (1-3 days)
4. ⏳ Get Publisher ID
5. ⏳ Update site with Publisher ID
6. ⏳ Deploy to GitHub
7. ✅ Start earning!

## Need Help?

Email me at mr.noahwilson@gmail.com with your Publisher ID and I'll update the site for you!

---

🐉 **Your Dragon Bible is ready to make money!**
