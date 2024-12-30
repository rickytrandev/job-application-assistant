interface generateCoverLetterType {
  jobDescription: String
  resumeFile: File
}

export const scrapeJobDescription = async (jobUrl: string) => {
  const response = await fetch("api/extractJobDescription", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ url: jobUrl }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.error("Error:", errorText)
    throw new Error("Failed to scrape job description")
  }

  const result = await response.json()
  return result.jobDescription
}

export const generateCoverLetter = async ({
  jobDescription,
  resumeFile,
}: generateCoverLetterType) => {
  const response = await fetch("api/getCoverLetter", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobDescription, resumeFile }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(errorText)
    throw new Error("Failed to generate cover letter")
  }

  const result = await response.json()
  return result.coverLetter
}

export const getInterviewQuestions = async (jobDescription: String) => {
  const response = await fetch("api/getInterviewQuestions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ jobDescription }),
  })

  if (!response.ok) {
    const errorText = await response.text()
    console.log(errorText)
    throw new Error('Failed to retrieve interview questions')
  }

  const result = await response.json()
  return result.interviewQuestions
}
