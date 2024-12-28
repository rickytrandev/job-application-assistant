import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

const jobBoardSelectors: { [key: string]: string } = {
  'indeed.com': '.jobsearch-jobDescriptionText',
  'linkedin.com': '.jobs-description__container',
  'monster.com': '.job-description',
  'job-boards.greenhouse.io': '.job-post',
};

const getDomain = (url: string): string | null => {
  const match = url.match(/:\/\/(www\.)?(.[^/]+)/);
  return match ? match[2] : null;
};


export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      console.error('URL is required');
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    const domain = getDomain(url);
    const selector: string | undefined = jobBoardSelectors[domain || ''];

    if (!selector) {
      console.error(`No scraping logic found for domain: ${domain}`);
      return NextResponse.json({ error: `No scraping logic found for domain: ${domain}` }, { status: 400 });
    }

    console.log('Selector:', selector);
    const browser = await puppeteer.launch({
      headless: false, //TODO: turn true in PROD
    });
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle2' });

    // Wait for the selector to appear on the page with increased timeout
    await page.waitForSelector(selector, { timeout: 30000 });

    const jobDescription = await page.$eval(selector, (element: Element) => {
      return (element as HTMLElement).innerText;
    });

    await browser.close();

    return NextResponse.json({ jobDescription });
  } catch (error) {
    console.error('Internal Server Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}