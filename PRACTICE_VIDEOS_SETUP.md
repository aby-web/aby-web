# Practice Videos Feature - Setup Guide

## What's Been Implemented

A complete practice videos feature has been added to your website with:

1. **Homepage Section** - Featured practice videos with "Coming Soon" state
2. **Dedicated Practice Page** - Full `/practice` route ready for YouTube embeds
3. **Navigation Updates** - "Practice" link added to both desktop and mobile menus
4. **Vacation Banner Integration** - Banner now promotes practice videos during vacation periods
5. **Email Notifications** - Visitors can sign up to be notified when videos go live (saves to Supabase `subscribers` table)

## Current Status: Coming Soon Mode

Both videos are currently in "Coming Soon" mode with:
- Placeholder images from your existing site (hero.webp and about.webp)
- "Coming Soon" overlay on thumbnails
- Email notification forms on both homepage and practice page
- Emails saved to Supabase with `source: 'practice_videos'`

## Video Details

**Video 1: Dynamic Vinyasa Flow**
- Duration: 90 min
- Level: All Levels
- Focus: Strength, Alignment, Breath Work

**Video 2: Open Level Vinyasa**
- Duration: 75 min
- Level: Open Level
- Focus: Mindfulness, Foundations, Flow

## When Your Videos Are Ready

Once you've uploaded your videos to YouTube, follow these steps:

### Step 1: Get Your YouTube Video IDs

When you upload a video to YouTube, the video ID is in the URL:
- URL: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
- Video ID: `dQw4w9WgXcQ` (the part after `v=`)

### Step 2: Update Homepage Component

**File:** `src/components/PracticeVideos.jsx`

Find the `PRACTICE_VIDEOS` array (around line 6) and update:

```javascript
const PRACTICE_VIDEOS = [
  {
    id: 1,
    title: 'Dynamic Vinyasa Flow',
    description: '...',
    duration: '90 min',
    level: 'All Levels',
    thumbnail: '/images/hero.webp',
    comingSoon: false, // ← Change to false
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // ← Add this line
  },
  {
    id: 2,
    title: 'Open Level Vinyasa',
    description: '...',
    duration: '75 min',
    level: 'Open Level',
    thumbnail: '/images/about.webp',
    comingSoon: false, // ← Change to false
    youtubeId: 'YOUR_YOUTUBE_VIDEO_ID', // ← Add this line
  },
];
```

### Step 3: Update Practice Page

**File:** `src/pages/Practice.jsx`

Make the same changes to the `PRACTICE_VIDEOS` array (around line 8)

### Step 4: Remove Email Notification Forms (Optional)

Once videos are live, you may want to remove or update the email notification sections since they're no longer needed. The forms are currently in both:
- `src/components/PracticeVideos.jsx` - Bottom of homepage section
- `src/pages/Practice.jsx` - Middle section before private sessions CTA

## Email Notifications

All email signups are saved to your Supabase `subscribers` table with:
- `email` - The subscriber's email (lowercase)
- `source` - Set to `'practice_videos'` to track where they signed up

You can query subscribers who want video notifications:
```sql
SELECT * FROM subscribers WHERE source = 'practice_videos';
```

## Customizing Video Details

You can update any of these fields in both files:
- `title` - The video name
- `description` - What the practice covers
- `duration` - Length displayed on card
- `level` - Difficulty badge
- `focus` - Array of focus areas (Practice page only)
- `thumbnail` - Custom thumbnail path (or use YouTube's auto-generated one)

## Where Everything Appears

**Homepage** (`/#practice`)
- Section appears after "Events Strip", before "About"
- Shows 2 video cards side-by-side
- Email notification form at bottom
- "Coming Soon" overlays on thumbnails

**Practice Page** (`/practice`)
- Dedicated page at `/practice`
- Full-width video displays
- Click-to-play YouTube embeds (when `comingSoon: false`)
- Email notification form in center
- Private sessions CTA at bottom

**Navigation**
- "Practice" link between "Events" and "Privates"
- Works on desktop and mobile menus

**Vacation Banner**
- Shows "Practice with me online" link when you're away
- Links directly to `/practice` page

## Testing

Visit your local dev server to see the changes:
1. **Homepage**: http://localhost:5174/
2. **Practice Page**: http://localhost:5174/practice
3. Test email signup forms
4. Check mobile responsiveness
