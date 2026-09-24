HAVELENT — PROJECT CONTEXT

Version: 2026-09-08
Purpose: Persistent project context for ChatGPT/Codex and future Havelent work.

IMPORTANT:
Read this file before making changes to the Havelent project.
Preserve existing working behavior. Do not make unrelated changes.
When a requested change is narrow, make the minimum necessary code changes.
If something is uncertain, inspect the actual codebase before guessing.

1. BRAND OVERVIEW

Brand Name

Havelent

Brand Positioning

Havelent is intended to be positioned as a:

Premium digital agency

Professional, established, credible agency

High-quality creative and digital partner

Cinematic and polished brand

Agency serving visionary brands worldwide

Avoid positioning Havelent as a:

Small agency

Small business

Budget agency

Cheap agency

Low-cost agency

Affordable agency

Do NOT intentionally target or use keywords containing:

small business

small

affordable

cheap

low cost
or similar positioning-damaging language when those terms make Havelent look small or budget-focused.

Keyword decisions should still prioritize genuine relevance, search intent, search volume, and reasonable KD.

Brand/Copy Tone

Preferred:

Premium

Professional

Confident

Cinematic

Clean

Sophisticated

Trustworthy

Established

Results-oriented without sounding pushy

Avoid:

Generic freelancer language

Cheap/budget positioning

Overly aggressive sales language

Unnecessary hype

Generic “we offer everything” copy

Current Tagline Ideas Discussed

“Your Vision is our Responsibility.”

“Your Trusted Digital Partner.”

2. HAVELENT SERVICES — STRICT LIMIT

Havelent's service offering is limited to these FOUR categories only:

Video Editing

Graphic Design

Digital Marketing

Social Media Management

Do not invent additional top-level service categories.

Video Editing

Known service areas:

YouTube Video Editing

Commercial & Ads Editing

Podcast Editing

Shorts & Reels Editing

Documentary Editing

Motion Graphics

Graphic Design

Known service areas:

Logo Design

Poster Design

Business Card Design

Invitation Card Design

Brand Identity

Social Media Design

Digital Marketing

Known service areas:

YouTube Ads

Facebook Ads

Instagram Ads

TikTok Ads

Campaign Strategy

Performance Analytics

Social Media Management

Known service areas:

Content Strategy

Content Creation

Account Management

Community Management

Social Media Advertising

Analytics & Reporting

3. WEBSITE TECHNOLOGY

Current website stack:

Next.js

App Router

React

TypeScript

Tailwind CSS

Framer Motion

lucide-react

Known project structure/components include:

app/page.tsx

app/layout.tsx

components/Hero

components/Reviews

components/Services

components/About

components/Contact

components/Footer

components/WhyHavelent

components/FAQ

components/Blog

CursorGlow

AnimatedCards

VideoEditingHero

VideoEditingServices

ServicesPage

Known service routes include:

/services/video-editing

/services/graphic-design

/services/digital-marketing

/services/social-media-management

Known GitHub repository:

github.com/abdullah-havelent/havelent-first-website

4. DESIGN DIRECTION

Havelent's website should feel:

Premium

Cinematic

Modern

Dark

Minimal but visually rich

Professional

High-end agency quality

Earlier design direction included:

Dark/black backgrounds

Charcoal gradients

Smooth transitions

Cinematic visual treatment

Subtle orange/accent glow

Premium typography

Controlled use of Framer Motion

Known fonts used/discussed:

Inter

Playfair Display

Known visual colors discussed historically:

Brand-dark / black

White

Orange accent

Earlier palette experiments included:

#002220

#0F766E

#1CDCCD

#B21D43

#F97316

#6E001C

#FF0041

Do not change the established visual system just to solve a navigation problem.

5. HOMEPAGE CURRENT STRUCTURE

Current homepage order is:

Home / Hero

Reviews

Why Havelent / Our Work

Services

FAQ

About

Blog

Contact

Footer

Current app/page.tsx structure:

'use client';

import Hero from '@/components/Hero';
import Reviews from '@/components/Reviews';
import Services from '@/components/Services';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import WhyHavelent from '@/components/WhyHavelent';
import FAQ from '@/components/FAQ';
import Blog from '@/components/Blog';

