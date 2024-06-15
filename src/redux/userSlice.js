import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// export const getUsers = () => {
//   return async (dispatch) => {
//     const res = await fetch("https://jsonplaceholder.typicode.com/users");
//     const data = await res.json();
//     dispatch(setUsers(data));
//   };
// };
export const getUsers = createAsyncThunk("users/getUsers", async () => {
  return await new Promise((resolve) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((users) => {
        setTimeout(() => resolve(users), 1000);
      });
  });
  // return await fetch("https://jsonplaceholder.typicode.com/users2").then(
  //   (res) => {
  //     if (!res.ok) {
  //       throw new Error(`${res.status} error`);
  //     }
  //     return res.json();
  //   }
  // );
});

const userSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    loading: false,
    error: false,
  },
  // reducers: {
  //   setUsers: (state, action) => {
  //     state.users = action.payload;
  //   },
  // },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state) => {
        state.loading = false;
        state.error = true;
      });
  },
});

// export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
