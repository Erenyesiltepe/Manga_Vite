import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface Slide {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: number;
    category_name: string;
}

export interface SlideWrap {
    slides: Slide[];
    count: number;
}

export interface SlidesState {
    slideWrap: SlideWrap;
    loading: boolean;
}

const initialState: SlidesState = {
    slideWrap: { slides: [], count: 0 },
    loading: false
};

export const fetchSlides = createAsyncThunk<SlideWrap, { categoryId?: string, pageSize?: number, page?: number }, { state: RootState }>(
    'slides/fetchSlides',
    async ({ categoryId, pageSize, page }) => {

        const headersList = {
            'Content-Type': 'application/json'
        };

        const parameters = new URLSearchParams();
        if (categoryId !== undefined) parameters.append("category_id", categoryId);
        if (pageSize !== undefined) parameters.append("pageSize", pageSize.toString());
        if (page !== undefined) parameters.append("page", page.toString());

        const queryString = parameters.toString();
        const url = `${import.meta.env.VITE_API_URL}/api/mangas/mangas/${queryString ? '?' + queryString : ''}`;

        const response = await fetch(url, {
            method: 'GET',
            headers: headersList,
        });

        const data = await response.json();
        return { slides: data.results as Slide[], count: data.count }; // Adjust based on actual API response
    }
);

const slidesSlice = createSlice({
    name: 'slides',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchSlides.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchSlides.fulfilled, (state, action: PayloadAction<SlideWrap>) => {
                state.slideWrap = action.payload; // Update slideWrap
                state.loading = false;
            })
            .addCase(fetchSlides.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default slidesSlice.reducer;
