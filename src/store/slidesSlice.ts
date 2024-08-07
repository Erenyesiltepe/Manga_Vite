import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

interface Slide {
    id: number;
    title: string;
    thumbnail: string;
    description: string;
    category: string | number;
}

interface SlidesState {
    slides: Slide[];
    loading: boolean;
}

const initialState: SlidesState = {
    slides: [],
    loading: false,
};

export const fetchSlides = createAsyncThunk(
    'slides/fetchSlides',
    async (_, { getState }) => {
        const state = getState() as RootState;
        if (state.slides.slides.length > 0) {
            return state.slides.slides;
        }

        const headersList = {
            "Accept": "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)"
        };

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/mangas/mangas/`, {
            method: 'GET',
            headers: headersList,
        });
        return (await response.json()) as Slide[];
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
            .addCase(fetchSlides.fulfilled, (state, action: PayloadAction<Slide[]>) => {
                state.slides = action.payload;
                state.loading = false;
            })
            .addCase(fetchSlides.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default slidesSlice.reducer;
