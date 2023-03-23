import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    return (
        <div data-component="MainLayout" className="container flex h-screen overflow-hidden">
            <aside className="min-h-full">
                <Sidebar />
            </aside>
            <div className="grow pt-5">
                <h1 className="px-5">{title}</h1>
                <main className="scroll-y h-[calc(100vh-68px)] p-5">{children}</main>
            </div>
        </div>
    )
}

export default MainLayout
