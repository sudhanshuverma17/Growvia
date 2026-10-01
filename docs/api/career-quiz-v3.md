# Career Quiz v3 API Specification

This document freezes the REST API contract for the **Growvia Career Assessment Engine (v3)** introduced in Step 5.

---

## 1. Overview & Architectural Principles

- **Stateless Validation:** `POST /api/career-quiz/v3/stage1` serves sanitized questions. The client stores nothing on the server until submission.
- **Untrusted Client Model:** `POST /api/career-quiz/v3/submit` recomputes Stage 1 scores, re-derives the exact served Stage 2 question bank, and recalculates all rankings and traits from scratch. Any client-supplied scores, picks, or domain affinities are discarded.
- **Legacy Compatibility:** The legacy `POST /api/career-quiz/submit` route remains active and unchanged for existing clients until Step 7.
- **Dual Support in `/latest`:** `GET /api/career-quiz/latest` returns v3 assessments in the v3 contract, and automatically transforms legacy v2 documents into the v3 format with `legacy: true`.

---

## 2. Abuse Protection & Constraints

| Parameter | Specification |
| :--- | :--- |
| **Rate Limit** | ~30 requests per minute per IP address (`RATE_LIMIT_EXCEEDED`) |
| **Payload Limit** | Max request body size: **20 kB** (`LIMIT_FILE_TYPES` / 413) |
| **Error Format** | `{ success: false, error: "<message>", code: "<STABLE_CODE>" }` |
| **Information Security** | Stage 1 question responses **never leak** option weights, career slugs, `blendCore`, or quiz profiles. |

---

## 3. Endpoints

### 3.1. `POST /api/career-quiz/v3/stage1`

Validates student answers to the 7 Stage 1 discovery questions, computes domain affinities, and serves the corresponding Stage 2 question bank.

#### Request Headers
```http
Content-Type: application/json
```

#### Request Body
```json
{
  "stage1Answers": {
    "q1": "q1_opt1",
    "q2": "q2_opt4",
    "q3": "q3_opt2",
    "q4": "q4_opt1",
    "q5": "q5_opt6",
    "q6": "q6_opt1",
    "q7": "q7_opt3"
  }
}
```

#### Response (`200 OK`)
```json
{
  "success": true,
  "domainScores": {
    "tech": 0.9167,
    "creative": 0.4167,
    "engineering": 0.3333,
    "science": 0.25,
    "business": 0.1667,
    "media": 0.1667,
    "healthcare": 0.0833,
    "finance": 0.0833,
    "law_gov": 0,
    "education_social": 0,
    "aviation_hospitality": 0
  },
  "topDomains": ["tech", "creative"],
  "isBlended": false,
  "questions": [
    {
      "id": "tech_q1",
      "text": "A popular student communication app crashes during festival greetings. What would you do first?",
      "options": [
        {
          "id": "tech_q1_opt1",
          "text": "Optimize the core backend code so user requests load instantly without crashing."
        },
        {
          "id": "tech_q1_opt2",
          "text": "Train machine learning models to automatically predict and smooth sudden traffic surges."
        }
      ]
    }
  ]
}
```

---

### 3.2. `POST /api/career-quiz/v3/submit`

Submits both Stage 1 and Stage 2 answers. Computes recommendations, deterministic analysis, and persists the assessment.

#### Request Headers
```http
Content-Type: application/json
Authorization: Bearer <token> (Optional: guests permitted)
```

#### Request Body
```json
{
  "stage1Answers": {
    "q1": "q1_opt1",
    "q2": "q2_opt1",
    "q3": "q3_opt1",
    "q4": "q4_opt1",
    "q5": "q5_opt1",
    "q6": "q6_opt1",
    "q7": "q7_opt1"
  },
  "stage2Answers": {
    "tech_q1": "tech_q1_opt1",
    "tech_q2": "tech_q2_opt1",
    "tech_q3": "tech_q3_opt1",
    "tech_q4": "tech_q4_opt1",
    "tech_q5": "tech_q5_opt1",
    "tech_q6": "tech_q6_opt1",
    "tech_q7": "tech_q7_opt1",
    "tech_q8": "tech_q8_opt1",
    "tech_q9": "tech_q9_opt1"
  }
}
```

