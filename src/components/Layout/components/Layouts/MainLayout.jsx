import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    return (
        <div data-component="MainLayout" className="container flex h-screen">
            <aside className="h-full">
                <Sidebar />
            </aside>
            <div className="grow p-[30px]">
                <h1>{title}</h1>
                <main className="mt-[30px]">{children}</main>
            </div>
        </div>
    )
}

export default MainLayout