export default function Home() {
  return (
    <>
      {/* HOME */}
      <div id="home">
        <Hero />
      </div>

      {/* REVIEWS */}
      <Reviews />

      {/* WHY HAVELENT */}
      <div
        id="our-work"
        className="scroll-mt-28"
      >
        <WhyHavelent />
      </div>

      {/* SERVICES */}
      <div
        id="services"
        className="scroll-mt-28"
      >
        <Services />
      </div>

      {/* FAQ */}
      <FAQ />

      {/* ABOUT */}
      <div
        id="about"
        className="scroll-mt-28"
      >
        <About />
      </div>

      {/* BLOG */}
      <div
        id="blog"
        className="scroll-mt-28"
      >
        <Blog />
      </div>

      {/* CONTACT */}
      <div
        id="contact"
        className="scroll-mt-28"
      >
        <Contact />
      </div>

      {/* FOOTER */}
      <Footer />
    </>
  );
}

Important:

Blog is a HOME PAGE SECTION.

There should NOT currently be a separate /blog page.

Blog is intentionally positioned immediately above Contact.

id="blog" is required for navigation.

id="home" is on a wrapper around Hero.

Reviews may have its own id="reviews" inside Reviews.tsx; inspect the actual component before adding duplicate IDs.

6. BLOG DECISION

Current requirement:

Add Blog section to homepage.

Blog appears immediately above Contact.

Navbar Blog should scroll to the Blog section.

Footer Blog should scroll to the Blog section.

Do NOT create or route to /blog unless explicitly requested later.

Do NOT turn Blog into a separate page just because a navigation link exists.

The Blog section currently uses:

<div
  id="blog"
  className="scroll-mt-28"
>
  <Blog />
</div>

7. NAVBAR NAVIGATION

Current Navbar links:

Home

Reviews

Our Work

Services

About

Blog

Contact Us

Current section mapping discussed:

const SECTION_MAP: Record<string, string> = {
  Reviews: 'reviews',
  Services: 'services',
  About: 'about',
  Blog: 'blog',
  'Contact Us': 'contact',
};

Navbar also has special handling for:

Home

section scrolling

navigation from inner pages back to homepage

sessionStorage-based return-to-section behavior

The homepage active-section observer should track:

const sections = [
  'home',
  'reviews',
  'our-work',
  'services',
  'about',
  'blog',
  'contact',
];

The observer should include:

case 'blog':
  setActive('Blog');
  break;

IMPORTANT NAVBAR RULE:

The Navbar was considered working before recent Footer experiments.

Do NOT change Navbar merely to fix Footer unless the actual current Navbar code proves it is the source of the problem.

If Navbar is already working, preserve it.

Do not guess its implementation.

8. FOOTER NAVIGATION

Current Footer company/quick links:

Home → home

Reviews → reviews

Our Work → our-work

Services → services

About → about

Blog → blog

Contact Us → contact

Current COMPANY_LINKS:

const COMPANY_LINKS = [
  {
    name: 'Home',
    section: 'home',
  },
  {
    name: 'Reviews',
    section: 'reviews',
  },
  {
    name: 'Our Work',
    section: 'our-work',
  },
  {
    name: 'Services',
    section: 'services',
  },
  {
    name: 'About',
    section: 'about',
  },
  {
    name: 'Blog',
    section: 'blog',
  },
  {
    name: 'Contact Us',
    section: 'contact',
  },
];

Footer is a client component and uses:

useState

usePathname

Framer Motion

AnimatePresence

lucide-react

Footer also contains:

Desktop quick links

Mobile accordion quick links

Service group columns/accordions

LinkedIn link

Report a Problem modal

/api/report-problem POST submission

Do not break these unrelated functions when fixing navigation.

9. FOOTER SCROLLING — CURRENT LESSON / CONSTRAINT

There was a recent navigation debugging issue:

Clicking some Footer links changed the URL to e.g. http://localhost:3000/#services

But the page did not scroll.

Reviews and Blog had been working when they used direct scrollIntoView() logic.

A custom getScrollParent() approach caused inconsistent behavior.

Current preferred principle:

Use one reliable scrolling system for Footer navigation.

Native element.scrollIntoView({ behavior: 'smooth', block: 'start' }) was proven to scroll successfully.

However, scrolling must also work with the existing Navbar active-section observer.

Do not solve one issue by breaking the other.

The Footer's navigation should conceptually be:

const handleFooterNav = (
  section: string
) => {
  setOpenGroup(null);

  if (pathname === '/') {
    scrollToSection(section);
    return;
  }

  window.location.href = `/#${section}`;
};

A simple scroll function previously used was:

