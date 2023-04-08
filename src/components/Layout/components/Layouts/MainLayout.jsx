import { useSelector } from "react-redux"
import { ToastContainer } from "react-toastify"
import Loading from "../Loading"
import "react-toastify/dist/ReactToastify.css"

import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    const { pageTitle, loading } = useSelector((state) => state.common)

    return (
        <div data-component="MainLayout" className="container flex h-screen overflow-hidden">
            <aside className="min-h-full">
                <Sidebar />
            </aside>
            <div className="grow pt-5">
                <h1 className="px-5">{title ? title : pageTitle}</h1>
                <main className="scroll-y h-[calc(100vh-68px)] p-5">{children}</main>
            </div>
            {loading && <Loading />}
            <ToastContainer pauseOnFocusLoss={false} autoClose={2000} />
        </div>
    )
}

export default MainLayout
