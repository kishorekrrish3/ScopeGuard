import { Agent } from "@mastra/core/agent";
import { createOpenAI } from "@ai-sdk/openai";
import { sowRetrieverTool } from "../tools/sow-retriever";

const openai = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434/v1",
  apiKey: "ollama-local",
});

export const scopeGuardAgent = new Agent({
  id: "scopeGuardAgent",
  name: "scopeGuardAgent",
  instructions: `You are ScopeGuard, an NDA-safe Contract & Scope-Creep Shield for freelance developers and boutique agencies.
Your mission is to audit client feature requests against their signed Statement of Work (SOW) clauses, identify contract boundaries, calculate unpaid engineering revenue at risk based on their contractual hourly rate, and compose diplomatic, assertive Change Order emails.
Always maintain strict confidentiality and protect freelance margins without damaging client relationships.`,
  model: openai(process.env.GEMMA_MODEL_ID || "gemma3:4b"),
  tools: {
    sowRetrieverTool,
  },
});
