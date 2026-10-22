import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Maximize, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCameraStatus, updateCameraStatus } from "../../utils/alertStore";

const CameraDetails = ({ camera, onClose, triggerRef }) => {
  const navigate = useNavigate();
  const closeButtonRef = useRef(null);
  const isFullscreenRef = useRef(false);
  const [simulatedOnline, setSimulatedOnline] = useState(
    getCameraStatus(camera).toLowerCase() === "online"
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  isFullscreenRef.current = isFullscreen;

  useEffect(() => {
    const triggerElement = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isFullscreenRef.current) {
          setIsFullscreen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
      triggerElement?.focus();
    };
  }, [onClose, triggerRef]);

  const statusLabel = simulatedOnline ? "Online" : "Offline";
  const statusStyles = simulatedOnline
    ? "bg-emerald-100 text-emerald-700"
    : "bg-red-100 text-red-700";

  const toggleSimulatedStatus = () => {
    const nextStatus = simulatedOnline ? "offline" : "online";
    updateCameraStatus(camera, nextStatus);
    setSimulatedOnline(nextStatus === "online");
  };

  const cameraDetails = [
    ["ID Kamera", camera.id],
    ["Lokasi", camera.location || "-"],
    ["Area", camera.area || "-"],
    ["Kategori", camera.category || "-"],
    ["IP / RTSP", camera.streamUrl || "Belum tersedia"],
  ];

  const openMonitoring = () => {
    const searchParams = new URLSearchParams();
    if (camera.location) searchParams.set("location", camera.location);
    if (camera.area) searchParams.set("area", camera.area);
    if (camera.category) searchParams.set("category", camera.category);

    onClose();
    navigate(`/monitoring?${searchParams.toString()}`);
  };

  return createPortal(
    isFullscreen ? (
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`camera-fullscreen-title-${camera.id}`}
        className="fixed inset-0 z-[110] flex h-[100dvh] flex-col bg-[#06111F] text-white"
      >
        <header className="flex items-center justify-between gap-4 border-b border-white/10 bg-[#0D1D32] px-5 py-3">
          <div className="min-w-0">
            <h2
              id={`camera-fullscreen-title-${camera.id}`}
              className="truncate text-sm font-bold sm:text-base"
            >
              {camera.name}
            </h2>
            <p className="truncate text-xs text-slate-300">
              {camera.location || "-"} · {camera.area || "-"} · Kategori:{" "}
              {camera.category || "-"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Tutup pemutar layar penuh"
            className="shrink-0 rounded-lg border border-white/20 p-2 text-white hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </header>

        <div className="relative flex min-h-0 flex-1 items-center justify-center bg-[#06111F]">
          {camera.streamUrl ? (
            <video
              className="h-full w-full object-contain"
              src={camera.streamUrl}
              autoPlay
              muted
              playsInline
              controls
            />
          ) : (
            <div
              className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_center,_#172D45_0%,_#06111F_70%)]"
              aria-label="Pratinjau kamera simulasi"
            >
              <span className="select-none text-7xl text-slate-200" aria-hidden="true">
                ▣
              </span>
              <p className="mt-4 text-sm text-slate-300">
                Pratinjau simulasi — streaming dan playback belum tersedia
              </p>
            </div>
          )}
          <span
            className={`absolute left-5 top-5 rounded-full px-3 py-1 text-xs font-bold text-white ${
              simulatedOnline ? "bg-emerald-600" : "bg-red-600"
            }`}
          >
            {statusLabel}
          </span>
        </div>

        <footer className="border-t border-white/10 bg-[#0D1D32] px-5 py-3 text-xs text-slate-300">
          {camera.streamUrl
            ? "Gunakan kontrol video untuk memutar atau menjeda streaming."
            : "Tampilan layar penuh · Pratinjau simulasi, bukan streaming CCTV langsung"}
        </footer>
      </section>
    ) : (
      <div
        className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#10233D]/50 p-4 backdrop-blur-[2px]"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) onClose();
        }}
      >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={`camera-details-title-${camera.id}`}
        className="my-auto w-full max-w-[960px] overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        <header className="flex items-start justify-between border-b border-[#E8EEF5] px-6 py-5">
          <div>
            <h2
              id={`camera-details-title-${camera.id}`}
              className="text-xl font-bold text-[#203A5C]"
            >
              Detail Kamera CCTV
            </h2>
            <p className="mt-1 text-sm text-[#7890AD]">
              Informasi perangkat dan status koneksi
            </p>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup detail kamera"
            className="rounded-md p-1 text-[#7890AD] hover:bg-[#F3F7FD] hover:text-[#203A5C] focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <X size={22} aria-hidden="true" />
          </button>
        </header>

        <div className="grid gap-6 p-6 md:grid-cols-2">
          <div>
            <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#789B92] via-[#819B98] to-[#183447]">
              {camera.streamUrl ? (
                <video
                  className="h-full w-full object-cover"
                  src={camera.streamUrl}
                  autoPlay
                  muted
                  playsInline
                  controls
                />
              ) : (
                <span className="select-none text-5xl text-white/75" aria-hidden="true">
                  ▣
                </span>
              )}
              <span
                className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white ${
                  simulatedOnline ? "bg-emerald-500" : "bg-red-500"
                }`}
              >
                {statusLabel}
              </span>
              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                aria-label="Buka tampilan layar penuh"
                className="absolute right-3 top-3 rounded-lg border border-white/30 bg-[#0D1D32]/80 p-2 text-white shadow hover:bg-[#0D1D32] focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Maximize size={18} aria-hidden="true" />
              </button>
            </div>
            <p className="mt-2 text-xs text-[#7890AD]">
              {camera.streamUrl
                ? "Gunakan kontrol video untuk playback."
                : "Pratinjau simulasi; playback tersedia saat stream kamera terhubung."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={toggleSimulatedStatus}
                className="rounded-lg bg-[#2878F0] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1768E0] focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                {simulatedOnline
                  ? "Simulasikan Putus Koneksi"
                  : "Simulasikan Koneksi Pulih"}
              </button>
              <button
                type="button"
                onClick={openMonitoring}
                className="rounded-lg bg-[#2878F0] px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1768E0] focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Lihat di Monitoring
              </button>
            </div>
          </div>

          <div>
            <h3 className="text-base font-bold text-[#203A5C]">{camera.name}</h3>
            <dl className="mt-5">
              <div className="flex items-center justify-between gap-4 border-b border-[#E8EEF5] py-3">
                <dt className="text-sm text-[#7890AD]">Status</dt>
                <dd>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles}`}
                  >
                    {statusLabel}
                  </span>
                </dd>
              </div>
              {cameraDetails.map(([label, value]) => (
                <div
                  key={label}
                  className="flex items-start justify-between gap-4 border-b border-[#E8EEF5] py-3"
                >
                  <dt className="shrink-0 text-sm text-[#7890AD]">{label}</dt>
                  <dd className="break-words text-right text-sm font-semibold text-[#203A5C]">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E8EEF5] px-6 py-4">
          <p className="text-xs text-[#7890AD]">
            Kontrol status hanya simulasi untuk demonstrasi prototipe.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#D3E1F1] px-4 py-2 text-sm font-semibold text-[#365B85] hover:bg-[#F3F7FD] focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Tutup
          </button>
        </footer>
      </section>
      </div>
    ),
    document.body
  );
};

export default CameraDetails;