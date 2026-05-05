import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// 🧮 SAME DATE ENGINE AS VaccineTracker
const calculateDate = (dob, weeks) => {
  if (!dob) return "Not set";

  const base = new Date(dob);
  const result = new Date(base);

  result.setDate(base.getDate() + weeks * 7);

  return result.toISOString().split("T")[0];
};

function Reminders() {
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH (MATCHES VaccineTracker EXACTLY)
  const fetchData = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();

      const dob = data.child?.childDob || null;

      setChildName(data.child?.childName || "Unnamed Child");
      setChildDob(dob);

      const vaccinesRef = collection(db, "users", user.uid, "vaccines");
      const vaccinesSnap = await getDocs(vaccinesRef);

      const mapped = vaccinesSnap.docs.map((docSnap) => {
        const v = docSnap.data();

        return {
          id: docSnap.id,
          name: v.name,
          status: v.status || "Upcoming",
          note: v.note || "",
          offsetWeeks: v.dateOffsetWeeks || 0,

          // 🔥 SAME CALCULATION RULE AS TRACKER
          date: calculateDate(dob, v.dateOffsetWeeks || 0),
        };
      });

      setReminders(mapped);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 🔁 UPDATE STATUS (SYNC WITH VaccineTracker)
  const updateStatus = async (id, newStatus) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();

      const updatedVaccines = (data.vaccines || []).map((v) => {
        if (v.name === id) {
          return { ...v, status: newStatus };
        }
        return v;
      });

      await updateDoc(userRef, {
        vaccines: updatedVaccines,
      });

      fetchData(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  const getColor = (status) => {
    if (status === "Done") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  const getIcon = (status) => {
    if (status === "Done") return "✅";
    if (status === "Missed") return "⚠️";
    return "⏳";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <MDBox mb={4}>
          <MDTypography variant="h5">🏥 Reminder Center</MDTypography>
          <MDTypography variant="button">
            Child: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {loading ? (
          <MDTypography>Loading...</MDTypography>
        ) : (
          <MDBox p={3} borderRadius="lg" sx={{ backgroundColor: "#0F2235" }}>
            {reminders.map((r) => (
              <Grid
                container
                key={r.id}
                spacing={2}
                sx={{
                  backgroundColor: "#071A2F",
                  p: 2,
                  mb: 1,
                  borderRadius: "12px",
                  alignItems: "center",
                }}
              >
                {/* Vaccine */}
                <Grid item xs={4}>
                  <MDTypography color="white">
                    {getIcon(r.status)} {r.name}
                  </MDTypography>
                  <MDTypography color="text" variant="caption">
                    {r.note}
                  </MDTypography>
                </Grid>

                {/* Date */}
                <Grid item xs={2}>
                  <MDTypography color="text">📅 {r.date}</MDTypography>
                </Grid>

                {/* Status */}
                <Grid item xs={3}>
                  <Chip label={r.status} color={getColor(r.status)} size="small" />
                </Grid>

                {/* Actions */}
                <Grid item xs={3}>
                  <MDButton
                    size="small"
                    color="success"
                    variant="outlined"
                    onClick={() => updateStatus(r.id, "Done")}
                    sx={{ mr: 1 }}
                  >
                    Done
                  </MDButton>

                  <MDButton
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => updateStatus(r.id, "Missed")}
                  >
                    Missed
                  </MDButton>
                </Grid>
              </Grid>
            ))}
          </MDBox>
        )}
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Reminders;
