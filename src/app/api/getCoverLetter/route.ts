import { NextResponse } from "next/server"
import { OpenAI } from "openai"

export async function POST(request: Request) {
  try {
    const { jobDescription, resumeFile } = await request.json()
    
  } catch (error) {
    console.log(`error fetching cover letter ${error}`)
  }
}
