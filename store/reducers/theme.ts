import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../'

interface ThemeState {
  theme: 'auto' | 'light' | 'dark' // auto is alias for light
}

const initialState: ThemeState = {
  theme: 'light'
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, payload: { payload: { theme: ThemeState['theme'] } }) => {
      state.theme = payload.payload.theme
    },
    switchTheme: state => {
      state.theme = state.theme === 'dark' ? 'light' : 'dark'
    }
  },
})

export const { setTheme, switchTheme } = themeSlice.actions

export const selectTheme = (state: RootState) => state.theme.theme

export default themeSlice.reducer
