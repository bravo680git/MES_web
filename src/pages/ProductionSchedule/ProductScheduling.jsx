import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import { schedulingActions } from "@/store"
import { paths } from "@/config"
import { resourceApi, workOrderApi } from "@/services/api"
import { useCallApi } from "@/hooks"
import { handleScheduledData } from "@/utils/functions"

import SelectInput from "@/components/SelectInput"
import Button from "@/components/Button"

function ProductSScheduling() {
    const callApi = useCallApi()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { shifts } = useSelector((state) => state.setting)
    const shiftOptions = shifts.map((item, index) => ({ key: item.description, value: index }))
    const schedulingProducts = useSelector((state) => state.scheduling.schedulingProducts)
    const [equipments, setEquipments] = useState([])

    const handleSetValue = (value, index, key) => {
        const newValue = schedulingProducts.map((item, _index) => (index !== _index ? item : { ...item, [key]: value }))
        dispatch(schedulingActions.setSchedulingProducts(newValue))
    }

    const handleSubmit = () => {
        const data = handleScheduledData(schedulingProducts, shifts)

        if (data) {
            const apis = data.map((item) => workOrderApi.schedulingWorkOrder(item, item.workOrderId))
            callApi(
                apis,
                (res) => {
                    navigate(paths.schedule)
                    dispatch(schedulingActions.removeSchedulingProducts())
                },
                "Tạo kế hoạch sản xuất thành công",
            )
        }
    }

    useEffect(() => {
        callApi(resourceApi.equipment.getEquipments, (res) => setEquipments(res.items))
    }, [callApi])

    return (
        <div data-component="ProductSScheduling">
            <div className="flex gap-8">
                <div className="text-16-b w-28">ID đơn hàng</div>
                <div className="text-16-b w-28">ID sản phẩm</div>
                <div className="text-16-b w-18">Số lượng</div>
                <div className="text-16-b grow">Chọn thiết bị</div>
                <div className="text-16-b w-[280px]">Ca bắt đầu</div>
                <div className="text-16-b w-[280px]">Ca kết thúc</div>
                <div className="text-16-b w-[120px]">Ngày đến hạn</div>
            </div>
            {schedulingProducts.map((item, index) => (
                <div key={index} className="flex items-end gap-8">
                    <h4 className="w-28">{item.workOrderId}</h4>
                    <h4 className="w-28">{item.materialDefinition}</h4>
                    <div className="w-18">{item.quantity}</div>
                    <div className="grow">
                        <SelectInput
                            label=""
                            list={equipments.map((e) => ({ key: e.description, value: e.equipmentId }))}
                            value={schedulingProducts[index]?.equipmentId}
                            setValue={(value) => handleSetValue(value, index, "equipmentId")}
                        />
                    </div>
                    <div className="flex w-[280px] items-end">
                        <SelectInput
                            className="grow"
                            label=""
                            list={shiftOptions}
                            canSearch={false}
                            value={schedulingProducts[index].startShift}
                            setValue={(value) => handleSetValue(value, index, "startShift")}
                        />
                        <input
                            type="date"
                            className="text-16-m w-28"
                            value={schedulingProducts[index].startDate ?? ""}
                            onChange={(e) => handleSetValue(e.target.value, index, "startDate")}
                        />
                    </div>
                    <div className="flex w-[280px] items-end">
                        <SelectInput
                            className="grow"
                            label=""
                            list={shiftOptions}
                            canSearch={false}
                            value={schedulingProducts[index].endShift}
                            setValue={(value) => handleSetValue(value, index, "endShift")}
                        />
                        <input
                            type="date"
                            className="text-16-m w-28"
                            value={schedulingProducts[index].endDate ?? ""}
                            onChange={(e) => handleSetValue(e.target.value, index, "endDate")}
                        />
                    </div>
                    <div className="w-[120px]">{item.dueDate}</div>
                </div>
            ))}

            <Button className="mt-5" onClick={handleSubmit}>
                Xác nhận
            </Button>
        </div>
    )
}

export default ProductSScheduling
