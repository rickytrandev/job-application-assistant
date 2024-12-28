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

export const generateCoverLetter = (jobDescription: string) => {
  
};

