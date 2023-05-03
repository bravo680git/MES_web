import common from "./common"
import scheduling from "./scheduling"

const rootReducer = {
    common,
    scheduling,
}

export default rootReducer
export * as commonStoreActions from "./common"
export * as schedulingActions from "./scheduling"
