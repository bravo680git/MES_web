import Card from "@/components/Card"
import Button from "@/components/Button"
import Table from "@/components/Table"

function ResourceItem({ label, quantiy, headers, body, onLabelClick, onBtnClick }) {
    return (
        <Card data-component="ResourceItem" className=" h-[calc(100vh-138px)]">
            <div className="flex items-center justify-between">
                <h2 className="cursor-pointer underline transition-all hover:text-primary-1" onClick={onLabelClick}>
                    {label}
                </h2>
                <Button onClick={onBtnClick}>Tạo mới...</Button>
            </div>

            <div className="heading-20-b mt-6">
                <div className="flex items-center">
                    <span className="w-[120px]">Tổng số</span>
                    <span className="heading-20-s">12</span>
                </div>
                <div className="mt-2 mb-4 flex items-center">
                    <span className="w-[120px]">Khả dụng</span>
                    <span className="heading-20-s">10</span>
                </div>
            </div>

            <Table
                headers={headers}
                body={body}
                className="h-[calc(100%-138px)] overflow-y-hidden hover:overflow-y-scroll"
            />
        </Card>
    )
}

export default ResourceItem
