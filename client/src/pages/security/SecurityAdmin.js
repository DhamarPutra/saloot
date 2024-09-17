import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function SecurityAdmin() {
  const navigate = useNavigate();

  const cekAdmin = () => {
    const nama_tim = localStorage.getItem("nama_tim");
    const password = localStorage.getItem("password");
    const admin = localStorage.getItem("admin");
    const full_access = localStorage.getItem("full_access");

    if (
      !(nama_tim === "admin" &&
      password === "Damar-X-ISC@2024" &&
      admin === "true" &&
      full_access === "true")
    ) {
      navigate("/"); // Arahkan ke halaman Index
    }
  };

  useEffect(() => {
    const adminInterval = setInterval(cekAdmin, 1000);

    // Bersihkan interval saat komponen dibongkar
    return () => clearInterval(adminInterval);
  }, []);

  return null; // Komponen ini tidak menampilkan apa-apa
}

export default SecurityAdmin;