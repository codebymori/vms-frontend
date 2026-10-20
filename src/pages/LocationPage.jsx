import AddCameraAreaLocation from "../components/layout/AddCameraAreaLocation";
import MapsLocation from "../components/maps/MapsLocation";

const LocationPage = () => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-[24px] font-bold text-[#203A5C]">Lokasi CCTV</h1>
          <p className="text-[15px] text-[#7890AD]">
            Pilih ikon lokasi sekolah, lalu pilih area/gedung untuk melihat kategori ruang dan kamera.
          </p>
        </div>
        <AddCameraAreaLocation />
      </div>
      <MapsLocation />
    </>
  );
};

export default LocationPage;