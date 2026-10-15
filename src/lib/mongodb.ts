import { MongoClient } from "mongodb";
import { DEFAULT_PROJECTS, ProjectSow, SowClause } from "./contracts";

export { DEFAULT_PROJECTS };
export type { ProjectSow, SowClause };

let cachedClient: MongoClient | null = null;

async function getMongoClient(): Promise<MongoClient | null> {
  const uri = process.env.MONGODB_URI?.trim();
  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 2500,
      connectTimeoutMS: 2500,
    });
    await client.connect();
    cachedClient = client;
    return cachedClient;
  } catch (err) {
    console.warn("[MongoDB] Connection failed, falling back to local dataset:", err);
    return null;
  }
}

export async function getProjectSow(projectId: string): Promise<ProjectSow> {
  try {
    const client = await getMongoClient();
    if (client) {
      const db = client.db("scopeguard");
      const collection = db.collection<ProjectSow>("sow_clauses");
      const doc = await collection.findOne({
        $or: [{ id: projectId }, { _id: projectId as unknown as any }],
      });

      if (doc) {
        return {
          ...doc,
          id: doc.id || (doc._id as string),
          storageMode: "mongodb-atlas",
        };
      }
    }
  } catch (error) {
    console.warn("[MongoDB] Query error, falling back to built-in SOW:", error);
  }

  // Graceful fallback to rich built-in SOW dataset
  const fallback = DEFAULT_PROJECTS.find((p) => p.id === projectId) || DEFAULT_PROJECTS[0];
  return {
    ...fallback,
    storageMode: "local-fallback",
  };
}
