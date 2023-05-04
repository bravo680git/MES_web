import { createSlice } from "@reduxjs/toolkit"
import { settingStorageService } from "@/services/storage"

const initialState = {
    shifts: settingStorageService.get("shifts") ?? [
        { description: "Ca sáng", startTime: "07:00:00", endTime: "12:00:00" },
        { description: "Ca chiều", startTime: "13:00:00", endTime: "18:00:00" },
    ],
}

const settingSlice = createSlice({
    name: "setting",
    initialState,
    reducers: {
        setShifts(state, action) {
            state.shifts = action.payload
            settingStorageService.set("shifts", action.payload)
            return state
        },
    },
})

export default settingSlice.reducer
export const { setShifts } = settingSlice.actions
