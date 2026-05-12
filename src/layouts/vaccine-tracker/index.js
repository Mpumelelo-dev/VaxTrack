import { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import { useNavigate } from "react-router-dom";
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
import { auth, db } from "../../firebase";

import { doc, getDoc, collection, getDocs } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function VaccineTracker() {
<<<<<<< HEAD
=======
  const navigate = useNavigate();
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🧮 helper: calculate date from DOB + weeks
  const calculateDate = (dob, weeks) => {
    if (!dob) return "Not set";

    const base = new Date(dob);
    const result = new Date(base);

    result.setDate(base.getDate() + weeks * 7);

    return result.toISOString().split("T")[0]; // YYYY-MM-DD
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const user = auth.currentUser;
        if (!user) return;

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) return;

        const data = userSnap.data();

        // 👶 CHILD INFO
        const dob = data.child?.childDob || null;

        setChildName(data.child?.childName || "Unnamed Child");
        setChildDob(dob);

        // 💉 VACCINES
        const vaccinesRef = collection(db, "users", user.uid, "vaccines");
        const vaccinesSnap = await getDocs(vaccinesRef);

        const vaccinesData = vaccinesSnap.docs.map((docSnap) => {
          const v = docSnap.data();

          return {
            id: docSnap.id,
            name: v.name || "Unknown Vaccine",
            status: (v.status || "Upcoming").trim(),
            note: v.note || "",
            offsetWeeks: v.dateOffsetWeeks || 0,

            // 🧠 REAL CALCULATED DATE
            date: calculateDate(dob, v.dateOffsetWeeks || 0),
          };
        });

        setVaccines(vaccinesData);
      } catch (error) {
        console.error("🔥 Vaccine fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColor = (status) => {
    if (status === "Done" || status === "Completed") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  const getStatusIcon = (status) => {
    if (status === "Done" || status === "Completed") return "✅";
    if (status === "Missed") return "⚠️";
    return "⏳";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* HEADER */}
        <MDBox mb={4}>
          <MDTypography variant="h5" fontWeight="medium">
            🏥 Immunisation Care Timeline
          </MDTypography>

          <MDTypography variant="button" color="text">
            Child: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {/* LOADING */}
        {loading ? (
          <MDTypography>Loading vaccines...</MDTypography>
        ) : (
          <MDBox
            p={3}
            borderRadius="lg"
            sx={{
              backgroundColor: "#e8f5e9",
              border: "1px solid #c8e6c9",
            }}
          >
            {vaccines.length === 0 && <MDTypography>No vaccine records found</MDTypography>}

            {vaccines.map((v, i) => (
              <MDBox key={v.id} mb={2}>
                <MDBox
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  p={2}
                  borderRadius="12px"
                  sx={{
                    backgroundColor: "#ffffff",
                    border: "1px solid #e6f0ea",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  {/* LEFT */}
                  <MDBox>
                    <MDTypography variant="button" fontWeight="medium">
                      {getStatusIcon(v.status)} {v.name}
                    </MDTypography>

                    <MDTypography variant="caption" display="block">
                      📅 {v.date}
                    </MDTypography>

                    {v.note && (
                      <MDTypography variant="caption" display="block">
                        📝 {v.note}
                      </MDTypography>
                    )}
                  </MDBox>

                  {/* RIGHT */}
                  <MDBox textAlign="right">
                    <Chip label={v.status} color={getColor(v.status)} size="small" />

                    <MDBox mt={1}>
                      {v.status === "Done" && (
                        <MDButton size="small" color="success" variant="outlined">
                          View Record
                        </MDButton>
                      )}

                      {v.status === "Missed" && (
                        <MDButton size="small" color="error" variant="gradient">
                          Reschedule
                        </MDButton>
                      )}

                      {v.status === "Upcoming" && (
<<<<<<< HEAD
                        <MDButton size="small" color="warning" variant="gradient">
=======
                        <MDButton
                          size="small"
                          color="warning"
                          variant="gradient"
                          onClick={() => navigate("/reminders")}
                        >
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
                          Mark Reminder
                        </MDButton>
                      )}
                    </MDBox>
                  </MDBox>
                </MDBox>

                {i !== vaccines.length - 1 && <Divider sx={{ my: 1 }} />}
              </MDBox>
            ))}
          </MDBox>
        )}

        {/* ACTION PANEL */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#fff8e1" }}>
          <MDTypography variant="h6">📩 Care Actions</MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
<<<<<<< HEAD
            <MDButton variant="gradient" color="success" fullWidth>
=======
            <MDButton
              variant="gradient"
              color="success"
              fullWidth
              onClick={() => navigate("/reminders")}
            >
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
              Send All Upcoming Reminders
            </MDButton>

            <MDButton variant="outlined" color="error" fullWidth>
              Flag Missed Vaccines
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default VaccineTracker;