const scrollToSection = (
  sectionId: string
) => {
  let attempts = 0;

  const tryScroll = () => {
    const element =
      document.getElementById(sectionId);

    if (!element) {
      attempts += 1;

      if (attempts < 40) {
        window.setTimeout(
          tryScroll,
          100
        );
      }

      return;
    }

    setOpenGroup(null);

    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    if (sectionId === 'home') {
      window.history.replaceState(
        null,
        '',
        '/'
      );
    } else {
      window.history.replaceState(
        null,
        '',
        `#${sectionId}`
      );
    }
  };

  tryScroll();
};

BUT:

Do not blindly apply this if the actual project has another scroll architecture.

Inspect current Navbar/Footer/CSS before changing navigation again.

Avoid repeatedly changing working code based only on snippets.

10. SCROLL GAP ISSUE

Recent issue:

Section scrolling was made to work, but sections had an unwanted gap above them.

scroll-mt-28 was identified as a possible source because it introduces scroll margin.

However, removing it blindly is NOT acceptable because the Navbar is fixed and the section may then appear behind the Navbar.

Current rule:

Do not blindly remove scroll-mt-28.

Do not blindly add arbitrary pixel offsets.

Inspect the actual Navbar height and scroll architecture first.

Preserve correct fixed-navbar positioning.

Desired behavior:

section scrolls smoothly

section starts correctly below fixed Navbar

no unnecessary large gap

active Navbar item highlights correctly

11. NAVBAR ACTIVE STATE

The Navbar uses an active section observer.

Required tracked sections:

home

reviews

our-work

services

about

blog

contact

Expected active labels:

home → Home

reviews → Reviews

our-work → Our Work

services → Services

about → About

blog → Blog

contact → Contact Us

When scrolling naturally, the correct Navbar link should highlight.
When clicking Footer links and scrolling, the Navbar should also update naturally through the same observer.

Do not manually force Navbar state from Footer unless inspection proves that the observer cannot detect the target.

12. INNER-PAGE NAVIGATION

Navbar/Footer links should also work from inner service pages.

Expected behavior:

If already on /, scroll to the target homepage section.

If on an inner page, navigate to /#section.

The homepage should handle the hash after loading and scroll to the target.

Known mechanism:

sessionStorage has previously been used by Navbar for a havelent-scroll-target.

Hash handling has also been used by Footer/Navbar.

Do not create multiple competing navigation systems without checking the current code.

13. SEO — GENERAL STRATEGY

Havelent SEO goal:

Build strong topical authority

Build brand/entity recognition

Generate qualified organic traffic

Strengthen professional/premium agency positioning

Avoid low-quality or spammy SEO

Blogging is part of the strategy:

Helpful, genuinely useful content

Relevant topics around Havelent's four service categories

Search-intent driven content

Strong topical coverage

Internal links where genuinely useful

No keyword stuffing

No repetitive filler articles

External content can help:

High-quality editorial/guest contributions can generate relevant backlinks.

Quality and relevance matter more than quantity.

Reddit/Quora can help with brand discovery, referral traffic, and leads when answers are genuinely useful.

Do not spam links.

Forum/UGC links should not be treated as equivalent to strong editorial backlinks.

14. ON-PAGE SEO — DIGITAL MARKETING PAGE

Completed items for Havelent Digital Marketing page:

Metadata title/description

Page-specific canonical

Open Graph metadata

Hero H1/description optimization

Marketing Services content/keyword optimization

Marketing Process content/keyword optimization

Marketing Why Choose content/keyword optimization

Remaining planned items:

Internal linking

Image ALT/file-name review

Service schema

Breadcrumb/schema

FAQ if appropriate

Final SEO review

Do not mark remaining items complete unless they are actually completed.

15. INTERNAL LINKING PRINCIPLE

Previous review concluded:

Do not force contextual internal links into every page just for SEO.

Navbar and Footer already expose important pages.

Service pages already contain CTAs/contact forms.

Add internal contextual links where they genuinely help users and topic relationships.

Avoid clutter and unnatural linking.

16. ENTITY / BRAND-BUILDING PLAN

Important future task:

Create an official LinkedIn presence for Abdullah/Havelent.

Later add relevant LinkedIn profile/company links to the Havelent website and structured data where appropriate.

Goal: help search engines connect consistent information across the website and external profiles.

Known LinkedIn profile link used in Footer:

https://www.linkedin.com/in/abdullah-rajpoot-havelent/

