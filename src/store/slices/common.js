import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    pageTitle: "",
}

const commonSLice = createSlice({
    name: "common",
    initialState,
    reducers: {
        setPageTitle(state, action) {
            state.pageTitle = action.payload
            return state
        },
    },
})

export default commonSLice.reducer
export const { setPageTitle } = commonSLice.actions
