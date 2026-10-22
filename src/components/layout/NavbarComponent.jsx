import { ChevronDown, Search } from "lucide-react";
import AllertNotification from "../allerts/AllertNotification";


const NavbarComponent = () => {
  return (
    <header className="flex h-20 w-full items-center justify-between gap-6 border-b border-[#E1EBF7] bg-white px-8">
     
      {/* search container */}
      <label className="flex h-12 w-full max-w-[420px] items-center gap-4 rounded-xl border border-[#D8E5F5] bg-[#F5F8FC] px-5 text-[#7890AD]">
        <Search size={17} aria-hidden="true" />
        <input
          type="search"
          placeholder="Cari nama kamera, lokasi, atau ID CCTV..."
          className="w-full bg-transparent text-[15px] text-[#203A5C] outline-none placeholder:text-[#737373]"
          aria-label="Cari kamera, lokasi, atau ID CCTV"
        />
      </label>

      <div className="flex shrink-0 items-center gap-7 text-[#203A5C]">
        <AllertNotification />

        <button type="button" className="flex items-center gap-3 font-semibold">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#203A5C] text-[16px] text-white">
            A
          </span>
          <span className="text-[15px] text-[#203A5C]">Admin</span>
          <ChevronDown size={12} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
};

export default NavbarComponent;