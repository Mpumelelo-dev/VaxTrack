import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Profile() {
  const mother = {
    name: "Nomsa Ndlovu",
    phone: "+27 82 555 1234",
  };

  const child = {
    name: "Ava Ndlovu",
    dob: "2025-01-10",
    gender: "Female",
    clinic: "Johannesburg Clinic",
  };

  const stats = [
    { label: "Vaccines Completed", value: 6, color: "success" },
    { label: "Upcoming", value: 3, color: "warning" },
    { label: "Missed", value: 1, color: "error" },
  ];

  const vaccines = [
    { name: "BCG", status: "Done", date: "Birth" },
    { name: "Polio Dose 1", status: "Missed", date: "Feb 20" },
    { name: "DTaP Dose 1", status: "Upcoming", date: "Mar 10" },
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
        {/* 🏥 HEADER */}
        <MDTypography variant="h5" fontWeight="medium">
          👩‍⚕️ Child Health Profile
        </MDTypography>

        {/* 👩‍👧 INFO SECTION */}
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
            {/* Mother */}
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" fontWeight="medium">
                👩 Parent Information
              </MDTypography>

              <MDTypography variant="button">Name: {mother.name}</MDTypography>

              <MDTypography variant="caption" display="block">
                Contact: {mother.phone}
              </MDTypography>
            </Grid>

            {/* Child */}
            <Grid item xs={12} md={6}>
              <MDTypography variant="h6" fontWeight="medium">
                👶 Child Information
              </MDTypography>

              <MDTypography variant="button">Name: {child.name}</MDTypography>

              <MDTypography variant="caption" display="block">
                DOB: {child.dob}
              </MDTypography>

              <MDTypography variant="caption" display="block">
                Gender: {child.gender}
              </MDTypography>

              <MDTypography variant="caption" display="block">
                Clinic: {child.clinic}
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>

        {/* 📊 HEALTH SUMMARY */}
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

        {/* 💉 VACCINATION HISTORY */}
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
                <MDTypography variant="button" fontWeight="medium">
                  {v.name}
                </MDTypography>

                <MDTypography variant="caption" color="text">
                  Date: {v.date}
                </MDTypography>
              </MDBox>

              <Chip label={v.status} color={getColor(v.status)} size="small" />
            </MDBox>
          ))}
        </MDBox>

        {/* 📩 ACTIONS */}
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
