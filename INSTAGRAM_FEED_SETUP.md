# Instagram Feed Setup Instructions

Your Instagram feed component has been added to the homepage. You now need to set up a **Behold** account to get your embed code.

## Step-by-Step Setup:

### 1. Create Behold Account
1. Go to **https://behold.so**
2. Click "Get Started Free"
3. Sign up with your email
4. Free plan includes: 1 feed, unlimited posts, auto-updates

### 2. Connect Instagram Account
1. Once logged in, click "Add Feed"
2. Choose "Instagram Business/Creator Account" (recommended) or "Personal Account"
3. For Business/Creator:
   - Click "Connect Instagram"
   - Log in with your Instagram account (@ammarbass)
   - Authorize Behold
4. For Personal Account:
   - You'll need to manually add posts via hashtag or tagging

### 3. Customize Feed Design
In the Behold dashboard:
1. Go to "Feed Settings"
2. Set **Layout**: Grid (2x3 or 3x2 works best)
3. Set **Number of Posts**: 6
4. **Style Customization**:
   - Background: `#F4EFE6` (to match your site)
   - Hover effect: Enable
   - Border radius: 8px (optional)
   - Spacing: 16px
5. Click "Save"

### 4. Get Your Widget Code
1. In Behold dashboard, go to "Get Widget Code"
2. You'll see something like:
   ```html
   <figure data-behold-id="ABC123XYZ"></figure>
   <script src="https://w.behold.so/widget.js" type="text/javascript"></script>
   ```
3. **Copy the ID** from `data-behold-id="ABC123XYZ"`
   - In this example, the ID is: `ABC123XYZ`

### 5. Add ID to Your Site
1. Open `/Users/ab/Desktop/aby-web/src/components/InstagramFeed.jsx`
2. Find line with: `data-behold-id="YOUR_BEHOLD_ID_HERE"`
3. Replace `YOUR_BEHOLD_ID_HERE` with your actual Behold ID
4. Example:
   ```jsx
   <figure data-behold-id="ABC123XYZ"></figure>
   ```

### 6. Test It
1. Save the file
2. Your dev server will auto-reload
3. Visit http://localhost:5173
4. Scroll down to see the Instagram feed
5. It should show your latest 6 Instagram posts

---

## Alternative Option: SnapWidget

If you prefer **SnapWidget** instead (also free):

### Setup:
1. Go to **https://snapwidget.com**
2. Click "Create Free Widget"
3. Choose "Grid" layout
4. Enter Instagram username: `ammarbass`
5. Customize:
   - Layout: 2x3 or 3x2
   - Border radius: 8px
   - Photo padding: 10px
6. Click "Get Widget"
7. Copy the embed code

### Implementation:
Update `InstagramFeed.jsx` to use SnapWidget instead:

```jsx
useEffect(() => {
  const script = document.createElement('script');
  script.src = 'https://snapwidget.com/js/snapwidget.js';
  script.async = true;
  document.body.appendChild(script);

  return () => {
    if (document.body.contains(script)) {
      document.body.removeChild(script);
    }
  };
}, []);

// Replace the Behold container with:
<iframe
  src="https://snapwidget.com/embed/YOUR_WIDGET_ID"
  className="snapwidget-widget"
  allowtransparency="true"
  frameborder="0"
  scrolling="no"
  style={{border: 'none', overflow: 'hidden', width: '100%', height: '600px'}}
></iframe>
```

---

## Comparison: Behold vs SnapWidget

| Feature | Behold | SnapWidget |
|---------|---------|------------|
| **Free Posts** | Unlimited | 200/month |
| **Auto-Update** | Yes | Yes |
| **Business Account** | Yes | No (personal only) |
| **Customization** | Excellent | Good |
| **Mobile Responsive** | Yes | Yes |
| **Our Recommendation** | ✓ **Behold** | Good alternative |

---

## Styling Notes

The feed is pre-styled to match your site:
- Background: `#F4EFE6` (light cream)
- Border color: `#C9B99A` (tan)
- Hover border: `#785E3D` (accessible brown)
- Text color: `#1C1410` (dark)

The feed automatically:
- Shows 6 most recent posts
- Updates when you post new content
- Links to your Instagram when clicked
- Is mobile responsive (2 columns on mobile, 3 on desktop)

---

## Troubleshooting

**Feed not showing:**
- Check your Behold ID is correct
- Ensure you saved the file
- Hard refresh browser (Cmd+Shift+R)

**Posts not updating:**
- Behold syncs every 2-4 hours
- Force sync in Behold dashboard

**Styling looks off:**
- Check you selected "Grid" layout
- Set background to transparent or `#F4EFE6`
- Adjust spacing/borders in Behold settings

---

**Current Status:** Component created, awaiting Behold ID
**Location:** Homepage, after "Studio Partners" section
**File to Edit:** `src/components/InstagramFeed.jsx` (line 39)
