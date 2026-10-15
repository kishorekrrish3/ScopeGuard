import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
import { DEFAULT_PROJECTS } from "@/lib/mongodb";

export async function POST() {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri || (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://"))) {
    return NextResponse.json({
      seeded: true,
      mode: "local-fallback",
      message: "No valid MONGODB_URI configured. Operating in zero-setup fallback mode with built-in SOW contracts.",
      projects: DEFAULT_PROJECTS.map((p) => ({ id: p.id, projectName: p.projectName, rate: p.hourlyRate })),
    });
  }

  try {
    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 3000,
      connectTimeoutMS: 3000,
    });
    await client.connect();
    const db = client.db("scopeguard");
    const collection = db.collection("sow_clauses");

    for (const project of DEFAULT_PROJECTS) {
      await collection.updateOne(
        { id: project.id },
        { $set: { ...project, updatedAt: new Date() } },
        { upsert: true }
      );
    }

    await client.close();

    return NextResponse.json({
      seeded: true,
      mode: "mongodb-atlas",
      count: DEFAULT_PROJECTS.length,
      message: "Successfully seeded SOW clauses into MongoDB Atlas collection 'sow_clauses'.",
    });
  } catch (error: any) {
    console.error("[Seed API Error]:", error);
    return NextResponse.json(
      {
        seeded: false,
        mode: "local-fallback",
        error: error?.message || "Failed to connect to MongoDB Atlas",
      },
      { status: 500 }
    );
  }
}
