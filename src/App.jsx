import { BrowserRouter, Routes, Route } from "react-router-dom"
import Layout from "@/components/Layout"
import routes from "@/routes"

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {routes.map((route) => {
                    const Component = route.component
                    const ComponentLayout = route.layout ? Layout : null

                    return (
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
                    )
                })}
            </Routes>
        </BrowserRouter>
    )
}

export default App
