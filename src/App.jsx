import { useSelector } from "react-redux"
import { Routes, Route, Navigate } from "react-router-dom"
import Layout from "@/components/Layout"
import { paths } from "@/config"
import routes from "@/routes"

function App() {
    const isLogin = useSelector((state) => state.auth.isLogin)

    return (
        <Routes>
            {routes.map((route) => {
                const Component = route.component
                const ComponentLayout = route.layout ? Layout : null
                const protectedRoute = route.protected

                return (
                    <>
                        {protectedRoute && !isLogin ? (
                            <Route path="*" element={<Navigate to={paths.login} />} />
                        ) : (
                            <Route
                                key={route.path}
                                path={route.path}
                                element={
                                    ComponentLayout ? (
                                        <ComponentLayout title={route.title}>
                                            <Component />
                                        </ComponentLayout>
                                    ) : (
                                        <Component />
                                    )
                                }
                            />
                        )}
                    </>
                )
            })}
        </Routes>
    )
}

export default App