#### Response (`200 OK`) — Frozen Contract
```json
{
  "quizVersion": "career-assessment-v3",
  "engineVersion": "2.0.0",
  "bankVersion": "bank_v3_a1b2c3d4e5",
  "saved": true,
  "assessmentId": "670c1e8a9f24b5d6e1234567",
  "isBlended": false,
  "signal": {
    "level": "clear"
  },
  "domainScores": {
    "tech": 1.0,
    "engineering": 0.3333,
    "creative": 0.1667
  },
  "topDomains": ["tech", "engineering"],
  "picks": [
    {
      "rank": 1,
      "overallRank": 1,
      "slug": "engineer",
      "title": "Software Engineer",
      "domain": "tech",
      "matchPct": 94,
      "kind": "core",
      "roadmapUrl": "/roadmaps/engineer",
      "whyMatch": "Top career match based on highest alignment with Technology & Software and strong quiz response patterns."
    },
    {
      "rank": 2,
      "overallRank": 2,
      "slug": "ai-ml-engineer",
      "title": "AI/ML Engineer",
      "domain": "tech",
      "matchPct": 85,
      "kind": "core",
      "roadmapUrl": "/roadmaps/ai-ml-engineer",
      "whyMatch": "Strong alternative match with high potential in Technology & Software."
    },
    {
      "rank": 3,
      "overallRank": 3,
      "slug": "cloud-architect",
      "title": "Cloud Architect",
      "domain": "tech",
      "matchPct": 78,
      "kind": "core",
      "roadmapUrl": "/roadmaps/cloud-architect",
      "whyMatch": "High-compatibility pathway reflecting your problem-solving strengths in Technology & Software."
    },
    {
      "rank": 4,
      "overallRank": 4,
      "slug": "mechanical-engineer",
      "title": "Mechanical Engineer",
      "domain": "engineering",
      "matchPct": 63,
      "kind": "explore",
      "roadmapUrl": "/roadmaps/mechanical-engineer",
      "whyMatch": "Cross-domain recommendation expanding into Core Engineering."
    },
    {
      "rank": 5,
      "overallRank": 7,
      "slug": "financial-analyst",
      "title": "Financial Analyst",
      "domain": "finance",
      "matchPct": 55,
      "kind": "wildcard",
      "roadmapUrl": "/roadmaps/financial-analyst",
      "whyMatch": "Wildcard opportunity exploring unique strengths at the intersection of Finance & Accounting."
    }
  ],
  "tie": {
    "isTie": false,
    "gap": 0.145,
    "slugs": []
  },
  "alternatives": [
    {
      "rank": 6,
      "overallRank": 5,
      "slug": "data-scientist",
      "title": "Data Scientist",
      "domain": "tech",
      "matchPct": 77
    }
  ],
  "traitScores": {
    "technical": 90,
    "analytical": 82,
    "creative": 45,
    "business": 52,
    "communication": 64,
    "leadership": 58,
    "research": 66,
    "people": 42,
    "structured": 76,
    "riskTaking": 48
  },
  "analysis": {
    "source": "deterministic",
    "logicalProfile": {
      "primaryStyle": "Algorithmic & Systems Thinker",
      "reasoningStrength": "Deconstructing complex technical problems into scalable architectures",
      "decisionStrategy": "Data-driven, iterative optimization with logical rigor",
      "cognitiveSummary": "You demonstrate a distinctive algorithmic & systems thinker profile..."
    },
    "summary": "Your responses demonstrate strong aptitude for Technology & Software...",
    "strengths": [
      "Technical Interest (90/100): Clear preference for technological tools, code, and systems architecture.",
      "Analytical Interest (82/100): Clear preference for structured logical reasoning and objective data interpretation."
    ],
    "developmentAreas": [
      "People (42/100): Skills this path rewards include collaborative peer feedback sessions and active listening.",
      "Creative (45/100): Skills this path rewards include lateral brainstorming and freeform ideation."
    ],
    "nextSteps": [
      "Deep-dive into the foundational milestones for Software Engineer on the Growvia interactive roadmap.",
      "Undertake a targeted hands-on starter project that bridges Technology & Software with your secondary interests."
    ]
  }
}
```

---

### 3.3. `GET /api/career-quiz/latest`

Fetches the student's most recent assessment. Strictly scoped to the authenticated student (`req.user._id`).

- Header: `Authorization: Bearer <token>` (Required).
- Unauthenticated requests receive `401 Unauthorized` (`UNAUTHORIZED`).
- If the student has no assessments, returns `404 Not Found` (`ASSESSMENT_NOT_FOUND`).
- If the latest record is **v3**, returns the stored assessment document directly without recomputing.
- If the latest record is **legacy v2**, transforms the stored record into the v3 contract with `legacy: true`.

---

## 4. Error Code Dictionary

| HTTP Status | Error Code | Description |
| :---: | :--- | :--- |
| `400` | `UNKNOWN_REQUEST_FIELD` | Top-level request body contains unexpected keys. |
| `400` | `INVALID_STAGE1_FORMAT` | `stage1Answers` is missing or not a JSON key-value object. |
| `400` | `INVALID_STAGE1_COUNT` | `stage1Answers` does not contain exactly 7 answers. |
| `400` | `MISSING_STAGE1_QUESTION` | One or more required Stage 1 questions are missing. |
| `400` | `INVALID_STAGE1_TYPE` | An answer value in `stage1Answers` is not a string. |
| `400` | `INVALID_STAGE1_OPTION` | An option ID does not belong to the given Stage 1 question. |
| `400` | `UNKNOWN_STAGE1_QUESTION` | An unknown question ID was provided in `stage1Answers`. |
| `400` | `INVALID_STAGE2_FORMAT` | `stage2Answers` is missing or not a JSON key-value object. |
| `400` | `STAGE2_MISSING_QUESTIONS` | Answers for one or more served Stage 2 questions are missing. |
| `400` | `STAGE2_UNSERVED_QUESTIONS` | `stage2Answers` contains question IDs not in the server-recomputed served set. |
| `400` | `STAGE2_INVALID_OPTION` | An option ID does not belong to the given Stage 2 question. |
| `401` | `UNAUTHORIZED` | Authentication token missing or invalid on protected route (`/latest`). |
| `404` | `ASSESSMENT_NOT_FOUND` | No assessment found for the authenticated user ID. |
| `413` | `PAYLOAD_TOO_LARGE` | Request body exceeds the 20 kB size limit. |
| `429` | `RATE_LIMIT_EXCEEDED` | Request rate exceeded ~30 requests per minute from client IP. |
| `500` | `INTERNAL_SERVER_ERROR` | Unhandled server error during computation or database lookup. |
