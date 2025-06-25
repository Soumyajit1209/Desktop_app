// app/api/auto-assign/route.ts

export const dynamic = 'force-dynamic'; // Allows dynamic execution even with export issues

export async function GET() {
  return Response.json({
    characterName: "Neo",
    characterRole: "Hacker",
    lifeSpan: "Unknown",
    aiPersonality: "Rebellious",
  });
}
