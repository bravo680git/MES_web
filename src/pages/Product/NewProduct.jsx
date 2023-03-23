import { useState, useEffect } from "react"

import Form from "@/components/Form"
import Button from "@/components/Button"

import { getSegmentOptionList } from "@/utils/functions/handleData"
import { productMenuNav } from "@/utils/menuNavigation"
import { WORKER_TYPE_LIST, EQUIPMENT_TYPE_LIST, MATERIAL_LIST } from "@/utils/mockData"

function NewProduct() {
    const [info, setInfo] = useState({})
    const [properties, setProperties] = useState({})
    const [segments, setSegments] = useState({})
    const [segmentRelationships, setSegmentRelationships] = useState({})

    const [invalid, setInvalid] = useState(true)

    const handleSubmit = () => {
        console.log({ info, properties, segments, segmentRelationships })
    }

    useEffect(() => {
        if (
            info.productInfo?.id?.length > 0 &&
            info.productInfo?.name?.length > 0 &&
            segments.productSegments?.length > 0
        ) {
            setInvalid(false)
        } else {
            setInvalid(true)
        }
    }, [info.productInfo?.id.length, info.productInfo?.name.length, segments.productSegments?.length])

    return (
        <div data-component="NewProduct" className="container flex h-full">
            <div className="mr-6 h-full w-2/5">
                <div className="max-h-[50%] w-full">
                    <Form className="h-full" menuNavigaton={productMenuNav.getInfo()} value={info} setValue={setInfo} />
                </div>
                <div className="mt-6 max-h-[50%] w-full">
                    <Form
                        className="h-full"
                        menuNavigaton={productMenuNav.getProperties()}
                        value={properties}
                        setValue={setProperties}
                    />
                </div>

                <Button className="mt-5" onClick={handleSubmit} disabled={invalid}>
                    Xác nhận
                </Button>
            </div>
            <div className="h-full w-3/5">
                <div className="max-h-[50%] w-full">
                    <Form
                        className="h-full"
                        menuNavigaton={productMenuNav.getSegments(WORKER_TYPE_LIST, EQUIPMENT_TYPE_LIST, MATERIAL_LIST)}
                        value={segments}
                        setValue={setSegments}
                    />
                </div>
                <div className="mt-6 max-h-[50%] w-full">
                    <Form
                        className="h-full"
                        menuNavigaton={productMenuNav.getSegMentRelationship(getSegmentOptionList(segments), [])}
                        value={segmentRelationships}
                        setValue={setSegmentRelationships}
                    />
                </div>
            </div>
        </div>
    )
}

export default NewProduct
