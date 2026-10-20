import SidebarComponent from "./SidebarComponent";
import NavbarComponent from "./NavbarComponent";


const AppLayout = ({ children }) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F3F7FD]">
      {/* Sidebar kiri */}
      <SidebarComponent />

      {/* Area utama */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Navbar atas */}
        <NavbarComponent />

        {/* Konten halaman */}
        <main className="flex-1 overflow-y-auto bg-[#F3F7FD] p-6">
          <div className="mx-auto w-full max-w-[1600px]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;