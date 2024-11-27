import Sidebar from "@/layout/Sidebar.jsx";
import Header from "@/layout/Header.jsx";

function BasicLayout({ children }) {
    return (
        <div className="flex h-screen bg-green-50">
            <Sidebar /> {/* Sidebar on the left */}

            <div className="flex flex-col flex-1"> {/* Header and content will be in this flex column */}
                <Header /> {/* Header on top of the main content area */}

                <div className="flex-1 p-6 overflow-auto mt-0"> {/* Content area below the header */}
                    {children}
                </div>
            </div>
        </div>
    );
}

export default BasicLayout;
