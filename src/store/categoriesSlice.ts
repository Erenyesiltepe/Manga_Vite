import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface Category {
    id: number;
    name: string;
}

interface CategoriesState {
    categories: Category[];
    loading: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
};

export const fetchCategories = createAsyncThunk(
    'categories/fetchCategories',
    async (_, { getState }) => {
        const state = getState() as RootState;
        if (state.categories.categories.length > 0) {
            return state.categories.categories;
        }

        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas/categories/`, {
            method: 'GET',
            headers: headersList,
        });
        return (await response.json()).results as Category[];
    }
);

const categoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload;
                state.loading = false;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default categoriesSlice.reducer;
