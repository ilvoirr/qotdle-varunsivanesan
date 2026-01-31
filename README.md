# QODL-E: THE DSA COMBAT TERMINAL

### [LIVE DEPLOYMENT](#) 

QODL-E is a high-intensity coding challenge platform engineered for competitive programmers. It transforms daily DSA practice into an immersive terminal experience, where algorithms meet adrenaline through precision-crafted UI/UX and real-time performance tracking.

---

## EXECUTIVE VISUAL OVERVIEW

![Main Dashboard](./public/1.png)

---

## CORE CAPABILITIES

### 1. DUAL-MODE DIFFICULTY SYSTEM
The platform operates on a two-tier challenge architecture, allowing users to select their cognitive load based on current skill level and time constraints.

![BLITZCRANK Easy Mode](./public/2.png)

### 2. BLITZCRANK MODE: RAPID EXECUTION LAYER
The entry-level combat zone designed for quick solves and daily streak maintenance. Features an emerald-coded visual language that signals low-barrier, high-reward problem sets.

* **INSTANT PROBLEM FETCHING:** Zero-latency problem loading from backend API
* **MULTI-LANGUAGE SUPPORT:** JavaScript, Python, and C++ compilation
* **LIVE CODE EXECUTION:** Real-time terminal output with Master Henry's analytical feedback
* **VISUAL FEEDBACK SYSTEM:** Animated success/failure states for immediate dopamine loops

### 3. HARD MODE: ELITE PROTOCOL
A red-coded, high-stakes environment for advanced algorithmic combat. Designed for competitive programmers targeting FAANG-level complexity.

![Hard Mode Terminal](./public/3.png)

* **ADVANCED PROBLEM SETS:** Graph theory, dynamic programming, and complex data structures
* **ENHANCED TERMINAL AESTHETICS:** Red-on-black theme with aggressive visual cues
* **PERFORMANCE PRESSURE:** Time-sensitive UI elements that create cognitive urgency

### 4. GAMIFIED RANKING INFRASTRUCTURE
A real-time leaderboard system with animated point fluctuations, creating FOMO-driven engagement through visible peer performance.

* **LIVE TICKER SYSTEM:** Infinite scrolling leaderboard with percentage changes
* **RANK POINTS ACCUMULATION:** XP-based progression across DSA categories
* **SEASONAL COMPETITIONS:** Time-boxed ranking windows to drive daily participation

### 5. REWARD ARCHITECTURE
Physical and digital incentives mapped to performance milestones, including mechanical keyboards, internship referrals, and course access.

---

## DESIGN PHILOSOPHY: WHY THIS WORKS FOR DAILY ENGAGEMENT

### PSYCHOLOGICAL TRIGGERS IMPLEMENTED

1. **TERMINAL AESTHETICS = PROFESSIONAL IDENTITY**  
   The dark, high-contrast UI mimics production-grade developer tooling, making users *feel* like elite engineers even during practice.

2. **DUAL DIFFICULTY = REDUCED FRICTION**  
   On low-energy days, users can still maintain streaks via BLITZCRANK mode. On high-performance days, Hard Mode provides the dopamine spike of conquering complexity.

3. **AMBIENT ANIMATIONS = REDUCED ANXIETY**  
   Lottie-based liquid animations and particle effects create a "breathing" interface that reduces the intimidation factor of blank code editors.

4. **LEADERBOARD VISIBILITY = SOCIAL PROOF**  
   The infinite scrolling ticker makes peer activity hyper-visible, leveraging FOMO and competitive drive without requiring explicit social features.

5. **MASTER HENRY FEEDBACK = PERSONALIZED MENTOR**  
   AI-generated code analysis creates the illusion of 1:1 mentorship, increasing perceived value and emotional connection to the platform.

---

## TECHNICAL ARCHITECTURE

### REPOSITORY STRUCTURE

* **/app:** Next.js 15 App Router with "use client" components for maximum interactivity
* **/components:** Modular terminal components (CodingTerminal, HardModeTerminal)
* **/public:** Lottie JSON animations and static assets
* **Backend Integration:** Python-based DSA problem API via Ngrok tunneling

---

## THE TECH STACK

