import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { IUserProfile } from "@/types/UserProfile";
import {
  getProfiles as getProfilesAPI,
  createProfile as createProfileAPI,
} from "@services/userProfileService";

interface ProfileState {
  userProfiles: IUserProfile[];
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  userProfiles: [],
  loading: false,
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  "profiles/fetchProfiles",
  async () => {
    return await getProfilesAPI();
  }
);

export const createProfile = createAsyncThunk(
  "profiles/createProfile",
  async (profile: IUserProfile) => {
    return await createProfileAPI(profile);
  }
);

const userProfiles = createSlice({
  name: "userProfiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfiles = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user profiles";
      })
      .addCase(createProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfiles.push(action.payload);
      })
      .addCase(createProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create profile";
      });
  },
});

export default userProfiles.reducer;
