import AddCameraAreaLocation from "../components/layout/AddCameraAreaLocation";
import { Cctv, CctvOff, Eye} from "lucide-react";

const DashboardPage = () => {
  return (
    <>
  
    <div className="flex overflow-hidden w-100 justify-between items-center">
      <div>
        <h1 className="text-[24px] font-bold text-[#203A5C]">Dashboard</h1>
        <p className="text-[15px] text-[#7890AD]">Selamat datang di Dashboard CCTV Monitor</p>
      </div>
      <AddCameraAreaLocation/>
    </div>

    {/* summary camera */}

    <div className="mt-8 w-[100%] flex  gap-5">
      <div className="flex w-[33%] items-center gap-5 rounded-2xl border border-[#E1EBF7] bg-white p-6 shadow-sm">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#3B82F6]">
          <Cctv size={28} color="white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-[12px] font-semibold text-[#203A5C]">TOTAL CCTV</h2>
          <p className="text-[20px] font-bold text-[#203A5C]">300</p>
          <p className="text-[12px] text-[#7890AD]">unit</p>
        </div>
      </div>

      <div className="flex w-[33%] items-center gap-5 rounded-2xl border border-[#E1EBF7] bg-white p-6 shadow-sm">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#12A66A]">
          <Eye size={28} color="white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-[12px] font-semibold text-[#203A5C]">ONLINE</h2>
          <p className="text-[20px] font-bold text-[#203A5C]">300</p>
          <p className="text-[12px] text-[#7890AD]">100 <span>%</span></p>
        </div>
      </div>

      <div className="flex w-[33%] items-center gap-5 rounded-2xl border border-[#E1EBF7] bg-white p-6 shadow-sm">
        <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-[#F04452]">
          <CctvOff size={28} color="white" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-[12px] font-semibold text-[#203A5C]">OFFLINE</h2>
          <p className="text-[20px] font-bold text-[#203A5C]">0</p>
          <p className="text-[12px] text-[#7890AD]">unit</p>
        </div>
      </div>

    </div>

    </>
  );
};

export default DashboardPage;