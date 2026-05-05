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

function Profile() {
  const [mother, setMother] = useState({});
  const [child, setChild] = useState({});
  const [vaccines, setVaccines] = useState([]);

  // 🔥 FETCH FIREBASE DATA
  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (snap.exists()) {
        const data = snap.data();

        setMother(data.parent || {});
        setChild(data.child || {});
        setVaccines(data.vaccines || []);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      label: "Vaccines Completed",
      value: vaccines.filter((v) => v.status === "Done").length,
    },
    {
      label: "Upcoming",
      value: vaccines.filter((v) => v.status === "Upcoming").length,
    },
    {
      label: "Missed",
      value: vaccines.filter((v) => v.status === "Missed").length,
    },
  ];

  const getColor = (status) => {
    if (status === "Done") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* HEADER */}
        <MDTypography variant="h5" fontWeight="medium">
          👩‍⚕️ Child Health Profile
        </MDTypography>

        {/* PARENT + CHILD INFO */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
          }}
        >
          <Grid container spacing={3}>
            {/* PARENT */}
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" fontWeight="medium">
                👩 Parent Information
              </MDTypography>

              <MDTypography variant="button">Name: {mother.parentName || "N/A"}</MDTypography>

              <MDTypography variant="caption" display="block">
                Email: {mother.email || "N/A"}
              </MDTypography>

              <MDTypography variant="caption" display="block">
                Phone: {mother.phone || "N/A"}
              </MDTypography>
            </Grid>

            {/* CHILD */}
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" fontWeight="medium">
                👶 Child Information
              </MDTypography>

              <MDTypography variant="button">Name: {child.childName || "N/A"}</MDTypography>

              <MDTypography variant="caption" display="block">
                DOB: {child.childDob || "N/A"}
              </MDTypography>

              <MDTypography variant="caption" display="block">
                Gender: {child.childGender || "N/A"}
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
                  backgroundColor: "#ffffff",
                  border: "1px solid #e6f0ea",
                  textAlign: "center",
                }}
              >
                <MDTypography variant="h6">{s.value}</MDTypography>
                <MDTypography variant="caption">{s.label}</MDTypography>
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
            backgroundColor: "#f0f7f4",
            border: "1px solid #d6e9dc",
          }}
        >
          <MDTypography variant="h6" fontWeight="medium" mb={2}>
            💉 Vaccination Record
          </MDTypography>

          {vaccines.length === 0 && <MDTypography>No vaccine data available</MDTypography>}

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
                backgroundColor: "#ffffff",
                border: "1px solid #e6f0ea",
              }}
            >
              <MDBox>
                <MDTypography variant="button">{v.name}</MDTypography>
                <MDTypography variant="caption">Date: {v.date}</MDTypography>
              </MDBox>

              <Chip label={v.status} color={getColor(v.status)} size="small" />
            </MDBox>
          ))}
        </MDBox>

        {/* ACTIONS */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#fff8e1" }}>
          <MDTypography variant="h6">📩 Health Actions</MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
            <MDButton variant="gradient" color="success" fullWidth>
              Send Health Summary
            </MDButton>

            <MDButton variant="outlined" color="warning" fullWidth>
              Update Child Details
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Profile;
