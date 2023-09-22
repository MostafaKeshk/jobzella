import { useState } from "react";
import { toast } from "react-toastify";

const useCallApi = () => {
  const [loading, setLoading] = useState(false);
  const callApi = async (
    API: any,
    onSuccess: (data: any) => void,
    onError?: (error: string) => void
  ) => {
    try {
      setLoading(true);
      const response = await API;
      onSuccess(response.data);
    } catch (error: any) {
      if (onError) {
        onError(error.message);
      }
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { callApi, loading };
};

export default useCallApi;
