import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import Form from "@/components/Form"

import { settingActions } from "@/store"
import { SHIFTS_SETTING_MENU_NAV } from "@/utils/menuNavigation"
import Button from "@/components/Button/Button"

function Setting() {
    const dispatch = useDispatch()
    const { shifts } = useSelector((state) => state.setting)

    const [shiftsValue, setShiftsValue] = useState({
        shiftInfo: shifts.map((item) => ({ info: { ...item } })),
    })

    const handleSaveSetting = () => {
        dispatch(settingActions.setShifts(shiftsValue.shiftInfo.map((item) => ({ ...item.info }))))
        toast.success("Lưu thiết đặt thành công")
    }

    const handleDeleteShift = (row, index) => {
        setShiftsValue({
            shiftInfo: shiftsValue.shiftInfo.filter((_item, _index) => _index !== index),
        })
    }

    return (
        <div data-component="Setting">
            <div>
                <div className="flex items-center gap-4">
                    <h3 className="mb-2">Số ca làm trong một ngày</h3>
                    <span>{shifts.length} ca/ngày</span>
                </div>
                <Form
                    menuNavigaton={SHIFTS_SETTING_MENU_NAV}
                    value={shiftsValue}
                    setValue={setShiftsValue}
                    onDeleteRow={handleDeleteShift}
                />
            </div>

            <Button className="mt-5" onClick={handleSaveSetting}>
                Lưu
            </Button>
        </div>
    )
}

export default Setting
