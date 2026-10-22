import initialAlerts from "../data/allerts.json";

const ALERTS_STORAGE_KEY = "vms-alerts";
const CAMERA_STATUSES_STORAGE_KEY = "vms-camera-statuses";
export const ALERTS_UPDATED_EVENT = "vms:alerts-updated";

const readStoredValue = (key, fallback) => {
  const storedValue = window.localStorage.getItem(key);
  return storedValue === null ? fallback : JSON.parse(storedValue);
};

const notifyAlertsUpdated = () => {
  window.dispatchEvent(new Event(ALERTS_UPDATED_EVENT));
};

export const getAlerts = () =>
  readStoredValue(ALERTS_STORAGE_KEY, initialAlerts);

export const clearAlerts = () => {
  window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify([]));
  notifyAlertsUpdated();
};

export const getCameraStatus = (camera) => {
  const statuses = readStoredValue(CAMERA_STATUSES_STORAGE_KEY, {});
  return statuses[camera.id] || camera.status || "offline";
};

export const updateCameraStatus = (camera, nextStatus) => {
  const statuses = readStoredValue(CAMERA_STATUSES_STORAGE_KEY, {});
  const previousStatus = statuses[camera.id] || camera.status || "offline";

  if (previousStatus === nextStatus) return;

  statuses[camera.id] = nextStatus;
  window.localStorage.setItem(
    CAMERA_STATUSES_STORAGE_KEY,
    JSON.stringify(statuses)
  );

  const event = nextStatus === "online" ? "back_online" : "offline";
  const time = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());
  const alerts = getAlerts();

  alerts.unshift({
    id: `camera-${camera.id}-${Date.now()}`,
    cameraId: camera.id,
    event,
    time,
    description: nextStatus === "online" ? "Back to online" : "Not responding",
  });

  window.localStorage.setItem(ALERTS_STORAGE_KEY, JSON.stringify(alerts));
  notifyAlertsUpdated();
};
