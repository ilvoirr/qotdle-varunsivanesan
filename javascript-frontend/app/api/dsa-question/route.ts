import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Missing GROQ_API_KEY environment variable' },
      { status: 500 }
    );
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "system",
            content: `You are a strict technical interviewer. Generate a unique Data Structures and Algorithms (DSA) problem.
            
            DIFFICULTY: EASY (Strictly).
            
            The problem should be concise and solvable quickly.
            
            IMPORTANT: Return STRICTLY valid JSON. Do not include any markdown formatting (like \`\`\`json). Do not add any conversational text.
            
            The JSON structure must be exactly:
            {
              "title": "Problem Title",
              "difficulty": "Easy",
              "description": "Clear problem statement...",
              "constraints": ["Constraint 1", "Constraint 2"],
              "examples": [
                { "input": "...", "output": "...", "explanation": "..." }
              ]
            }`
          },
          {
            role: "user",
            content: "Generate a new easy DSA problem."
          }
        ],
        temperature: 0.8
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API returned ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) throw new Error("No content generated.");

    const cleanedContent = content.replace(/```json/g, '').replace(/```/g, '').trim();

    return NextResponse.json(JSON.parse(cleanedContent));

  } catch (error: any) {
    console.error('DSA Question Route Error:', error);
    return NextResponse.json({ 
      title: "Connection Error", 
      difficulty: "System",
      description: "Failed to generate problem. " + (error?.message || ''),
      constraints: ["Check GROQ_API_KEY"],
      examples: [] 
    }, { status: 500 });
  }
}