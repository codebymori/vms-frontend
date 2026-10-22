import ButtonComponent from "../components/common/ButtonComponent";
import { RefreshCcw } from "lucide-react";
import AllertSummary from "../components/allerts/AllertSummary";

const AlertsPage = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#203A5C]">Alert CCTV</h1>
          <p className="text-[15px] text-[#7890AD]">
            Halaman ini berfokus pada kamera putus koneksi dan status pemulihan.
          </p>
        </div>
        <ButtonComponent
          variant="primary"
          icon={RefreshCcw}
          iconSize={16}
          size="sm"
          onClick={() => window.location.reload()}
        >
          Perbarui
        </ButtonComponent>
      </div>

      <AllertSummary />
    </>
  );
};

export default AlertsPage;