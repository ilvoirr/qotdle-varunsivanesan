import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { code, language, problem } = await req.json();

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "system",
            content: `You are a strict code compiler and judge. 
            You will be given a coding problem and the user's solution code in ${language}.
            
            1. Analyze if the code solves the problem correctly.
            2. Check for syntax errors.
            3. Simulate the output based on the problem's examples.
            
            Return STRICTLY valid JSON with no markdown:
            {
              "success": boolean,
              "output": "String (The output of the code or the error message)",
              "analysis": "String (Brief feedback on time complexity or edge cases if success, or hint if failed)"
            }`
          },
          {
            role: "user",
            content: `PROBLEM: ${JSON.stringify(problem)}\n\nUSER CODE:\n${code}`
          }
        ],
        temperature: 0.1
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq API Error Details:", errorData);
      throw new Error(`Groq API Error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.choices || data.choices.length === 0) {
      throw new Error("Groq returned no choices.");
    }

    const rawContent = data.choices[0].message.content;
    
    // --- ✅ FIXED: ROBUST JSON EXTRACTION ---
    // This finds the first '{' and last '}' to ignore any markdown wrappers
    // like "```python" or "Here is the JSON:"
    let cleanedContent = rawContent;
    const firstOpen = rawContent.indexOf('{');
    const lastClose = rawContent.lastIndexOf('}');

    if (firstOpen !== -1 && lastClose !== -1) {
      cleanedContent = rawContent.substring(firstOpen, lastClose + 1);
    }
    // ----------------------------------------

    return NextResponse.json(JSON.parse(cleanedContent));

  } catch (error: any) {
    console.error('Compile Route Error:', error);
    
    // If JSON parsing fails specifically, we return a compilation error
    if (error instanceof SyntaxError) {
       return NextResponse.json({
         success: false,
         output: "System Error: The AI judge returned invalid data.",
         analysis: "Please try running the code again."
       });
    }

    return NextResponse.json({ 
      success: false, 
      output: `System Error: ${error.message}`,
      analysis: "Check your server terminal for the full API error log."
    }, { status: 500 });
  }
}