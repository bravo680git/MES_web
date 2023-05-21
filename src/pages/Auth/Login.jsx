import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useAuth } from "oidc-react"
import Loading from "@/components/Layout/components/Loading"

function Login() {
    const { signIn } = useAuth()
    const isLogin = useSelector((state) => state.auth.isLogin)

    useEffect(() => {
        if (!isLogin) {
            signIn()
        }
    }, [signIn, isLogin])

    return <Loading />
}

export default Login
