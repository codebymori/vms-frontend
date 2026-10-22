import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cameras from "../../data/cameras.json";
import {
  ALERTS_UPDATED_EVENT,
  getAlerts,
} from "../../utils/alertStore";

const AllertNotification = () => {
  const [alerts, setAlerts] = useState(getAlerts);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const syncAlerts = () => setAlerts(getAlerts());
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener(ALERTS_UPDATED_EVENT, syncAlerts);
    window.addEventListener("storage", syncAlerts);
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener(ALERTS_UPDATED_EVENT, syncAlerts);
      window.removeEventListener("storage", syncAlerts);
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const cameraById = new Map(cameras.map((camera) => [camera.id, camera]));
  const recentAlerts = alerts.slice(0, 8);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        aria-label={`Notifikasi, ${alerts.length} alert`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((open) => !open)}
        className="relative flex h-10 w-10 items-center justify-center rounded-lg text-[#203A5C] hover:bg-[#F3F7FD] focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        <Bell size={24} aria-hidden="true" />
        {alerts.length > 0 && (
          <span className="absolute -right-0 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E94B55] px-1 text-[9px] font-medium text-white">
            {alerts.length > 99 ? "99+" : alerts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <section
          role="dialog"
          aria-label="Notifikasi alert kamera"
          className="absolute right-0 top-12 z-50 w-[min(92vw,420px)] overflow-hidden rounded-xl border border-[#E1EAF5] bg-white shadow-xl"
        >
          <header className="flex items-center justify-between border-b border-[#E8EEF5] px-4 py-3">
            <div>
              <h2 className="font-bold text-[#203A5C]">Notifikasi</h2>
              <p className="mt-0.5 text-xs text-[#7890AD]">
                {alerts.length} event kamera
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOpen(false);
                navigate("/alerts");
              }}
              className="text-xs font-semibold text-[#2878F0] hover:underline"
            >
              Lihat semua
            </button>
          </header>

          <div className="max-h-[min(65vh,480px)] overflow-y-auto">
            {recentAlerts.length > 0 ? (
              <ul className="divide-y divide-[#E8EEF5]">
                {recentAlerts.map((alert) => {
                  const camera = cameraById.get(alert.cameraId);
                  const isRecovered = alert.event === "back_online";

                  return (
                    <li key={alert.id} className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <span
                          className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                            isRecovered
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-rose-50 text-rose-600"
                          }`}
                        >
                          {isRecovered ? "Back to online" : alert.event}
                        </span>
                        <time className="whitespace-nowrap text-xs text-[#7890AD]">
                          {alert.time}
                        </time>
                      </div>
                      <p className="mt-2 truncate text-sm font-semibold text-[#203A5C]">
                        {camera?.name || `Kamera ID ${alert.cameraId}`}
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-[#7890AD]">
                        {camera?.area || "-"} / {camera?.category || "-"}
                      </p>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-4 py-10 text-center text-sm text-[#7890AD]">
                Belum ada notifikasi.
              </p>
            )}
          </div>

          {alerts.length > recentAlerts.length && (
            <footer className="border-t border-[#E8EEF5] px-4 py-2 text-center text-xs text-[#7890AD]">
              Menampilkan {recentAlerts.length} notifikasi terbaru
            </footer>
          )}
        </section>
      )}
    </div>
  );
};

export default AllertNotification;