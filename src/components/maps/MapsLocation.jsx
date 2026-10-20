import { useState } from "react";
import { ChevronDown, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cameras from "../../data/cameras.json";

const locations = [...new Set(cameras.map((camera) => camera.location))];

const getAreasForLocation = (location) => {
  const locationCameras = cameras.filter((camera) => camera.location === location);
  const areas = [...new Set(locationCameras.map((camera) => camera.area))];

  return areas.map((area) => ({
    name: area,
    cameras: locationCameras.filter((camera) => camera.area === area),
  }));
};

const MapsLocation = () => {
    const navigate = useNavigate();
    const [selectedLocation, setSelectedLocation] = useState(null);
      const [selectedArea, setSelectedArea] = useState(null);
      const displayedLocations = selectedLocation ? [selectedLocation] : locations;
      const selectedLocationAreas = selectedLocation
        ? getAreasForLocation(selectedLocation)
        : [];
      const selectedAreaCameras =
        selectedLocation && selectedArea
          ? cameras.filter(
              (camera) =>
                camera.location === selectedLocation && camera.area === selectedArea
            )
          : [];
      const selectedAreaCategories = [
        ...new Set(selectedAreaCameras.map((camera) => camera.category)),
      ].map((category) => ({
        name: category,
        cameraCount: selectedAreaCameras.filter(
          (camera) => camera.category === category
        ).length,
      }));
      const totalAreas = new Set(cameras.map((camera) => camera.area)).size;

  return (
   <>
   <div className="mt-6 grid grid-cols-1 items-start gap-4 xl:grid-cols-[3fr_2fr]">
        <section className="overflow-hidden rounded-xl border border-[#E1EAF5] bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-[#E1EAF5] p-4">
            <div>
              <h2 className="font-bold text-[#203A5C]">Lokasi Sekolah</h2>
              <p className="mt-1 text-sm text-[#7890AD]">
                Pilih marker untuk memfilter daftar lokasi dan area
              </p>
            </div>
            {(selectedLocation || selectedArea) && (
              <button
                type="button"
                onClick={() => {
                  if (selectedArea) {
                    setSelectedArea(null);
                  } else {
                    setSelectedLocation(null);
                  }
                }}
                className="text-sm font-semibold text-[#2878F0] hover:underline"
              >
                {selectedArea ? "Kembali ke area" : "Tampilkan semua lokasi"}
              </button>
            )}
          </div>

          <div className="p-4">
            <div
              className="relative h-[360px] overflow-hidden rounded-lg border border-[#D9E5F2] bg-[#EAF1E8]"
              aria-label="Peta ilustrasi lokasi sekolah"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.55)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.55)_1px,transparent_1px)] bg-[size:34px_34px]" />
              <div className="absolute -left-[8%] top-[42%] h-8 w-[120%] rotate-[24deg] border-y-[7px] border-white bg-[#D4DCE0]" />
              <div className="absolute left-[46%] top-[-15%] h-[130%] w-8 rotate-[31deg] border-x-[7px] border-white bg-[#D4DCE0]" />
              <div className="absolute left-[8%] top-[10%] h-24 w-36 rotate-[24deg] bg-[#DDEBD7]" />
              <div className="absolute bottom-[8%] right-[7%] h-28 w-40 -rotate-[18deg] bg-[#DDEBD7]" />

              <div className="absolute left-4 top-4 rounded-md bg-white/90 px-3 py-2 text-xs font-semibold text-[#456583] shadow-sm">
                <MapPin size={14} className="mr-1 inline-block" aria-hidden="true" />
                {selectedLocation
                  ? selectedArea
                    ? `Area dipilih: ${selectedArea}`
                    : `Area di ${selectedLocation}`
                  : "Marker lokasi sekolah"}
              </div>

              {!selectedLocation &&
                locations.map((location, index) => {
                  const left =
                    locations.length === 1
                      ? 50
                      : 20 + (index * 60) / (locations.length - 1);
                  const top = locations.length === 1 ? 52 : 35 + ((index % 2) * 28);

                  return (
                    <button
                      key={location}
                      type="button"
                      onClick={() => {
                        setSelectedLocation(location);
                        setSelectedArea(null);
                      }}
                      aria-label={`Tampilkan area di ${location}`}
                      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border-[3px] border-white bg-[#2878F0] shadow-lg transition hover:scale-110">
                        <MapPin size={23} className="text-white" aria-hidden="true" />
                      </span>
                      <span className="mt-2 max-w-40 rounded bg-white/90 px-2 py-1 text-center text-xs font-bold text-[#203A5C] shadow-sm">
                        {location}
                      </span>
                    </button>
                  );
                })}

              {selectedLocation &&
                selectedLocationAreas.map((area, index) => {
                  const isSelected = selectedArea === area.name;
                  const left =
                    selectedLocationAreas.length === 1
                      ? 50
                      : 18 +
                        (index * 64) / (selectedLocationAreas.length - 1);
                  const top = 35 + ((index % 2) * 30);

                  return (
                    <button
                      key={area.name}
                      type="button"
                      onClick={() => setSelectedArea(area.name)}
                      aria-label={`Tampilkan CCTV di ${area.name}`}
                      aria-pressed={isSelected}
                      className="absolute z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                      style={{ left: `${left}%`, top: `${top}%` }}
                    >
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-[3px] border-white shadow-lg transition hover:scale-110 ${
                          isSelected ? "scale-110 bg-[#155FC5]" : "bg-[#12A66A]"
                        }`}
                      >
                        <MapPin size={21} className="text-white" aria-hidden="true" />
                      </span>
                      <span className="mt-2 max-w-40 rounded bg-white/90 px-2 py-1 text-center text-xs font-bold text-[#203A5C] shadow-sm">
                        {area.name}
                      </span>
                    </button>
                  );
                })}

            </div>

            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#7890AD]">
              <span>{selectedLocation ? 1 : locations.length} lokasi</span>
              <span>
                {selectedLocation
                  ? selectedLocationAreas.length
                  : totalAreas}{" "}
                area
              </span>
              <span>
                {selectedArea ? selectedAreaCameras.length : cameras.length} kamera
                {selectedArea ? "" : " terdaftar"}
              </span>
            </div>
          </div>
        </section>

        <section className="overflow-hidden rounded-xl border border-[#E1EAF5] bg-white shadow-sm">
          <div className="border-b border-[#E1EAF5] p-4">
            <h2 className="font-bold text-[#203A5C]">Daftar Lokasi / Area</h2>
            <p className="mt-1 text-sm text-[#7890AD]">
              {selectedArea ||
                selectedLocation ||
                "Semua lokasi sekolah dan area"}
            </p>
          </div>

          <div className="max-h-[440px] overflow-y-auto px-4">
            {selectedArea ? (
              <ul className="divide-y divide-[#E8EEF5]">
                {selectedAreaCategories.map((category) => (
                  <li key={category.name}>
                    <button
                      type="button"
                      onClick={() => {
                        const searchParams = new URLSearchParams({
                          location: selectedLocation,
                          area: selectedArea,
                          category: category.name,
                        });
                        navigate(`/monitoring?${searchParams.toString()}`);
                      }}
                      className="flex w-full text-[13px] items-center justify-between gap-3 py-4 text-left hover:bg-[#F8FAFD]"
                    >
                      <span className="min-w-0">
                        <span className="block truncate font-semibold text-[#203A5C]">
                          {category.name}
                        </span>
                        <span className="mt-1 block text-[#7890AD]">
                          {category.cameraCount} kamera
                        </span>
                      </span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 -rotate-90 text-[#203A5C]"
                        aria-hidden="true"
                      />
                    </button>
                  </li>
                ))}
              </ul>
            ) : displayedLocations.map((location) => (
              <div key={location}>
                {!selectedLocation && (
                  <div className="border-b border-[#E8EEF5] px-2 py-3">
                    <p className="font-semibold text-[#203A5C]">{location}</p>
                    <p className="mt-1 text-xs text-[#7890AD]">
                      {getAreasForLocation(location).length} area ·{" "}
                      {cameras.filter((camera) => camera.location === location).length} kamera
                    </p>
                  </div>
                )}

                {getAreasForLocation(location).map((area) => (
                  <button
                    key={area.name}
                    type="button"
                    onClick={() => setSelectedArea(area.name)}
                    className="flex w-full items-center justify-between gap-3 border-b border-[#E8EEF5] px-2 py-4 text-left hover:bg-[#F8FAFD]"
                  >
                    <span className="min-w-0">
                      <span className="block truncate font-semibold text-[13px] text-[#203A5C]">
                        {area.name}
                      </span>
                      <span className="mt-1 block text-xs text-[#7890AD]">
                        {area.cameras.length} kamera ·{" "}
                        {[...new Set(area.cameras.map((camera) => camera.category))].length} kategori
                      </span>
                    </span>
                    <ChevronDown
                      size={18}
                      className="shrink-0 -rotate-90 text-[#203A5C]"
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>
            ))}
          </div>
        </section>
      </div>
   </>
    );
};

export default MapsLocation;