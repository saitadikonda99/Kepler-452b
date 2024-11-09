import axios from "axios";
import toast from "react-hot-toast";

const useLogout = () => {


  const logout = async () => {
    try {

      const response = await axios.get("/api/logout", {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      localStorage.removeItem("user");
      window.location.href = "/admin/login";
      
    } catch (error) {
      console.log(error);
      toast.error("Error logging out");
    }
  };

  return logout;
};

export default useLogout;