Do not invent additional social profiles unless they are actually created/verified.

17. CURRENT FOOTER FEATURES

Footer brand copy currently used:
“A premium digital agency crafting cinematic experiences for visionary brands worldwide.”

Footer contains Havelent horizontal white logo:

/logos/horizontal-white.svg

Footer LinkedIn icon:

lucide-react Linkedin

Opens the known Havelent-related LinkedIn profile in a new tab.

Footer service links:

Video Editing → /services/video-editing

Graphic Design → /services/graphic-design

Digital Marketing → /services/digital-marketing

Social Media Management → /services/social-media-management

Footer Report a Problem:

API endpoint: /api/report-problem

Sends:

name: Website Visitor

email

message

Uses a modal with Framer Motion/AnimatePresence.

Do not remove or rewrite these features when doing navigation-only work.

18. VIDEO EDITING PAGE — KNOWN DESIGN DETAILS

Video Editing Hero heading words:

“Every”

“Frame,”

“Tells”

“a Story.”

Known styling direction:

White and gradient text

Cinematic premium visual treatment

Video Editing services:

YouTube Video Editing

Commercial & Brand Ads

Short Form Content

Previously requested card behavior:

Normal image with black fade and text overlay

No unnecessary animation on initial state

On hover: image fades and slightly increases in size

Text: “Video Editing”

“View More” below

“Get a Free Quote” callout

“Our Services” section in box style similar to About

Black/charcoal gradient

Smooth fade separation

Do not change these details unless specifically asked.

19. ANIMATED CARDS / IMAGES

AnimatedCards previously used:

/images/1.webp through /images/6.webp

Earlier image files were JPG and later converted to WebP.

Known glow direction:

Soft orange glow

Blurred radial gradients

Hover glow

Reflection effects

Slight image curves

Typical blur values discussed:

blur-[170px]

blur-[200px]

The user wanted some glow behavior to be site-wide rather than restricted to one page, but scope should be verified before making global CSS changes.

20. DEVELOPMENT STYLE / USER PREFERENCES

The user wants:

Exact code

Step-by-step practical instructions

Roman Urdu mixed with English

Minimal changes

No unnecessary refactors

No guessing when exact code is available

Complete file replacements when requested

Clear statement of exactly what to replace

No contradictory instructions

Do not repeatedly change the same file without confirming the actual cause

When the user says:

“poora file dubara do”
→ provide the complete file, not fragments.

“ek bhi mistake na ho”
→ carefully preserve all existing functionality and only make requested changes.

“sirf ye change”
→ do only that change.

“check karo”
→ inspect the actual supplied code before proposing changes.

21. IMPORTANT NAVIGATION DEBUGGING LESSON

Recent sequence:

Blog was initially treated as a separate /blog page.

User clarified that Blog should NOT be a separate page.

Blog was moved to the homepage immediately above Contact.

Footer Blog was added.

Footer navigation for Reviews/Blog worked while some other links did not.

URL hashes such as /#services changed even when scrolling failed.

A custom scroll-parent implementation was used and produced inconsistent results.

Native scrollIntoView() successfully scrolled.

But section positioning and Navbar active highlighting still needed to be preserved.

User explicitly does NOT want the already-working Navbar unnecessarily changed.

Therefore:

Preserve the Navbar.

Treat current navigation as a system involving Page IDs + Footer + Navbar observer + fixed Navbar positioning.

Inspect all relevant code before modifying it.

22. KNOWN WORKING / REQUIRED SECTION IDS

Homepage navigation targets:

home
reviews
our-work
services
about
blog
contact

Required DOM mapping:

Home       → #home
Reviews    → #reviews
Our Work   → #our-work
Services   → #services
About      → #about
Blog       → #blog
Contact    → #contact

Before debugging a link, verify:

The ID exists in the rendered DOM.

There is only one relevant element with that ID.

The navigation handler passes the correct ID.

The scrolling method targets that exact element.

The fixed Navbar offset is handled correctly.

The Navbar observer tracks that same ID.

The URL hash update does not replace/interrupt the scroll.

Inner-page hash loading does not conflict with click scrolling.

23. HAVELENT CLIENT-HUNTING CONTEXT

Havelent client hunting continues alongside website development and SEO.

Preferred outreach formula:
Observe → Problem → Impact → Solution

Outreach should be:

Personalized

Specific

Professional

Non-pushy

Based on a genuine business/website issue

