import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useAuth } from "oidc-react"
import { authActions } from "@/store"
import { authStorageService } from "@/services/storage"
import { paths } from "@/config"

import Loading from "@/components/Layout/components/Loading"

function SignInOidc() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useAuth()

    useEffect(() => {
        if (userData) {
            dispatch(
                authActions.setLoginState({
                    isLogin: true,
                    username: userData.profile.name,
                }),
            )
            authStorageService.setAccessToken(userData.access_token)
            navigate(paths.dashboard)
        }
    }, [userData, dispatch, navigate])

    return <Loading />
}

export default SignInOidc
