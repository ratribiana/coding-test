import { $axios, setBaseUrl, setHeader } from '@lib/http';
import { IUserProfile } from '@/types/UserProfile';

setBaseUrl($axios, import.meta.env.VITE_API_BASE_URL);
setHeader($axios, "Content-Type", "application/json");

export const getProfiles = async (): Promise<IUserProfile[]> => {
  try {
    const response = await $axios.get<{ data: IUserProfile[] }>('/v1/profile/');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching profiles:', error);
    throw error;
  }
};

export const createProfile = async (profile: IUserProfile): Promise<IUserProfile> => {
  try {
    const response = await $axios.post<{ data: IUserProfile }>('/v1/profile/', profile);
    return response.data.data;
  } catch (error) {
    console.error('Error creating profile:', error);
    throw error;
  }
};