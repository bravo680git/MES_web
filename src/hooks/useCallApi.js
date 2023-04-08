import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { commonStoreActions } from "@/store"

const useCallApi = () => {
    const dispatch = useDispatch()

    return useCallback(
        (api, resolve, message, reject) => {
            if (typeof api === "function") {
                dispatch(commonStoreActions.setLoading(true))
                api()
                    .then((res) => {
                        if (typeof resolve === "function") {
                            resolve(res)
                        }
                        if (typeof message === "string") {
                            toast.success(message)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        if (typeof reject === "function") {
                            reject(err)
                        }
                        toast.error("Thao tác không thành công, vui lòng thử lại")
                    })
                    .finally(() => {
                        dispatch(commonStoreActions.setLoading(false))
                    })
            }

            if (Array.isArray(api)) {
                dispatch(commonStoreActions.setLoading(true))
                Promise.all(api)
                    .then((res) => {
                        if (typeof resolve === "function") {
                            resolve(res)
                        }
                        if (typeof message === "string") {
                            toast.success(message)
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                        if (typeof reject === "function") {
                            reject(err)
                        }
                        toast.error("Thao tác không thành công, vui lòng thử lại")
                    })
                    .finally(() => {
                        dispatch(commonStoreActions.setLoading(false))
                    })
            }
        },
        [dispatch],
    )
}

export default useCallApi
