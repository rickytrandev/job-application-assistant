"use client"

import { useEffect, useState } from "react"
import { getInterviewQuestions, scrapeJobDescription } from "./services/api";

function Page() {
  const [jobUrl, setJobUrl] = useState("")
  const [resumeFile, setResumeFile] = useState<null | File>(null)
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [interviewQuestions, setInterviewQuestions] = useState<String[]>([]);

    // useEffect(() => {console.log(resumeFile)}, [resumeFile])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const jobDescription = await scrapeJobDescription(jobUrl)
    setJobDescription(jobDescription)

    const interviewQuestions = await getInterviewQuestions(jobDescription)
    console.log(interviewQuestions[0])
    console.log(interviewQuestions)
    setInterviewQuestions(interviewQuestions)
   
  }

  return (
    <div className="container mx-auto p-8 h-screen flex flex-col gap-2">
      <h1 className="text-2xl font-bold">Job Application Assistant</h1>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit}>        
        <div className="flex flex-col">
          <label htmlFor="jobUrl">Job Posting URL</label>
          <input
            id="jobUrl"
            type="url"
            placeholder="e.g. job-boards.greenhouse.io/job-posting"
            value={jobUrl}
            onChange={(e) => setJobUrl(e.target.value)}
            required
            className="border border-2 rounded p-2"
          />
        </div>
        <div className=" flex flex-col">
          <label htmlFor="resumeUpload">Upload Resume (PDF)</label>
          <input
            id="resumeUpload"
            type="file"
            accept=".pdf"
            onChange={(e) => setResumeFile(e.target.files?.[0] || null)}
            // required TODO: remove when in prod
            multiple={false}
            className="border border-2 rounded p-2"
          />
        </div>
        <button type="submit" className="bg-black text-white rounded px-4 py-2">
          Generate Cover Letter and Questions
        </button>
      </form>
      <div className="border border-2 rounded p-2 h-1/2 flex flex-col">
        <h2 className="text-xl font-bold mb-4">Generated Cover Letter</h2>
        <div className="border border-2 rounded p-2 h-full"><p>cover letter content</p></div>
      </div>
    </div>
  )
}

export default Page
