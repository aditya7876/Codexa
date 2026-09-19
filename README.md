# Codexa

A mobile-first competitive programming and algorithmic problem-solving platform built with React Native and Expo, powered by Supabase and isolated Docker-based code execution.

Codexa brings the desktop coding interview preparation experience into a polished, distraction-free mobile application. Users can explore a curated library of 150 algorithmic problems, inspect test cases and constraints, write code in a mobile-optimized editor, test solutions in real time, and submit them against hidden test cases evaluated in isolated sandboxes.

---

## Features

- **OAuth Authentication**: Secure authentication via GitHub and Google OAuth powered by Supabase Auth with PKCE / deep linking session exchanges.
- **Curated Problem Catalog**: 150 problems categorized across 16 algorithmic patterns with difficulty tags (`EASY`, `MEDIUM`, `HARD`), search, and status filtering.
- **Rich Problem Specifications**: Comprehensive problem statements including formatted examples, input/output constraints, collapsible progressive hints, and algorithmic editorials.
- **Mobile Code Editor**: Custom-built code editor featuring line numbering gutters, horizontal and vertical scrolling, auto-indentation, and monospace formatting optimized for touch keyboards.
- **Multi-Language Support**: Write and execute solutions in JavaScript (Node.js), Python (Python 3), and Java (OpenJDK) with language-tailored starter templates.
- **Dual Execution Engine**:
  - **Run**: Rapid test execution against sample cases for fast iterative debugging.
  - **Submit**: Formal judging against hidden test cases with execution time and peak memory tracking.
- **Submission History**: Detailed breakdown of past attempts per problem, showing status verdicts (`Accepted`, `Wrong Answer`, `Error`), execution times, memory metrics, and individual test case outcomes.
- **Activity & Contribution Heatmap**: Visual 16-week contribution calendar heatmap on the user profile tracking submission frequency, active streaks, and total solved count.
- **ChatGPT-Inspired Dark Interface**: Consistent dark theme (`#212121` background, `#2F2F2F` cards, `#10A37F` emerald accents) designed for low eye strain during extended coding sessions.

---

## Tech Stack

### Mobile Frontend

