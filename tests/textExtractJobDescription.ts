import handler from "@/app/api/extractJobDescription/route";
import { NextApiRequest, NextApiResponse } from 'next';

const mockRequest = (url: string): NextApiRequest => {
  return {
    method: 'POST',
    body: { url },
  } as NextApiRequest;
};

const mockResponse = (): NextApiResponse => {
  const res: Partial<NextApiResponse> = {};
  res.status = (statusCode: number) => {
    res.statusCode = statusCode;
    return res as NextApiResponse;
  };
  res.json = (data: any) => {
    console.log('Response:', data);
    return res as NextApiResponse;
  };
  return res as NextApiResponse;
};

const testHandler = async (url: string) => {
  const req = mockRequest(url);
  const res = mockResponse();

  await handler(req, res);
};

// Test the function with a sample URL
testHandler('https://www.linkedin.com/jobs/view/4077803286/?alternateChannel=search&refId=YRS2wATCgPGiV%2FjwCxyjRA%3D%3D&trackingId=RNvyZrJf97A8HVEAYa3mOA%3D%3D');