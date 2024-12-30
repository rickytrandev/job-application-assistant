import { NextResponse } from "next/server"
import { OpenAI } from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const POST = async (request: Request) => {
  try {
    const { jobDescription } = await request.json()

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are an expert job coach that generates interview questions based on the job description given: ${jobDescription}. Take into consideration the level of the role to decide appropriate questions. Please generate 8 interview questions based on the job description. Return the reponse as a JSON array where each element is an interview question. an example response should look like this: [question1, question2, question3]`,
            },
          ],
        },
      ],
    })

    let interviewQuestions = completion.choices?.[0]?.message?.content

    if (!interviewQuestions) {
      throw new Error("No response from OpenAI")
    }

    return NextResponse.json({ interviewQuestions })
    
  } catch (error) {
    console.error("Internal Server Error: ", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
