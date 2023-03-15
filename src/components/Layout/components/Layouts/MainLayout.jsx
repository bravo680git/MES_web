import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    return (
        <div data-component="MainLayout" className="container flex h-screen overflow-hidden">
            <aside className="min-h-full">
                <Sidebar />
            </aside>
            <div className="grow p-5">
                <h1>{title}</h1>
                <main className="xl:scroll-y mt-5 h-[calc(100vh-108px)]">{children}</main>
            </div>
        </div>
    )
}

export default MainLayout
