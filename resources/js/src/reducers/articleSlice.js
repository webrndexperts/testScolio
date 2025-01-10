// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// const API = process.env.REACT_APP_API_URL 
// export const fetchArticle = createAsyncThunk("fetchArticle", async (_, { getState }) => {
//     const currentLanguage = getState().language.currentLanguage;
//     try {
//         const res = await axios.get(`${API}posts/filter/${currentLanguage}`) ;
//          return res.data;
//     } catch (error) {
//         console.log("res---------",error);
//     }
//  });

//  const articleSlice = createSlice({
//     name: "article",
//     initialState: {
//      isLoading: false,
//      articleData: [],
//      isError: false
//     },
//     extraReducers: (builder) => {
//      builder.addCase(fetchArticle.pending, (state) => {
//       state.isLoading = true;
//      })
//      builder.addCase(fetchArticle.fulfilled, (state, action) => {
//       state.isLoading = false;
//       state.articleData = action.payload;
//      })
//      builder.addCase(fetchArticle.rejected, (state) => {
//       state.isError = true;
//      })
//     }
//    });
//    export default articleSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const articleSlice = createSlice({
  	name: 'article',
  	initialState: {
    	parentId: '',
  	},
  	reducers: {
    	setArticleParent: (state, action) => {
      		state.parentId = action.payload;
    	},
  	},
});

export const { setArticleParent } = articleSlice.actions;
export const selectArticleParent = (state) => state.article.parentId;
export default articleSlice.reducer;