import Sidebar from "../Sidebar"
function MainLayout({ children, title }) {
    return (
        <div data-component="MainLayout" className="container flex h-screen overflow-hidden">
            <aside className="min-h-full">
                <Sidebar />
            </aside>
            <div className="grow p-[30px]">
                <h1>{title}</h1>
                <main className="mt-[30px] h-[calc(100vh-138px)] xl:overflow-y-hidden xl:hover:overflow-y-scroll">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout
