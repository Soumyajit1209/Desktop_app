// app/api/auto-assign/route.ts

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json({
    characterName: "John AI",
    characterRole: "Guide",
    lifeSpan: "5 years",
    aiPersonality: "Friendly",
    field1: "Template Value 1",
    field2: "Template Value 2",
    field3: "Template Value 3",
    field4: "Template Value 4",
  });
}
