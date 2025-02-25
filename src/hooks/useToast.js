import { useCallback } from 'react';
import { toast as showToast } from 'react-toastify';

export const useToast = () => {
  const toast = useCallback(({ title, description, variant = "default" }) => {
    const options = {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    };

    switch (variant) {
      case "destructive":
        showToast.error(description || title, options);
        break;
      case "success":
        showToast.success(description || title, options);
        break;
      case "warning":
        showToast.warning(description || title, options);
        break;
      default:
        showToast.info(description || title, options);
    }
  }, []);

  return { toast };
};

export default useToast;
