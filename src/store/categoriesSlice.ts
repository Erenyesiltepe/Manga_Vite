import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface Category {
    id: number;
    name: string;
}

export interface CategoriesState {
    categories: Category[];
    loading: boolean;
}

const initialState: CategoriesState = {
    categories: [],
    loading: false,
};

export const fetchCategories = createAsyncThunk<Category[], void, { state: RootState }>(
    'categories/fetchCategories',
    async (_, { getState }) => {
        const state = getState();
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
        const data = await response.json();
        return data.results as Category[];
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
