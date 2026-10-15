import { Mastra } from "@mastra/core";
import { scopeGuardAgent } from "./agents/scope-agent";

export const mastra = new Mastra({
  agents: {
    scopeGuardAgent,
  },
});
