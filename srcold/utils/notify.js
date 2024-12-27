import { toast } from "react-toastify";

export const notify = (name, message) => {
    toast.dismiss();
    toast(<span className="line-clamp-2">{`${name} ${message}`}</span>)
};
