import { createTool } from "@mastra/core/tools";
import { z } from "zod";
import * as Sentry from "@sentry/nextjs";
import { getProjectSow } from "@/lib/mongodb";

export const sowRetrieverTool = createTool({
  id: "retrieve-sow-clauses",
  description:
    "Retrieves signed Statement of Work (SOW) contract clauses, hourly rates, and NDA constraints for a project from MongoDB Atlas (with graceful in-memory fallback).",
  inputSchema: z.object({
    projectId: z
      .string()
      .describe(
        "The unique project identifier (e.g. proj_fintech_mvp or proj_ecom_headless)"
      ),
  }),
  execute: async (input: { projectId?: string; context?: { projectId?: string } }) => {
    const targetProjectId = input?.projectId || input?.context?.projectId || "proj_fintech_mvp";

    return await Sentry.startSpan(
      {
        op: "gen_ai.execute_tool",
        name: "retrieve-sow-clauses (MongoDB Atlas)",
        attributes: {
          "gen_ai.tool.name": "retrieve-sow-clauses",
        },
      },
      async (span) => {
        try {
          span?.setAttribute("gen_ai.tool.input", JSON.stringify({ projectId: targetProjectId }));
        } catch {
          // ignore span attribute failures
        }

        const sow = await getProjectSow(targetProjectId);

        const result = {
          projectName: sow.projectName,
          hourlyRate: sow.hourlyRate,
          ndaLevel: sow.ndaLevel,
          clauses: sow.clauses,
          storageMode: sow.storageMode || "local-fallback",
        };

        try {
          span?.setAttribute("gen_ai.tool.output", JSON.stringify(result));
        } catch {
          // ignore span attribute failures
        }

        return result;
      }
    );
  },
});
