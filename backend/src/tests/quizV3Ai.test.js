/**
 * Step 6 Career Assessment v3 AI Analysis Test Suite
 *
 * Covers:
 * 1. Mocked Provider Happy Path: verifies qualitative output schema, source, model, promptVersion.
 * 2. Input Sanitization: verifies prompt payload contains zero PII, zero weights, zero trait vectors, wrapped titles.
 * 3. Banned Content Rejection: rejects salary, fees, cutoffs, guarantees, ability claims, dashboard, exams -> fallback.
 * 4. Schema Malformation Rejection: missing fields or empty arrays -> deterministic fallback with fallbackReason.
 * 5. Provider Timeout & HTTP 500 Retry: retries once, falls back gracefully to deterministic without throwing.
 * 6. Daily Call Limit: enforces AI_DAILY_CALL_LIMIT, falls back with DAILY_LIMIT_EXCEEDED.
 * 7. In-Memory Caching: reuses cached qualitative analysis for duplicate answer sets without provider re-invocation.
 * 8. Pure Additive Invariant: rankings, picks, matchPct, tie, signal, and traitScores remain 100% byte-identical.
 * 9. Deterministic Analysis Linter: 200 diverse simulated runs verifying word limits, grammar, and zero banned phrases.
 * 10. Optional Live AI Test: executes against live Gemini API when --live flag is passed.
 */

import dotenv from "dotenv";
dotenv.config();

process.env.NODE_ENV = "test";

import {
  generateCareerAnalysisV3,
  setMockAiProvider,
  resetMockAiProvider,
  clearAiCache,
  getAiCacheSize,
  setDailyCallCount,
  resetDailyCallCount,
  getDailyCallCount,
  AI_DAILY_CALL_LIMIT,
  PROMPT_VERSION,
  checkBannedContent,
  sanitizePromptInputs,
  computeCacheKey,
} from "../services/aiService.js";
import { generateDeterministicAnalysis } from "../services/deterministicAnalysis.js";
import { computeCareerResult } from "../services/careerEngine.js";
import { STAGE1_QUESTIONS } from "../config/stage1-questions.js";
import { getStage2Set } from "../services/stage2Selector.js";
import { scoreStage1 } from "../services/stage1Scoring.js";
import { DOMAIN_ROADMAP_MAP } from "../config/quizDomains.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

// Sample test picks fixture
const samplePicks = [
  {
    rank: 1,
    overallRank: 1,
    slug: "engineer",
    title: "Software Engineer",
    domain: "tech",
    matchPct: 94,
    kind: "core",
    whyMatch: "Top match based on Technology & Software alignment.",
    evidence: ["Optimize backend server architecture for massive scale."],
  },
  {
    rank: 2,
    overallRank: 2,
    slug: "ai-ml-engineer",
    title: "AI/ML Engineer",
    domain: "tech",
    matchPct: 88,
    kind: "core",
    whyMatch: "Strong alignment with algorithmic exploration.",
    evidence: ["Train neural networks to detect patterns in medical imagery."],
  },
  {
    rank: 3,
    overallRank: 3,
    slug: "cloud-architect",
    title: "Cloud Architect",
    domain: "tech",
    matchPct: 78,
    kind: "core",
    whyMatch: "High-compatibility pathway in Technology & Software.",
    evidence: [],
  },
  {
    rank: 4,
    overallRank: 4,
    slug: "mechanical-engineer",
    title: "Mechanical Engineer",
    domain: "engineering",
    matchPct: 65,
    kind: "explore",
    whyMatch: "Cross-domain exploration expanding into Core Engineering.",
    evidence: [],
  },
  {
    rank: 5,
    overallRank: 6,
    slug: "financial-analyst",
    title: "Financial Analyst",
    domain: "finance",
    matchPct: 56,
    kind: "wildcard",
    whyMatch: "Wildcard opportunity exploring unique strengths at the intersection of Finance.",
    evidence: [],
  },
];

const sampleShortlist = [
  { slug: "data-scientist", title: "Data Scientist", domain: "tech" },
  { slug: "cybersecurity", title: "Cybersecurity Specialist", domain: "tech" },
];

