import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Thunks
const fetchpostsData = createAsyncThunk("posts/fetchpostsData", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const postsData = await res.json();
  return postsData;
});

const fetchByUserId = createAsyncThunk("posts/fetchByUserId", async (userId) => {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
  const filteredData = await res.json();
  return filteredData;
});

// Slice
const slice = createSlice({
  name: "post",
  initialState: {
    postsData: [],
    loading: false
  },
  extraReducers: {
    [fetchByUserId.pending]: (state, _) => {
      state.error = null;
    },
    [fetchByUserId.fulfilled]: (state, action) => {
      state.postsData = action.payload;
      state.loading = false;
    },
    [fetchByUserId.rejected]: (state, action) => {
      console.log(action);
      state.error = action.payload;
    },
    [fetchpostsData.pending]: (state, _) => {
      state.loading = true;
      state.error = null;
    },
    [fetchpostsData.fulfilled]: (state, action) => {
      state.postsData = action.payload;
      state.loading = false;
    },
    [fetchpostsData.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
  }
});
export default slice.reducer;

export { fetchpostsData, fetchByUserId };
