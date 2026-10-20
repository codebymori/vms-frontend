import logo from "../../assets/images/Passguard-Vision-Logo-2.png";
import { Bell, LayoutDashboard, MapPin, Settings, Video } from "lucide-react";
import { NavLink } from "react-router-dom";

const menuItems = [
  { label: "Dashboard", to: "/dashboard", icon: LayoutDashboard, end: true },
  { label: "Monitoring CCTV", to: "/monitoring", icon: Video },
  { label: "Lokasi CCTV", to: "/locations", icon: MapPin },
  { label: "Alert", to: "/alerts", icon: Bell },
  { label: "Settings", to: "/settings", icon: Settings },
];

const sidebarComponent = () => {
  return (
    
    <div className="bg-white text-white w-64 h-screen p-4 border-r border-[#E1EBF7] flex flex-col justify-between shadow-lg">
    
    {/* container logo dan title  */}
        <div>
            <div className="flex flex-col items-start justify-center">
                <img src={logo} alt="Logo" className="w-[200px] h-auto mb-4" />
                <h1 className="text-[15px] font-bold text-[#203A5C]">CCTV Monitor</h1>
                <p className="text-[13px] text-[#7890AD]">Sekolah Karakter <br /> Podomoro</p>
            </div>

            {/* container menu  */}
            <div className="mt-8">
                <ul className="space-y-2 text-[15px] font-bold">
                    {menuItems.map(({ label, to, icon: Icon, end }) => (
                        <li key={to}>
                            <NavLink
                                to={to}
                                end={end}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 rounded-lg p-4 ${
                                        isActive
                                            ? "bg-[#E1EBF7] text-[#007BFF]"
                                            : "text-[#203A5C] hover:bg-[#E1EBF7] hover:text-[#007BFF]"
                                    }`
                                }
                            >
                                <Icon size={18} aria-hidden="true" />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        
            {/* status container */}
            <div className="mt-8 border border-[#E1EBF7] rounded-lg p-4">
                <div className="flex items-center gap-2 font-bold text-[13px]">
                    <span className="w-3 h-3 rounded-full bg-green-500"></span>
                    <p className="text-[#203A5C]">Sistem <span>Online</span></p>
                </div>
                <p className="text-[#7890AD] text-[13px]">Terakhir diperbarui <span>14:32</span></p>
            </div>

    </div>
  );
};

export default sidebarComponent; 