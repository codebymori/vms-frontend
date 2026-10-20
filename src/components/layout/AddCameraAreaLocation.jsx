import { Plus } from "lucide-react";
import ButtonComponent from "../common/ButtonComponent";

const AddCameraAreaLocation = () => {
  return (
    <div className="flex gap-4 justify-end items-center">
        <ButtonComponent
          variant="secondary"
          icon={Plus}
          size="sm"
        >
          Tambah Lokasi
        </ButtonComponent>
        <ButtonComponent
          variant="secondary"
          icon={Plus}
          size="sm"
        >
          Tambah Area
        </ButtonComponent>
        <ButtonComponent
          variant="primary"
          icon={Plus}
          size="sm"
        >
          Tambah CCTV
        </ButtonComponent>
    </div>
    
    );
};

export default AddCameraAreaLocation;