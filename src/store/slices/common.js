import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pageTitle: "",
    loading: false,
}

const commonSLice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setPageTitle(state, action) {
            state.pageTitle = action.payload
            return state
        },
        setLoading(state, action) {
            state.loading = action.payload
            return state
        },
    },
})

export default commonSLice.reducer
export const { setPageTitle, setLoading } = commonSLice.actions
