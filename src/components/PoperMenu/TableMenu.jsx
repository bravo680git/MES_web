import { AiOutlinePlus } from "react-icons/ai"

import PoperMenu from "@/components/PoperMenu"
import Table from "@/components/Table"
import Button from "@/components/Button"
import { usePoperMenu } from "@/hooks"
import { getMenuItemValue as getValue, getMenuTableData } from "@/utils/functions"

function TableMenu({ headers, subNav, value, setValue, path }) {
    const { active, position, handleClose, handleOpen } = usePoperMenu()

    const handleClick = (v) => {
        if (getValue(value, path)) {
            setValue([...getValue(value, path), v])
        } else {
            setValue([v])
        }
    }

    return (
        <div data-component="TableMenu">
            <Table headers={headers} body={getMenuTableData(getValue(value, path), subNav[0].id)} />
            <Button small className="mt-4 text-2xl" onClick={handleOpen}>
                <AiOutlinePlus />
            </Button>

            {active && (
                <PoperMenu
                    menuNavigaton={subNav}
                    position={position}
                    onClose={handleClose}
                    onClick={handleClick}
                    basePath={path}
                />
            )}
        </div>
    )
}

export default TableMenu