- **Framework**: [React Native](https://reactnative.dev/) (0.83.10) with [Expo](https://expo.dev/) (SDK 55)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (v55) — File-based routing with typed routes and API routes (`+api.ts`)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Local Storage**: [@react-native-async-storage/async-storage](https://github.com/react-native-async-storage/async-storage)
- **Gestures & Animations**: `react-native-reanimated`, `react-native-gesture-handler`, `expo-glass-effect`
- **Icons**: `@expo/vector-icons` (Feather, Ionicons, AntDesign)
- **Language**: TypeScript (~5.9.2)

### Backend & Database

- **BaaS**: [Supabase](https://supabase.com/)
- **Database**: PostgreSQL with Row Level Security (RLS) and column-level privileges
- **Authentication**: Supabase Auth (OAuth 2.0 with GitHub and Google providers)
- **API Runtime**: Expo Server Routes (`+api.ts`) running Node.js / edge handlers

### Code Execution

- **Execution Service**: [CodeBox](https://github.com/judge0/judge0) / Judge0-compatible sandbox engine
- **Containerization**: [Docker](https://www.docker.com/) for sandboxed process isolation, memory ceilings, and CPU execution limits

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│              Codexa Mobile App (React Native)           │
│         Expo Router · Zustand · Custom Code Editor      │
└────────────────────────────┬────────────────────────────┘
                             │
              HTTPS Requests │ Authorization: Bearer <token>
                             ▼
┌─────────────────────────────────────────────────────────┐
│               Expo Server API Routes                    │
│      /api/run (sample test) · /api/submit (formal)      │
└──────────────┬───────────────────────────┬──────────────┘
               │                           │
  Fetch Test Cases / Record Results        │ Dispatch Source Code
               ▼                           ▼
┌──────────────────────────────┐ ┌────────────────────────┐
│     Supabase / PostgreSQL    │ │    CodeBox (Docker)    │
│  - auth.users & profiles     │ │  - Isolated Sandbox    │
│  - problems (hidden tests)   │ │  - JS, Python, Java    │
│  - submissions & results     │ │  - CPU / Memory Caps   │
│  - problem_solved markers    │ └───────────┬────────────┘
└──────────────────────────────┘             │
               ▲                             │ Execution Verdict
               └─────────────────────────────┘
```

### Execution & Judging Workflow

1. **Writing Code**: The user selects their language of choice in the Code Editor. Starter boilerplate with standard input/output parsing is loaded automatically.
2. **Testing (Run)**: A request is dispatched to `/api/run`. The server forwards the source code and sample input to CodeBox. CodeBox runs the code in an isolated container and returns stdout, stderr, and run status.
3. **Submitting (Submit)**:
   - An authenticated request is sent to `/api/submit` containing user credentials, problem ID, language, and code.
   - The server verifies user authentication and fetches all problem test cases using the Supabase `service_role` key (bypassing client RLS).
   - CodeBox evaluates the submission against all test cases.
   - The server evaluates the results: if all test cases match expected outputs, the verdict is marked `Accepted`; otherwise `Wrong Answer` or `Error`.
   - The submission and individual test case records are inserted into `submissions` and `test_case_results`. If accepted, a record is added to `problem_solved`.
   - The UI displays the verdict card, execution time, peak memory usage, and expandable test case results.

---

## Authentication Flow

Authentication is handled via Supabase Auth with OAuth 2.0:

1. **Sign In**: The user taps **Continue with GitHub** or **Continue with Google** on the Sign-In screen.
2. **Browser Session**: `expo-web-browser` opens the Supabase OAuth URL with a custom redirect scheme (`codexa://auth/callback` in production or Expo development scheme).
3. **Session Exchange**: The callback screen (`src/app/auth/callback.tsx`) exchanges the OAuth authorization code for a session token via `supabase.auth.exchangeCodeForSession`.
4. **Session Persistence**: Sessions are persisted locally via `AsyncStorage` and synchronized through the Zustand `auth-store`.
5. **Route Protection**: The root layout (`src/app/_layout.tsx`) monitors session state. Unauthenticated users are routed to `/(auth)/sign-in`, while authenticated users are directed to the main app tabs.

---

## Problem Dataset

Codexa comes with a pre-seeded dataset of **150 coding problems** covering the following topics:

| Category                  | Problem Count | Common Topics                                                  |
| :------------------------ | :------------ | :------------------------------------------------------------- |
| **Arrays & Hashing**      | 9             | Hash Maps, Frequency Counting, Prefix Operations               |
| **Two Pointers**          | 5             | Array Traversal, Palindromes, Two Sum II, Trapping Rain Water  |
| **Sliding Window**        | 6             | Substring Windows, Character Replacement, Maximums             |
| **Stack**                 | 6             | Monotonic Stacks, Parentheses Matching, RPN Evaluation         |
| **Binary Search**         | 7             | Rotated Search, Matrix Search, Binary Search on Answer         |
| **Linked List**           | 11            | Pointer Manipulation, Cycle Detection, LRU Cache               |
| **Trees**                 | 15            | Binary Trees, BSTs, Traversals, Path Sums, Serialization       |
| **Tries**                 | 3             | Prefix Trees, Wildcard Searching, Word Search II               |
| **Heap / Priority Queue** | 7             | Top-K Elements, Median Streaming, Task Scheduling              |
| **Backtracking**          | 9             | Subsets, Permutations, Combinations, N-Queens                  |
| **Graphs**                | 19            | BFS, DFS, Topological Sort, Dijkstra, Disjoint Set Union (DSU) |
| **Dynamic Programming**   | 22            | 1D/2D DP, Knapsack, Longest Sequences, Matrix Paths            |
| **Greedy**                | 8             | Kadane's Algorithm, Jump Games, Interval Scheduling            |
| **Intervals**             | 6             | Merging Intervals, Meeting Rooms, Range Queries                |
| **Math & Geometry**       | 8             | Matrix Rotation, Spiral Traversals, Exponentiation             |
| **Bit Manipulation**      | 7             | Bitwise Arithmetic, Hamming Weights, Bit Flipping              |

**Total**: 28 Easy · 100 Medium · 22 Hard = **150 Problems**

---

## Project Structure

```
codexa/
├── assets/                       # App icons, splash screens, and images
├── scripts/                      # Project maintenance scripts
├── src/
│   ├── app/                      # Expo Router file-based pages & routes
│   │   ├── _layout.tsx           # Root navigation & auth session guard
│   │   ├── (auth)/               # Unauthenticated route group
│   │   │   ├── _layout.tsx
│   │   │   └── sign-in.tsx       # Sign-in screen with GitHub & Google OAuth
│   │   ├── (tabs)/               # Authenticated bottom tab screens
│   │   │   ├── _layout.tsx       # Bottom tab bar configuration
│   │   │   ├── index.tsx         # Home dashboard (streak, stats, quick start)
│   │   │   ├── profile.tsx       # User profile & 16-week activity heatmap
│   │   │   └── problems/         # Problem catalog & solver
│   │   │       ├── _layout.tsx
│   │   │       ├── index.tsx     # Problem catalog with search & difficulty filter
│   │   │       └── [id]/
│   │   │           ├── index.tsx # Problem details (description, solutions, history)
│   │   │           └── solve.tsx # Code editor, language picker, runner & submitter
│   │   ├── api/                  # Expo Server API routes
│   │   │   ├── run+api.ts        # POST /api/run endpoint for quick tests
│   │   │   └── submit+api.ts     # POST /api/submit endpoint for judging submissions
│   │   └── auth/
│   │       └── callback.tsx      # OAuth deep link exchange callback
│   ├── components/               # Shared reusable UI components
│   │   ├── activity-heatmap.tsx  # GitHub-style contribution calendar heatmap
│   │   └── code-editor.tsx       # Monospace mobile code editor with line gutter
│   ├── hooks/                    # Custom React hooks
│   │   ├── use-auth.ts           # Authentication & user state hook
│   │   ├── use-screen-insets.ts  # Safe area padding calculations
│   │   └── use-tab-bar-style.ts  # Dynamic floating tab bar styles
│   ├── lib/                      # Core utilities and services
│   │   ├── auth.ts               # Supabase OAuth helper functions
│   │   ├── judge.ts              # CodeBox API client, language IDs, output normalizer
│   │   ├── problems.ts           # Supabase problem querying and data transformers
│   │   ├── run-task.ts           # Async execution task wrapper
│   │   ├── supabase.ts           # Client-side Supabase client
│   │   ├── supabase-admin.ts     # Server-side service_role Supabase client
│   │   ├── theme.ts              # Centralized dark color palette and tokens
│   │   └── user.ts               # User avatar and display name helpers
│   └── state/                    # Global state stores
│       └── auth-store.ts         # Zustand authentication store
├── supabase/                     # Supabase database configuration
│   ├── migrations/               # SQL schema definitions and RLS policies
│   │   └── 20260704030004_create_problem_schema.sql
│   ├── seed/                     # TypeScript problem dataset seeds
│   │   └── problems.ts           # Typed seed definitions for all 150 problems
│   └── seed.sql                  # Idempotent SQL seed file for public.problems
├── app.json                      # Expo application manifest
├── eas.json                      # Expo Application Services build configuration
├── package.json                  # Dependencies and build scripts
├── tsconfig.json                 # TypeScript compiler configuration
└── README.md
```

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js** (v18.x or higher, LTS recommended)
- **npm** (v9.x or higher)
- **Docker** & **Docker Compose** (for running the local CodeBox execution engine)
- **Expo CLI** (bundled with npm dependencies, or installed via `npm install -g eas-cli`)
- **Android Studio** (for Android emulator) or an **Android physical device** with Expo Go / custom dev build

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/aditya7876/codexa.git
   cd codexa
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the root of the project:

```bash
# Supabase Configuration (Client-side)
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_KEY=your_supabase_anon_public_key

# Supabase Admin (Server-side / API routes only)
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# CodeBox / Execution Sandbox Engine
CODEBOX_URL=http://localhost:3000
CODEBOX_TOKEN=your_codebox_api_token
```

> **Note**: When running on a physical Android device, set `CODEBOX_URL` to your computer's local network IP address (e.g., `http://192.168.1.100:3000`) rather than `localhost`.

---

## Running the Application

### Starting the Expo Development Server

```bash
npm start
```

You can also run platform-specific launch commands:

- **Android Emulator**:
  ```bash
  npm run android
  ```
- **iOS Simulator**:
  ```bash
  npm run ios
  ```
- **Web Browser**:
  ```bash
  npm run web
  ```

### Development Builds (Recommended for Native Features)

To create a local Android development client build using EAS:

```bash
npx eas build --profile development --platform android
```

---

## CodeBox & Docker Setup

Codexa executes untrusted user code inside isolated Docker containers using a CodeBox / Judge0-compatible REST API.

### Running CodeBox with Docker

Run the CodeBox service locally via Docker:

```bash
docker run -d \
  -p 3000:3000 \
  -e AUTH_TOKEN=your_codebox_api_token \
  --name codebox \
  judge0/judge0:latest
```

Ensure the port and token match your `.env`:

- `CODEBOX_URL=http://localhost:3000`
- `CODEBOX_TOKEN=your_codebox_api_token`

---

## Database Setup & Seeding

### 1. Apply Database Migrations

Apply the migration schema via the Supabase Dashboard SQL Editor or using the Supabase CLI:

```bash
supabase db reset
```

Or copy the contents of `supabase/migrations/20260704030004_create_problem_schema.sql` into your Supabase project's SQL Editor.

### 2. Seed the 150 Coding Problems

To populate your database with all 150 problems:

- **Using Supabase SQL Editor**: Open `supabase/seed.sql` and run the queries in the Supabase SQL Editor. The script uses idempotent `where not exists (...)` clauses so it can be safely re-run without creating duplicates.
- **Using Supabase CLI**:
  ```bash
  supabase db query --file supabase/seed.sql
  ```

---

## API Endpoints

Codexa includes built-in server-side API routes executed by Expo Server:

### `POST /api/run`

- **Purpose**: Quick test execution against sample test cases.
- **Payload**:
  ```json
  {
    "problemId": "uuid-optional",
    "language_id": 63,
    "source_code": "...",
    "stdin": "input string",
    "expected_output": "expected string"
  }
  ```
- **Response**: Returns execution outcome (`stdout`, `stderr`, execution time, status code).

### `POST /api/submit`

- **Purpose**: Authenticated formal submission against all hidden test cases.
- **Headers**: `Authorization: Bearer <user_session_token>`
- **Payload**:
  ```json
  {
    "problemId": "uuid-required",
    "language": "javascript",
    "sourceCode": "..."
  }
  ```
- **Response**: Evaluates code against all database test cases, writes to `submissions` and `test_case_results`, and returns the verdict:
  ```json
  {
    "submissionId": "uuid",
    "status": "Accepted",
    "passedCount": 5,
    "totalCount": 5,
    "time": "0.042 s",
    "memory": "15420 KB",
    "results": [...]
  }
  ```

---

## Security & Privacy

- **Protected Test Cases**: Test cases and reference solutions in `public.problems` are restricted by PostgreSQL column grants. Client-side queries cannot read test cases; only the server-side `service_role` process can access them for judging.
- **Row Level Security (RLS)**: Users can only query and view their own submissions and problem completion records.
- **Process Isolation**: CodeBox executes code in sandboxed Docker containers with strict CPU time limits (5 seconds) and memory ceilings (256 MB) to prevent denial of service and abuse.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a new feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Make your changes and verify linting and types:
   ```bash
   npm run lint
   npx tsc --noEmit
   ```
4. Commit your changes with descriptive messages:
   ```bash
   git commit -m "feat: add your feature description"
   ```
5. Push to your branch and open a Pull Request.

---

## License

No license has currently been specified for this project.