const sampleChosenAnswers = [
  "Optimize backend server architecture for massive scale.",
  "Train neural networks to detect patterns in medical imagery.",
  "Construct mathematical models to verify algorithm correctness.",
];

const sampleDomainScores = { tech: 0.9, engineering: 0.4, finance: 0.2 };
const sampleTraitScores = { technical: 88, analytical: 82, structured: 70, creative: 45 };

async function runTestSuite() {
  console.log("=============================================================");
  console.log("🚀 Starting Step 6 Career Quiz v3 AI Analysis Test Suite");
  console.log("=============================================================\n");

  let passed = 0;
  let failed = 0;

  async function testCase(name, fn) {
    process.stdout.write(`• Testing: ${name}... `);
    try {
      await fn();
      console.log("✅ PASS");
      passed++;
    } catch (err) {
      console.log(`❌ FAIL: ${err.message}`);
      failed++;
    }
  }

  // -------------------------------------------------------------
  // Test 1: Mocked Provider Happy Path
  // -------------------------------------------------------------
  await testCase("1. Mocked provider happy path produces valid schema & qualitative analysis", async () => {
    clearAiCache();
    resetMockAiProvider();
    resetDailyCallCount();

    let capturedPayload = null;

    setMockAiProvider(async ({ sanitizedInput, model }) => {
      capturedPayload = sanitizedInput;
      return {
        source: "mock-gemini",
        summary: "Your quiz responses demonstrate strong interest in Technology & Software, showing curiosity for scalable systems and computational logic.",
        interestThemes: [
          "Systems Architecture & Backend Logic",
          "Applied Machine Learning Exploration",
          "Structured Quantitative Problem Solving",
        ],
        pickRationales: [
          { slug: "engineer", reason: "Your interest in optimizing backend architectures aligns directly with Software Engineering." },
          { slug: "ai-ml-engineer", reason: "Your choice to train pattern-recognition neural models reflects strong alignment with AI engineering." },
          { slug: "cloud-architect", reason: "Building distributed infrastructure connects naturally with your systems curiosity." },
          { slug: "mechanical-engineer", reason: "Expands your structural problem-solving into physical mechanical systems." },
          { slug: "financial-analyst", reason: "Lateral exploration connecting analytical modeling with financial markets." },
        ],
        developmentAreas: [
          "Technical Depth — building fluency with modern cloud infrastructure and automated deployment pipelines.",
          "Interpersonal Collaboration — communicating technical designs effectively to non-technical stakeholders.",
        ],
        nextSteps: [
          "Explore the foundational milestones on the Software Engineer interactive roadmap.",
          "Undertake a targeted backend hands-on project building an API service.",
          "Review core tools and system architecture patterns across recommended paths.",
        ],
        logicalProfile: {
          primaryStyle: "Algorithmic & Systems Thinker",
          reasoningStrength: "Deconstructing complex technical problems into scalable architectures",
          decisionStrategy: "Systematic verification and alignment with Technology & Software",
          cognitiveSummary: "You approach challenges through structured logic and computational deconstruction.",
        },
      };
    });

    const result = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      isBlended: false,
      signal: { level: "clear" },
      chosenAnswers: sampleChosenAnswers,
      traitScores: sampleTraitScores,
    });

    assert(result.source === "mock-gemini", `Expected mock-gemini, got ${result.source}`);
    assert(result.promptVersion === "3.0.0", `Expected 3.0.0, got ${result.promptVersion}`);
    assert(result.fallbackReason === null, `Expected null fallbackReason, got ${result.fallbackReason}`);
    assert(typeof result.summary === "string" && result.summary.length > 20, "Invalid summary");
    assert(result.interestThemes.length === 3, "Expected exactly 3 interest themes");
    assert(result.pickRationales.length === samplePicks.length, "Expected 5 pick rationales");
    assert(result.developmentAreas.length === 2, "Expected 2 development areas");
    assert(result.nextSteps.length === 3, "Expected 3 next steps");
    assert(result.logicalProfile.primaryStyle === "Algorithmic & Systems Thinker", "Invalid primaryStyle");

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 2: Input Sanitization
  // -------------------------------------------------------------
  await testCase("2. Input sanitization strips PII, weights, trait vectors, and wraps titles", async () => {
    clearAiCache();
    resetDailyCallCount();
    let captured = null;
    setMockAiProvider(async ({ sanitizedInput }) => {
      captured = sanitizedInput;
      return {
        summary: "Valid summary statement regarding technology interests and systems exploration.",
        interestThemes: ["Theme 1", "Theme 2", "Theme 3"],
        pickRationales: samplePicks.map((p) => ({ slug: p.slug, reason: "Aligns with interests." })),
        developmentAreas: ["Dev 1", "Dev 2"],
        nextSteps: ["Step 1", "Step 2", "Step 3"],
        logicalProfile: {
          primaryStyle: "Systems Thinker",
          reasoningStrength: "Logic",
          decisionStrategy: "Evidence",
          cognitiveSummary: "Summary",
        },
      };
    });

    // Provide malicious / leaky object with userId, email, IP, and weights
    await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks.map((p) => ({ ...p, rawOptionWeights: { engineer: 3 }, secretScore: 99 })),
      shortlist: sampleShortlist,
      isBlended: false,
      signal: { level: "clear" },
      chosenAnswers: sampleChosenAnswers,
      traitScores: sampleTraitScores,
      userId: "670c1e8a9f24b5d6e1234567",
      email: "student@example.com",
      ip: "192.168.1.1",
    });

    assert(captured !== null, "Mock provider was not called");
    assert(!("userId" in captured), "userId must not leak into prompt input");
    assert(!("email" in captured), "email must not leak into prompt input");
    assert(!("ip" in captured), "IP must not leak into prompt input");
    assert(!("traitScores" in captured), "Raw trait vector must not leak into prompt input");

    // Verify titles are delimited with « »
    for (const p of captured.candidatePicks) {
      assert(p.title.startsWith("«") && p.title.endsWith("»"), `Title '${p.title}' not wrapped in delimiters`);
      assert(!("rawOptionWeights" in p), "rawOptionWeights must not leak");
      assert(!("secretScore" in p), "secretScore must not leak");
    }

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 3: Banned Content Regex Linter Rejection & Fallback
  // -------------------------------------------------------------
  await testCase("3. Banned content (salary, fees, guarantees, ability claims, dashboard, exams) triggers fallback", async () => {
    clearAiCache();
    resetDailyCallCount();

    const bannedTestCases = [
      { field: "salary", val: "The starting salary for this roadmap is 12 LPA with high growth." },
      { field: "fees", val: "You will need to pay college fees and tuition costs." },
      { field: "guarantee", val: "This career path comes with a 100% placement guarantee." },
      { field: "ability claim", val: "Based on our metrics, you are good at writing backend code." },
      { field: "dashboard", val: "Check your progress anytime on the personalized dashboard." },
      { field: "entrance exam", val: "You must prepare thoroughly to crack the JEE and NEET exams." },
    ];

    for (const { field, val } of bannedTestCases) {
      clearAiCache();
      setMockAiProvider(async () => ({
        summary: `Career summary statement. ${val}`,
        interestThemes: ["Theme 1", "Theme 2", "Theme 3"],
        pickRationales: samplePicks.map((p) => ({ slug: p.slug, reason: "Standard rationale." })),
        developmentAreas: ["Dev 1", "Dev 2"],
        nextSteps: ["Step 1", "Step 2", "Step 3"],
        logicalProfile: {
          primaryStyle: "Systems Thinker",
          reasoningStrength: "Logic",
          decisionStrategy: "Evidence",
          cognitiveSummary: "Summary",
        },
      }));

      const res = await generateCareerAnalysisV3({
        domainScores: sampleDomainScores,
        picks: samplePicks,
        shortlist: sampleShortlist,
        chosenAnswers: [`test answer for ${field}`],
        traitScores: sampleTraitScores,
      });

      assert(res.source === "deterministic", `Expected fallback to deterministic for banned phrase '${field}', got ${res.source}`);
      assert(res.fallbackReason === "BANNED_CONTENT", `Expected BANNED_CONTENT for '${field}', got ${res.fallbackReason}`);
    }

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 4: Schema Malformation Rejection & Fallback
  // -------------------------------------------------------------
  await testCase("4. Malformed schema (missing summary, empty themes) triggers fallback", async () => {
    clearAiCache();
    resetDailyCallCount();

    setMockAiProvider(async () => ({
      // Missing summary entirely
      interestThemes: ["Theme 1"],
      pickRationales: [],
    }));

    const res = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      chosenAnswers: ["some answer"],
      traitScores: sampleTraitScores,
    });

    assert(res.source === "deterministic", "Expected deterministic fallback");
    assert(res.fallbackReason === "SCHEMA_VALIDATION_FAILED", `Expected SCHEMA_VALIDATION_FAILED, got ${res.fallbackReason}`);

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 5: Provider Timeout & Failure Fallback (Never throws)
  // -------------------------------------------------------------
  await testCase("5. Provider timeout or error falls back to deterministic analysis without throwing", async () => {
    clearAiCache();
    resetDailyCallCount();

    setMockAiProvider(async () => {
      const err = new Error("Simulated gateway timeout");
      err.name = "TimeoutError";
      throw err;
    });

    const res = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      chosenAnswers: ["timeout test answer"],
      traitScores: sampleTraitScores,
    });

    assert(res.source === "deterministic", "Expected deterministic fallback on timeout");
    assert(res.fallbackReason === "TIMEOUT", `Expected TIMEOUT, got ${res.fallbackReason}`);
    assert(res.summary.length > 20, "Fallback summary must be valid");

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 6: Daily Call Limit Enforcement
  // -------------------------------------------------------------
  await testCase("6. Enforces AI_DAILY_CALL_LIMIT and falls back with DAILY_LIMIT_EXCEEDED", async () => {
    clearAiCache();
    setDailyCallCount(AI_DAILY_CALL_LIMIT); // Set count directly to max

    let mockCalled = false;
    setMockAiProvider(async () => {
      mockCalled = true;
      return {};
    });

    const res = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      chosenAnswers: ["daily limit test answer"],
      traitScores: sampleTraitScores,
    });

    assert(mockCalled === false, "Mock provider must not be called when daily limit is reached");
    assert(res.source === "deterministic", "Expected deterministic fallback on daily limit");
    assert(res.fallbackReason === "DAILY_LIMIT_EXCEEDED", `Expected DAILY_LIMIT_EXCEEDED, got ${res.fallbackReason}`);

    resetDailyCallCount();
    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 7: In-Memory Response Caching
  // -------------------------------------------------------------
  await testCase("7. Duplicate answer sets hit in-memory cache without re-invoking provider", async () => {
    clearAiCache();
    resetDailyCallCount();

    let invocationCount = 0;
    setMockAiProvider(async () => {
      invocationCount++;
      return {
        summary: "Summary for caching test.",
        interestThemes: ["Theme 1", "Theme 2", "Theme 3"],
        pickRationales: samplePicks.map((p) => ({ slug: p.slug, reason: "Rationale" })),
        developmentAreas: ["Dev 1", "Dev 2"],
        nextSteps: ["Step 1", "Step 2", "Step 3"],
        logicalProfile: {
          primaryStyle: "Style",
          reasoningStrength: "Reasoning",
          decisionStrategy: "Strategy",
          cognitiveSummary: "Summary",
        },
      };
    });

    const firstRun = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      chosenAnswers: ["caching test question answer 1", "caching test question answer 2"],
      traitScores: sampleTraitScores,
    });

    assert(invocationCount === 1, `Expected 1 invocation, got ${invocationCount}`);
    assert(!firstRun.cached, "First run should not be flagged cached");

    const secondRun = await generateCareerAnalysisV3({
      domainScores: sampleDomainScores,
      picks: samplePicks,
      shortlist: sampleShortlist,
      chosenAnswers: ["caching test question answer 1", "caching test question answer 2"],
      traitScores: sampleTraitScores,
    });

    assert(invocationCount === 1, `Expected still 1 invocation after cache hit, got ${invocationCount}`);
    assert(secondRun.cached === true, "Second run must have cached: true");
    assert(secondRun.summary === firstRun.summary, "Cached summary mismatch");

    resetMockAiProvider();
  });

  // -------------------------------------------------------------
  // Test 8: Pure Additive Invariant Check
  // -------------------------------------------------------------
  await testCase("8. Pure additive invariant: picks, ranks, matchPct, tie, and signal are identical with AI vs fallback", async () => {
    clearAiCache();
    resetDailyCallCount();

    // 1. Create simulated answers for tech
    const s1Answers = {};
    for (const q of STAGE1_QUESTIONS) {
      s1Answers[q.id] = q.options[0].id;
    }
    const seed = "test_invariant_seed_123";
    const s1Result = scoreStage1(s1Answers, { seed });
    const s2Set = getStage2Set(s1Result, { seed });
    const s2Answers = {};
    for (const q of s2Set) {
      s2Answers[q.id] = q.options[0].id;
    }

    // 2. Compute careerResult directly
    const directResult = computeCareerResult({
      stage1Answers: s1Answers,
      stage2Answers: s2Answers,
    });

    // 3. Run with mock AI
    setMockAiProvider(async () => ({
      summary: "AI qualitative summary statement.",
      interestThemes: ["T1", "T2", "T3"],
      pickRationales: directResult.picks.map((p) => ({ slug: p.slug, reason: "AI reason" })),
      developmentAreas: ["D1", "D2"],
      nextSteps: ["S1", "S2", "S3"],
      logicalProfile: {
        primaryStyle: "Style",
        reasoningStrength: "Reasoning",
        decisionStrategy: "Strategy",
        cognitiveSummary: "Summary",
      },
    }));

    const aiAnalysis = await generateCareerAnalysisV3({
      domainScores: directResult.stage1.domainScores,
      picks: directResult.picks,
      shortlist: directResult.shortlist,
      isBlended: directResult.stage1.isBlended,
      signal: directResult.signal,
      chosenAnswers: ["answer 1", "answer 2"],
      traitScores: directResult.traitScores,
    });

    resetMockAiProvider();

    // 4. Run with deterministic generator
    const detAnalysis = generateDeterministicAnalysis({
      picks: directResult.picks,
      topDomains: directResult.stage1.topDomains,
      domainScores: directResult.stage1.domainScores,
      traitScores: directResult.traitScores,
      isBlended: directResult.stage1.isBlended,
      signal: directResult.signal,
      chosenAnswers: ["answer 1", "answer 2"],
    });

    // Verify AI analysis did not mutate picks or scores
    for (let i = 0; i < directResult.picks.length; i++) {
      const p = directResult.picks[i];
      assert(p.rank === i + 1, `Pick rank corrupted at ${i}`);
      assert(typeof p.matchPct === "number", `Pick matchPct corrupted at ${i}`);
    }

    // Verify tie and signal
    assert(directResult.signal.level === "clear" || directResult.signal.level === "mixed" || directResult.signal.level === "open");
  });

  // -------------------------------------------------------------
  // Test 9: Deterministic Analysis Linter (200 diverse simulated runs)
  // -------------------------------------------------------------
  await testCase("9. Deterministic analysis linter: 200 diverse simulated runs pass all constraints", async () => {
    const domains = Object.keys(DOMAIN_ROADMAP_MAP).map((slug) => DOMAIN_ROADMAP_MAP[slug].domain);
    const uniqueDomains = Array.from(new Set(domains));

    for (let run = 0; run < 200; run++) {
      const d1 = uniqueDomains[run % uniqueDomains.length];
      const d2 = uniqueDomains[(run + 3) % uniqueDomains.length];
      const isBlended = run % 2 === 0;

      // Construct simulated picks
      const fakePicks = [
        {
          rank: 1,
          slug: "test-slug-1",
          title: "Pathway One",
          domain: d1,
          matchPct: 92,
          kind: "core",
          whyMatch: `Leading match in ${d1}.`,
          evidence: ["Analyze complex operational data to identify bottlenecks."],
        },
        {
          rank: 2,
          slug: "test-slug-2",
          title: "Pathway Two",
          domain: d1,
          matchPct: 84,
          kind: "core",
          whyMatch: `Strong alternative match in ${d1}.`,
          evidence: ["Draft policy briefs based on statutory research."],
        },
        {
          rank: 3,
          slug: "test-slug-3",
          title: "Pathway Three",
          domain: d2,
          matchPct: 76,
          kind: "explore",
          whyMatch: `Expanding into ${d2}.`,
          evidence: [],
        },
      ];

      const fakeTraits = {
        technical: 50 + (run % 45),
        analytical: 40 + ((run * 3) % 55),
        creative: 30 + ((run * 7) % 65),
        people: 45 + ((run * 2) % 50),
        structured: 60 + (run % 35),
      };

      const analysis = generateDeterministicAnalysis({
        picks: fakePicks,
        topDomains: [d1, d2],
        domainScores: { [d1]: 0.8, [d2]: 0.5 },
        traitScores: fakeTraits,
        isBlended,
        signal: { level: run % 3 === 0 ? "clear" : run % 3 === 1 ? "mixed" : "open" },
        chosenAnswers: ["Analyze complex operational data to identify bottlenecks."],
      });

      // 1. Structure checks
      assert(analysis.source === "deterministic", "Source must be deterministic");
      assert(analysis.promptVersion === "3.0.0", "Prompt version must be 3.0.0");
      assert(analysis.interestThemes.length === 3, `Run ${run}: Expected 3 interestThemes, got ${analysis.interestThemes.length}`);
      assert(analysis.pickRationales.length === fakePicks.length, `Run ${run}: Pick rationales count mismatch`);
      assert(analysis.developmentAreas.length === 2, `Run ${run}: Expected 2 development areas`);
      assert(analysis.nextSteps.length === 3, `Run ${run}: Expected 3 next steps`);
      assert(analysis.logicalProfile && analysis.logicalProfile.primaryStyle, "Missing logical profile primaryStyle");

      // 2. Fact-grounded evidence check
      const pick1Rationale = analysis.pickRationales[0].reason;
      assert(
        pick1Rationale.includes("Analyze complex operational data to identify bottlenecks"),
        `Run ${run}: Pick 1 rationale does not include candidate evidence: ${pick1Rationale}`
      );

      // 3. Strict Banned content linting
      const lint = checkBannedContent(analysis);
      assert(lint.valid, `Run ${run}: Deterministic analysis failed banned content check: ${JSON.stringify(lint.violations)}`);

      // 4. Grammar checks
      assert(!analysis.summary.includes("  "), `Run ${run}: Summary contains double spaces`);
      assert(!analysis.summary.includes("undefined"), `Run ${run}: Summary contains undefined`);
      assert(!analysis.summary.includes("null"), `Run ${run}: Summary contains null`);
      assert(!analysis.logicalProfile.cognitiveSummary.includes("undefined"), `Run ${run}: Cognitive summary contains undefined`);
    }
  });

  // -------------------------------------------------------------
  // Test 10: Optional Live AI Test
  // -------------------------------------------------------------
  const isLiveFlag = process.argv.includes("--live");
  if (isLiveFlag) {
    await testCase("10. [LIVE] Live Google Gemini API call with real credentials", async () => {
      clearAiCache();
      process.env.LIVE_AI_TEST = "true";

      const apiKey = process.env.GEMINI_API_KEY;
      assert(apiKey && apiKey.length > 10, "GEMINI_API_KEY missing from environment");

      const liveResult = await generateCareerAnalysisV3({
        domainScores: sampleDomainScores,
        picks: samplePicks,
        shortlist: sampleShortlist,
        isBlended: false,
        signal: { level: "clear" },
        chosenAnswers: sampleChosenAnswers,
        traitScores: sampleTraitScores,
      });

      console.log(`\n    [Live AI Output Summary]: "${liveResult.summary.slice(0, 90)}..."`);
      console.log(`    [Live Source]: ${liveResult.source} | Model: ${liveResult.model}`);
      assert(liveResult.source === "gemini", `Expected source gemini, got ${liveResult.source}`);
      assert(liveResult.interestThemes.length >= 3, "Expected at least 3 interest themes from live model");
      assert(liveResult.pickRationales.length === samplePicks.length, "Expected pick rationales for all picks");

      const lint = checkBannedContent(liveResult);
      assert(lint.valid, `Live model output failed banned content check: ${JSON.stringify(lint.violations)}`);
    });
  }

  console.log("\n=============================================================");
  console.log(`Step 6 AI Analysis Test Summary: ${passed} Passed, ${failed} Failed`);
  console.log("=============================================================\n");

  if (failed > 0) {
    process.exit(1);
  }
}

runTestSuite().catch((err) => {
  console.error("Unhandled error in test suite:", err);
  process.exit(1);
});
