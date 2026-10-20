
import { VideoOff } from "lucide-react";

const CameraCard = ({ camera, onClick, className = "" }) => {
  const isOnline = camera.status?.toLowerCase() === "online";

  return (
    <article
      onClick={onClick}
      className={`overflow-hidden rounded-lg border border-[#D9E5F2] bg-white shadow-sm ${
        onClick ? "cursor-pointer" : ""
      } ${className}`}
    >
      {/* Camera Preview */}
      <div className="relative flex aspect-video items-center justify-center overflow-hidden bg-gradient-to-br from-[#789B92] via-[#819B98] to-[#183447]">
        {camera.streamUrl ? (
          <video
            className="h-full w-full object-cover"
            src={camera.streamUrl}
            autoPlay
            muted
            playsInline
            controls={false}
          />
        ) : (
          <VideoOff
            size={28}
            className="text-white/80"
            strokeWidth={1.5}
          />
        )}

        {/* Camera Status */}
        <span
          className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[11px] font-bold text-white ${
            isOnline ? "bg-emerald-500" : "bg-red-500"
          }`}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      </div>

      {/* Camera Information */}
      <div className="bg-[#2E465C] px-2 py-2 text-white">
        <h3
          className="truncate text-xs font-bold"
          title={camera.name}
        >
          {camera.name}
        </h3>

        <p className="mt-0.5 text-[10px] leading-[1.5] text-[#C3D0DE]">
          <span className="font-semibold">Lokasi:</span>{" "}
          {camera.location || "-"}
        </p>

        <p className="text-[10px] leading-[1.5] text-[#C3D0DE]">
          <span className="font-semibold">Area:</span>{" "}
          {camera.area || "-"}
        </p>

        <p className="text-[10px] leading-[1.5] text-[#8CB8F5]">
          <span className="font-semibold">Kategori:</span>{" "}
          {camera.category || "-"}
        </p>
      </div>
    </article>
  );
};

export default CameraCard;
