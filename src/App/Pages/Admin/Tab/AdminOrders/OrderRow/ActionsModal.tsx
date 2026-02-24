import { createPortal } from "react-dom";
import { Edit3, Eye, Trash2 } from "lucide-react";
import { Typography } from "../../../../../../@All/AppForm/Form";

const ActionsModal = ({ position, onClose, setUpdatemodal }: any) => {
    const HanldeupdateModal = ()=>{
        setUpdatemodal(true)
        onClose()
    }

  return createPortal(
    <>
      {/* Overlay for outside click */}
      <div onClick={onClose} className="fixed inset-0 z-40" />

      {/* Dropdown */}
      <div
        style={{
          top: position.top,
          left: position.left,
        }}
        className="fixed z-50 w-48 bg-white rounded-xl shadow-2xl border border-slate-100 p-1 animate-in fade-in zoom-in duration-150"
      >
        <button
          onClick={HanldeupdateModal}
          className="flex items-center gap-3 w-full cursor-pointer px-4 py-2.5 hover:bg-slate-50"
        >
          <Edit3 size={16} className="text-slate-400" />
          <Typography className="text-sm font-medium">Update Order</Typography>
        </button>

        <button className="flex items-center gap-3 cursor-pointer w-full px-4 py-2.5 hover:bg-slate-50">
          <Eye size={16} className="text-slate-400" />
          <Typography className="text-sm font-medium">View Details</Typography>
        </button>

        <div className="my-1 border-t border-slate-100" />

        <button className="flex items-center gap-3 w-full px-4 cursor-pointer py-2.5 hover:bg-red-50 text-red-600">
          <Trash2 size={16} />
          <Typography className="text-sm font-medium">Delete Order</Typography>
        </button>
      </div>
    </>,
    document.body,
  );
};

export default ActionsModal;
