import common from "./common"
import scheduling from "./scheduling"
import setting from "./setting"

const rootReducer = {
    common,
    scheduling,
    setting,
}

export default rootReducer
export * as commonStoreActions from "./common"
export * as schedulingActions from "./scheduling"
export * as settingActions from "./setting"
