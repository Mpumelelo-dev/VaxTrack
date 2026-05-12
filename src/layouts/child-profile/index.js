import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

// 📅 FIXED DATE CALCULATOR
const addWeeks = (dob, weeks) => {
  if (!dob) return "Not set";

  const base = new Date(dob);
  const result = new Date(base.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);

  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

function Profile() {
  const [mother, setMother] = useState(null);
  const [child, setChild] = useState(null);
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (!docSnap.exists()) return;

        const data = docSnap.data();

        const parentData = data?.parent || {};
        const childData = data?.child || {};

        setMother(parentData);
        setChild(childData);

        const dob = childData?.childDob;

        // 🧠 REALISTIC VACCINE SCHEDULE (BASED ON DOB)
        const vaccineSchedule = [
          { name: "BCG (Tuberculosis)", weeks: 0 },
          { name: "Hepatitis B (1st Dose)", weeks: 0 },
          { name: "Polio (OPV 1)", weeks: 6 },
          { name: "DTP (1st Dose)", weeks: 6 },
          { name: "Hib (1st Dose)", weeks: 6 },
          { name: "Polio (OPV 2)", weeks: 10 },
          { name: "DTP (2nd Dose)", weeks: 10 },
          { name: "Hepatitis B (2nd Dose)", weeks: 10 },
          { name: "Measles", weeks: 36 },
          { name: "MMR", weeks: 48 },
        ];

        // TODAY = 2026-05-05 (fixed logic)
        const today = new Date("2026-05-05");

        const enrichedVaccines = vaccineSchedule.map((v) => {
          const date = addWeeks(dob, v.weeks);

          const vaccineDate = new Date(date);

          let status = "Upcoming";
          if (vaccineDate < today) status = "Done";
          if (vaccineDate.toDateString() === today.toDateString()) status = "Due Today";

          return {
            name: v.name,
            date,
            status,
          };
        });

        setVaccines(enrichedVaccines);
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 📊 REALISTIC STATS
  const completed = vaccines.filter((v) => v.status === "Done").length;
  const upcoming = vaccines.filter((v) => v.status === "Upcoming").length;
  const due = vaccines.filter((v) => v.status === "Due Today").length;

  const stats = [
    { label: "Vaccines Completed", value: `${completed}/10`, color: "success" },
    { label: "Upcoming", value: `${upcoming}`, color: "warning" },
    { label: "Due Today", value: `${due}`, color: "error" },
  ];

  const getColor = (status) => {
    if (status === "Done") return "success";
    if (status === "Due Today") return "error";
    return "warning";
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDTypography color="white">Loading profile...</MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* HEADER */}
        <MDTypography variant="h5" fontWeight="medium" color="#0B1B2B">
          👩‍⚕️ Child Health Profile
        </MDTypography>

        {/* PARENT + CHILD INFO */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#0F2235",
            border: "1px solid #1E3A52",
          }}
        >
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" color="white">
                👩 Parent
              </MDTypography>
              <MDTypography variant="button" color="white">
                {mother?.parentName || "N/A"}
              </MDTypography>
            </Grid>

            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" color="white">
                👶 Child
              </MDTypography>
              <MDTypography variant="button" color="white">
                {child?.childName || "N/A"}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>

        {/* STATS */}
        <Grid container spacing={3} mt={1}>
          {stats.map((s, i) => (
            <Grid item xs={12} md={4} key={i}>
              <MDBox
                p={2}
                borderRadius="lg"
                sx={{
                  backgroundColor: "#071A2F",
                  border: "1px solid #1E3A52",
                  textAlign: "center",
                }}
              >
                <MDTypography variant="h6" color="white">
                  {s.value}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {s.label}
                </MDTypography>
              </MDBox>
            </Grid>
          ))}
        </Grid>

        {/* VACCINES */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#0F2235",
            border: "1px solid #1E3A52",
          }}
        >
          <MDTypography variant="h6" color="white" mb={2}>
            💉 Vaccination Timeline
          </MDTypography>

          {vaccines.map((v, i) => (
            <MDBox
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              mb={1}
              borderRadius="12px"
              sx={{
                backgroundColor: "#071A2F",
                border: "1px solid #1E3A52",
              }}
            >
              <MDBox>
                <MDTypography variant="button" color="white">
                  {v.name}
                </MDTypography>
                <MDTypography variant="caption" color="text">
                  {v.date}
                </MDTypography>
              </MDBox>

              <Chip label={v.status} color={getColor(v.status)} size="small" />
            </MDBox>
          ))}
        </MDBox>

        {/* ACTIONS */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#0B1B2B" }}>
          <MDTypography variant="h6" color="#0F172A">
            📩 Health Actions
          </MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
            <MDButton variant="gradient" color="info" fullWidth>
              Send Summary
            </MDButton>

            <MDButton variant="outlined" color="warning" fullWidth>
              Update Profile
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
