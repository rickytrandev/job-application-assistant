"use client"

import { useState } from "react"

function page(props) {
  const [jobUrl, setJobUrl] = useState("")
  const [resumeFile, setResumeFile] = useState<null | File>(null)

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4-2xl">Job Application Assistant</h1>
      <form action="">
        <div className=" flex flex-col">
          <label htmlFor="jobUrl">Job Posting URL (LinkedIn)</label>
          <input
            id="jobUrl"
            type="url"
            placeholder="https://linkedin.com/job-posting"
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
            required
            multiple={false}
            className="border border-2 rounded p-2"
          />
        </div>
        <button type="submit" className="bg-black text-white rounded px-4 py-2">Generate Cover Letter and Questions</button>
      </form>
    </div>
  )
}

export default page