Avoid generic:
“We offer web design/video editing/etc.”

Instead:

Observe a real issue.

Explain its impact on customers/business.

Naturally position Havelent's relevant service as the solution.

Client-hunting should not replace ongoing website development/SEO tasks.

24. OTHER PROJECT HISTORY / TECHNICAL NOTES

Hosting/domain:

Havelent domain/hosting has been associated with Hostinger.

SSL and hosting configuration have been discussed.

Previous DNS troubleshooting context exists.

If DNS is being troubleshot, previously requested commands were:

nslookup havelent.com

nslookup -type=AAAA havelent.com

Known DNS context previously provided:

Hostinger authoritative nameservers:

nova.dns-parking.com

cosmos.dns-parking.com

A record previously provided:

2.57.91... (do not assume the full value without checking the current DNS).

Do not treat old DNS information as necessarily current; verify before making claims.

25. GIT / PROJECT REPOSITORY

Known repository:
https://github.com/abdullah-havelent/havelent-first-website

When using Git/Codex:

Inspect the actual repository before modifying files.

Preserve current working changes.

Do not reset/revert user changes without explicit permission.

Prefer small, reviewable changes.

Check TypeScript/build/lint where practical after modifications.

26. CODE SAFETY RULES FOR THIS PROJECT

Never overwrite unrelated functionality.

Never remove a working feature to solve an unrelated issue.

Never create a new /blog page unless explicitly requested.

Never add new service categories without explicit instruction.

Never weaken premium brand positioning.

Never introduce “cheap/affordable/small/low-cost” positioning into SEO/copy unless explicitly requested for a specific reason.

Do not make broad global CSS changes to fix a local component issue without checking scope.

Do not change Navbar just because Footer has a problem.

Do not guess IDs—inspect the rendered component/code.

Do not add duplicate IDs.

Preserve existing SEO metadata/schema work.

Preserve existing Footer report-problem functionality.

Preserve existing service routes.

When replacing a complete file, preserve all existing imports and functionality unless a change is intentionally required.

After navigation changes, test all seven homepage targets:

Home

Reviews

Our Work

Services

About

Blog

Contact Us

27. CURRENT PRIORITY

Immediate website task:

Finish reliable homepage section navigation for Navbar/Footer.

Blog must remain a homepage section immediately above Contact.

Footer and Navbar should scroll to the correct section.

The section should land correctly below the fixed Navbar without an unnecessary gap.

Navbar should highlight the active section.

Do not create a /blog page.

Do not unnecessarily modify the Navbar.

After navigation is stable:

Continue Havelent blog content/strategy work.

Continue remaining SEO items.

Continue website development.

Continue client hunting in parallel.

28. FUTURE BLOG STRATEGY DIRECTION

The user wants to write Havelent blog content to:

Build topical authority

Attract relevant organic traffic

Strengthen expertise signals

Support service pages

Increase brand discovery

Generate qualified leads

Blog topics should be:

Useful

Search-intent driven

Relevant to Havelent's four services

High-quality

Non-spammy

Written for real users first

Potential content clusters should be planned around:

Video Editing

Graphic Design

Digital Marketing

Social Media Management

Do not generate a large number of low-quality articles merely for volume.

29. EXTERNAL BRAND DISCOVERY

Reddit/Quora/community participation:

Helpful answers can cause users to discover Havelent and search for the brand on Google.

Referral traffic and brand searches can be valuable.

UGC/forum links should not be treated as strong editorial backlinks by default.

Avoid repetitive brand mentions and link spam.

Prioritize genuinely useful answers.

30. SOURCE OF TRUTH RULE

This file is a project context document, NOT a substitute for the actual codebase.

For exact implementation:

Read this file.

Inspect the current repository files.

Treat the current code as the final source of truth for implementation details.

Treat this file as the source of truth for project decisions, constraints, positioning, and historical context.

If this file conflicts with current code, do not blindly overwrite current code; inspect the difference and preserve intentional recent changes.

If a fact is marked as historical/known but not verified current, verify it before relying on it.

31. FINAL CODEx INSTRUCTION

When Codex opens this project, its first instruction should effectively be:

“Read PROJECT_CONTEXT.md first. Then inspect the actual Havelent codebase before making changes. Preserve existing working behavior, follow the project constraints in this document, and make only the minimum changes necessary for the requested task. Do not guess when the actual code can be inspected.”

END OF HAVELENT PROJECT CONTEXT