| COMPONENT | TECHNOLOGY |
| :--- | :--- |
| **Frontend Framework** | Next.js 15.5.11 (Turbopack) |
| **Animation Engine** | Framer Motion + Lottie-React |
| **Styling** | Tailwind CSS (Cyberpunk Glassmorphism) |
| **Icons** | Tabler Icons React |
| **Backend** | Python 3.x (FastAPI/Flask) |
| **Code Execution** | Multi-language compilation API |
| **Deployment** | Vercel (Frontend) + Ngrok (Backend) |

---

## LAYOUT & DESIGN DECISIONS

### INFORMATION HIERARCHY

The main dashboard follows a **modular grid system** (12-column on desktop) prioritizing:

1. **Ambient Leaderboard (Top):** Immediate social proof and activity validation
2. **Primary CTAs (Center-Left):** Hard Mode occupies maximum vertical space (6 rows) to signal "core challenge"
3. **Quick Actions (Center-Right):** BLITZCRANK and secondary features stacked for rapid access
4. **Rewards/Tracking (Bottom-Right):** Non-blocking but visible for long-term motivation

### COLOR PSYCHOLOGY

* **Emerald Green (BLITZCRANK):** Signals safety, approachability, and "quick wins"
* **Deep Red (Hard Mode):** Creates urgency, danger, and elite status
* **Purple (Alerts):** Represents automation and passive value
* **Blue (Master Henry):** Conveys intelligence and mentorship

### TYPOGRAPHY STRATEGY

* **Primary Headers:** Ultra-black italic fonts for aggressive, competitive energy
* **Code Blocks:** Monospace with reduced letter-spacing for technical authenticity
* **Body Text:** Sans-serif with high line-height (1.6) for problem statement readability

---

## HOW THIS PAGE ENCOURAGES DAILY ENGAGEMENT

### IMMEDIATE WINS
- **"NEW PROBLEM" button:** One-click dopamine reset
- **"EXECUTE" CTA:** High-contrast, impossible to miss
- **Real-time output:** No waiting, no ambiguity

### LONG-TERM HOOKS
- **Seasonal leaderboards:** "Season ends in 4 days" creates urgency
- **XP categories:** Users see progress across *multiple* dimensions (DP, Graphs, Sliding Window)
- **Prize system:** Tangible rewards (Keychron K2, Google Internship) for consistent participation

### FRICTIONLESS WORKFLOW
- **Auto-populated code templates:** Users never face a blank editor
- **Language switching:** Zero-reload transitions between Python/JS/C++
- **Modal-based navigation:** Main page never unloads, reducing cognitive cost of exploration

---

## WHAT I WOULD IMPROVE WITH MORE TIME

### TECHNICAL ENHANCEMENTS
1. **WebSocket Integration:** Replace polling with real-time leaderboard updates
2. **Code Autocomplete:** Integrate Monaco Editor for IDE-grade experience
3. **Persistent Sessions:** Save code drafts to localStorage/backend
4. **Test Case Visibility:** Show expected vs actual outputs inline
5. **Performance Metrics:** Display time/space complexity analysis post-submission

### UX REFINEMENTS
1. **Onboarding Flow:** Animated tutorial explaining the dual-mode system
2. **Streak Visualization:** Calendar heatmap à la GitHub contributions
3. **Mobile Optimization:** Collapsible code editor for phone screens
4. **Dark/Light Toggle:** Despite dark theme preference, accessibility matters
5. **Hint System:** Progressive disclosure (first hint free, subsequent hints cost XP)

### GAMIFICATION DEPTH
1. **Achievement Badges:** Visual rewards for milestones (10-day streak, first Hard Mode solve)
2. **Friends System:** Private leaderboards for peer groups
3. **Daily Challenges:** Time-limited problems with bonus XP multipliers
4. **Code Replays:** Watch top performers' solving patterns (anonymized)

---

## ASSETS USED

Lottie animations created by talented designers:
- [Graphic Room](https://iconscout.com/contributors/graphic-room)
- [Danimotion](https://iconscout.com/contributors/danimotion)
- [Graphichup](https://iconscout.com/contributors/graphichup)
- [Nanoagency](https://iconscout.com/contributors/nanoagency)

Check them out for more incredible motion design work!

---

## INSTALLATION AND SETUP

### FRONTEND DEPLOYMENT
```bash
cd javascript-frontend
npm install
npm run dev
