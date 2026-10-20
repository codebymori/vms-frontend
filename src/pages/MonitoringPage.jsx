import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import AddCameraAreaLocation from "../components/layout/AddCameraAreaLocation";
import cameras from "../data/cameras.json";
import CameraCard from "../components/monitoring/CameraCard";
import ButtonComponent from "../components/common/ButtonComponent";



const MonitoringPage = () => {
  const [searchParams] = useSearchParams();
  const [visibleCount, setVisibleCount] = useState(6);
  const [filters, setFilters] = useState({
    search: "",
    location: searchParams.get("location") || "",
    area: searchParams.get("area") || "",
    category: searchParams.get("category") || "",
    status: "",
  });

  const locations = [...new Set(cameras.map((camera) => camera.location))];
  const areas = [...new Set(cameras.map((camera) => camera.area))];
  const categories = [...new Set(cameras.map((camera) => camera.category))];

  const filteredCameras = cameras.filter((camera) => {
    const search = filters.search.trim().toLowerCase();
    const matchesSearch =
      !search ||
      [camera.id, camera.name, camera.location]
        .some((value) => String(value).toLowerCase().includes(search));

    return (
      matchesSearch &&
      (!filters.location || camera.location === filters.location) &&
      (!filters.area || camera.area === filters.area) &&
      (!filters.category || camera.category === filters.category) &&
      (!filters.status || camera.status === filters.status)
    );
  });

  const visibleCameras = filteredCameras.slice(0, visibleCount);
  const hasMoreCameras = visibleCount < filteredCameras.length;

  const updateFilter = (key, value) => {
    setFilters((currentFilters) => ({ ...currentFilters, [key]: value }));
    setVisibleCount(6);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) =>
      Math.min(prevCount + 3, filteredCameras.length)
    );
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      location: "",
      area: "",
      category: "",
      status: "",
    });
    setVisibleCount(6);
  };

    return (
    <>
    <div className="flex overflow-hidden w-100 justify-between items-center">
        <div>
            <h1 className="text-[24px] font-bold text-[#203A5C]">Monitoring CCTV</h1>
            <p className="text-[15px] text-[#7890AD]">Pantau kamera per area lokasi.</p>
        </div>
        <AddCameraAreaLocation/>
    </div>

    <div className="rounded-xl border border-[#E1EAF5] bg-white p-4 mt-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#203A5C]">
            Semua Kamera
          </h2>

          <p className="mt-1 text-sm text-[#7890AD]">
              Menampilkan {visibleCameras.length} dari {filteredCameras.length} kamera
          </p>
        </div>

          <div className="mb-6 flex flex-wrap gap-3">
            <input
              type="search"
              value={filters.search}
              onChange={(event) => updateFilter("search", event.target.value)}
              placeholder="Cari ID, nama, atau lokasi"
              aria-label="Cari ID, nama, atau lokasi kamera"
              className="h-[50px] min-w-[220px] flex-1 rounded-xl border border-[#D9E5F2] bg-white px-4 text-[14px] text-[#203A5C] outline-none placeholder:text-[#777] focus:border-[#3B82F6]"
            />

            {[
              { key: "location", label: "Semua Lokasi Sekolah", options: locations },
              { key: "area", label: "Semua Area Lokasi", options: areas },
              { key: "category", label: "Semua Kategori", options: categories },
              {
                key: "status",
                label: "Semua Status",
                options: ["online", "offline"],
              },
            ].map(({ key, label, options }) => (
              <div key={key} className="relative min-w-[170px] flex-1">
                <select
                  value={filters[key]}
                  onChange={(event) => updateFilter(key, event.target.value)}
                  aria-label={label}
                  className="h-[50px] w-full cursor-pointer appearance-none rounded-xl border border-[#D9E5F2] bg-white py-0 pl-4 pr-10 text-[14px] text-[#203A5C] outline-none focus:border-[#3B82F6]"
                >
                  <option value="">{label}</option>
                  {options.map((option) => (
                    <option key={option} value={option}>
                      {key === "status"
                        ? option.charAt(0).toUpperCase() + option.slice(1)
                        : option}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#203A5C]"
                />
              </div>
            ))}

            <button
              type="button"
              onClick={resetFilters}
              className="h-[50px] rounded-xl border border-[#D3E1F1] bg-white px-4 font-bold text-[#365B85] text-[14px] hover:bg-[#F3F7FD]"
            >
              Reset Filter
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visibleCameras.map((camera) => (
            <CameraCard
              key={camera.id}
              camera={camera}
            />
          ))}
        </div>

        {filteredCameras.length === 0 && (
          <p className="py-8 text-center text-sm text-[#7890AD]">
            Kamera tidak ditemukan.
          </p>
        )}

        {/* Show More */}
        {hasMoreCameras && (
          <div className="mt-6 flex justify-center">
            <ButtonComponent
              variant="secondary"
              size="[14px] px-5 py-3"
              onClick={handleShowMore}
            >
              Lihat Lebih Banyak
            </ButtonComponent>
          </div>
        )}
      </div>


    </>
  );
};

export default MonitoringPage;