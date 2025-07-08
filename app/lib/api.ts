import type { VCProfile } from "./types";
import { mockVCData } from "./mockData"; // <-- Import your mock data

/**
 * Fetch VC profiles by industry from mock data (frontend only)
 */
export const fetchVCsByIndustry = async (industry: string): Promise<VCProfile[]> => {
  // Simulate async behavior for consistency with real API
  await new Promise((resolve) => setTimeout(resolve, 300));

  const searchTerm = industry.toLowerCase().trim();
  return mockVCData.filter(
      (profile) =>
          profile.industryFocus.toLowerCase().includes(searchTerm) ||
          profile.sectors.some((sector) => sector.toLowerCase().includes(searchTerm)) ||
          profile.description.toLowerCase().includes(searchTerm) ||
          profile.firmName.toLowerCase().includes(searchTerm)
  );
};

export type { VCProfile } from "./types"; // ✅ re-export cleanly

/**
 * Send a chat message to the backend chatbot
 */
export const sendChatMessage = async (message: string): Promise<string> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message }),
  });
  if (!response.ok) throw new Error('Failed to get chat response');
  const data = await response.json();
  return data.text;
};

/**
 * Fetch QA results from the backend
 */
export const fetchQA = async (question: string): Promise<any[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/qa`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });
  if (!response.ok) throw new Error('Failed to fetch QA results');
  const data = await response.json();
  return data.results || [];
};
