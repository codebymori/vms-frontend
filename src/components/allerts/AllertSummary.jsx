import { useEffect, useMemo, useState } from "react";
import { Trash2 } from "lucide-react";
import cameras from "../../data/cameras.json";
import {
  ALERTS_UPDATED_EVENT,
  clearAlerts,
  getCameraStatus,
  getAlerts,
} from "../../utils/alertStore";

const PAGE_SIZE = 10;

const AllertSummary = () => {
  const [alerts, setAlerts] = useState(getAlerts);
  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const syncAlerts = () => setAlerts(getAlerts());
    window.addEventListener(ALERTS_UPDATED_EVENT, syncAlerts);

    return () => window.removeEventListener(ALERTS_UPDATED_EVENT, syncAlerts);
  }, []);

  const cameraById = useMemo(
    () => new Map(cameras.map((camera) => [camera.id, camera])),
    []
  );
  const events = [...new Set(alerts.map((alert) => alert.event))];
  const filteredAlerts = alerts.filter((alert) => {
    const camera = cameraById.get(alert.cameraId);
    const query = search.trim().toLowerCase();
    const matchesSearch =
      !query ||
      [
        alert.cameraId,
        camera?.name,
        camera?.location,
        camera?.area,
        camera?.category,
      ].some((value) => String(value || "").toLowerCase().includes(query));

    return matchesSearch && (!eventFilter || alert.event === eventFilter);
  });

  const pageCount = Math.ceil(filteredAlerts.length / PAGE_SIZE);
  const safePage = Math.min(currentPage, Math.max(pageCount, 1));
  const visibleAlerts = filteredAlerts.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  const firstResult = filteredAlerts.length === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1;
  const lastResult = Math.min(safePage * PAGE_SIZE, filteredAlerts.length);
  const offlineCameraCount = cameras.filter(
    (camera) => getCameraStatus(camera).toLowerCase() === "offline"
  ).length;
  const recoveredEventCount = alerts.filter(
    (alert) => alert.event === "back_online"
  ).length;

  const updateSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const updateEventFilter = (value) => {
    setEventFilter(value);
    setCurrentPage(1);
  };

  const handleClearAlerts = () => {
    clearAlerts();
    setAlerts([]);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        <article className="rounded-xl border border-[#DCE8F6] bg-white p-5">
          <p className="text-sm text-[#7890AD]">Kamera sedang offline</p>
          <p className="mt-2 text-4xl font-bold text-[#E94F55]">
            {offlineCameraCount}
          </p>
          <p className="mt-3 text-sm text-[#7890AD]">Perlu ditindaklanjuti</p>
        </article>
        <article className="rounded-xl border border-[#DCE8F6] bg-white p-5">
          <p className="text-sm text-[#7890AD]">Koneksi pulih (riwayat)</p>
          <p className="mt-2 text-4xl font-bold text-[#43A878]">
            {recoveredEventCount}
          </p>
          <p className="mt-3 text-sm text-[#7890AD]">Kamera kembali online</p>
        </article>
        <article className="rounded-xl border border-[#DCE8F6] bg-white p-5">
          <p className="text-sm text-[#7890AD]">Total event tersimpan</p>
          <p className="mt-2 text-4xl font-bold text-[#203A5C]">
            {alerts.length}
          </p>
          <p className="mt-3 text-sm text-[#7890AD]">Offline dan pemulihan</p>
        </article>
      </div>

      <section className="mt-6 overflow-hidden rounded-xl border border-[#E1EAF5] bg-white shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-[#E8EEF5] p-3">
        <input
          type="search"
          value={search}
          onChange={(event) => updateSearch(event.target.value)}
          placeholder="Cari nama kamera atau ID CCTV..."
          aria-label="Cari alert berdasarkan kamera"
          className="h-10 min-w-[220px] flex-1 rounded-lg border border-[#D9E5F2] px-3 text-sm text-[#203A5C] outline-none placeholder:text-[#7890AD] focus:border-[#3B82F6]"
        />
        <select
          value={eventFilter}
          onChange={(event) => updateEventFilter(event.target.value)}
          aria-label="Filter jenis event"
          className="h-10 min-w-[160px] cursor-pointer rounded-lg border border-[#D9E5F2] bg-white px-3 text-sm text-[#203A5C] outline-none focus:border-[#3B82F6]"
        >
          <option value="">Semua jenis event</option>
          {events.map((event) => (
            <option key={event} value={event}>
              {event === "back_online"
                ? "Back to online"
                : event.charAt(0).toUpperCase() + event.slice(1)}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleClearAlerts}
          disabled={alerts.length === 0}
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-rose-200 px-3 text-sm font-semibold text-rose-600 hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-40"
        >
          <Trash2 size={16} aria-hidden="true" />
          Clear Alert
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left text-sm">
          <thead className="bg-[#F3F7FD] text-xs font-semibold text-[#7890AD]">
            <tr>
              <th className="px-3 py-3">Event</th>
              <th className="px-3 py-3">Kamera</th>
              <th className="px-3 py-3">Lokasi Sekolah / Cabang</th>
              <th className="px-3 py-3">Area / Kategori</th>
              <th className="px-3 py-3">Waktu</th>
              <th className="px-3 py-3">Keterangan</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8EEF5] text-[#36516F]">
            {visibleAlerts.map((alert) => {
              const camera = cameraById.get(alert.cameraId);

              return (
                <tr key={alert.id} className="hover:bg-[#FAFCFF]">
                  <td className="whitespace-nowrap px-3 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
                        alert.event === "back_online"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-rose-50 text-rose-500"
                      }`}
                    >
                      <span
                        className={`h-2 w-2 rounded-full ${
                          alert.event === "back_online"
                            ? "bg-emerald-500"
                            : "bg-rose-500"
                        }`}
                      />
                      {alert.event === "back_online"
                        ? "Back to online"
                        : alert.event.charAt(0).toUpperCase() +
                          alert.event.slice(1)}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 font-semibold text-[#203A5C]">
                    {camera
                      ? camera.name
                      : `Kamera ID ${alert.cameraId} tidak ditemukan`}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    {camera?.location || "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">
                    {camera
                      ? `${camera.area || "-"} / ${camera.category || "-"}`
                      : "-"}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4">{alert.time}</td>
                  <td className="whitespace-nowrap px-3 py-4">
                    {alert.description}
                  </td>
                </tr>
              );
            })}
            {visibleAlerts.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-3 py-10 text-center text-sm text-[#7890AD]"
                >
                  Belum ada notifikasi.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF5] px-3 py-3 text-sm text-[#7890AD]">
        <p>
          Menampilkan {firstResult}–{lastResult} dari {filteredAlerts.length}{" "}
          notifikasi
        </p>
        <nav className="flex items-center gap-1" aria-label="Navigasi halaman alert">
          <button
            type="button"
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            disabled={safePage <= 1}
            aria-label="Halaman sebelumnya"
            className="h-9 rounded-lg border border-[#E1EAF5] px-3 text-[#365B85] hover:bg-[#F3F7FD] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ‹
          </button>
          {Array.from({ length: pageCount }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-current={safePage === page ? "page" : undefined}
                className={`h-9 min-w-9 rounded-lg border px-3 ${
                  safePage === page
                    ? "border-[#2878F0] bg-[#2878F0] text-white"
                    : "border-[#E1EAF5] text-[#365B85] hover:bg-[#F3F7FD]"
                }`}
              >
                {page}
              </button>
            )
          )}
          <button
            type="button"
            onClick={() =>
              setCurrentPage((page) => Math.min(page + 1, pageCount))
            }
            disabled={safePage >= pageCount}
            aria-label="Halaman berikutnya"
            className="h-9 rounded-lg border border-[#E1EAF5] px-3 text-[#365B85] hover:bg-[#F3F7FD] disabled:cursor-not-allowed disabled:opacity-40"
          >
            ›
          </button>
        </nav>
      </footer>
      </section>
    </>
  );
};

export default AllertSummary;