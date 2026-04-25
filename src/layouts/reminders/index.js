import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Reminders() {
  const childName = "Ava Ndlovu";

  const reminders = [
    {
      vaccine: "BCG (TB Protection)",
      date: "Jan 10",
      status: "Completed",
      type: "History",
    },
    {
      vaccine: "Polio Dose 1",
      date: "Feb 20",
      status: "Missed",
      type: "Urgent Follow-up",
    },
    {
      vaccine: "DTaP Dose 1",
      date: "Mar 10",
      status: "Upcoming",
      type: "Scheduled Care",
    },
    {
      vaccine: "Hepatitis B",
      date: "Apr 15",
      status: "Upcoming",
      type: "Preventive Care",
    },
  ];

  const getColor = (status) => {
    if (status === "Completed") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* 🏥 HEADER */}
        <MDBox mb={4}>
          <MDTypography variant="h5" fontWeight="medium">
            🏥 Child Health Reminder Center
          </MDTypography>

          <MDTypography variant="button" color="text">
            Care notifications for: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {/* 🌿 CLINICAL REMINDER BOARD */}
        <MDBox
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
          }}
        >
          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={4}>
              <MDTypography variant="button" fontWeight="bold">
                Vaccine
              </MDTypography>
            </Grid>

            <Grid item xs={2}>
              <MDTypography variant="button" fontWeight="bold">
                Due Date
              </MDTypography>
            </Grid>

            <Grid item xs={3}>
              <MDTypography variant="button" fontWeight="bold">
                Status
              </MDTypography>
            </Grid>

            <Grid item xs={3}>
              <MDTypography variant="button" fontWeight="bold">
                Action
              </MDTypography>
            </Grid>
          </Grid>

          {/* ROWS */}
          {reminders.map((r, i) => (
            <Grid
              container
              key={i}
              spacing={2}
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "12px",
                mb: 1,
                p: 2,
                alignItems: "center",
                border: "1px solid #e6f0ea",
                boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
              }}
            >
              {/* Vaccine */}
              <Grid item xs={4}>
                <MDTypography variant="button" fontWeight="medium">
                  {r.vaccine}
                </MDTypography>

                <MDTypography variant="caption" color="text">
                  {r.type}
                </MDTypography>
              </Grid>

              {/* Date */}
              <Grid item xs={2}>
                <MDTypography variant="caption">📅 {r.date}</MDTypography>
              </Grid>

              {/* Status */}
              <Grid item xs={3}>
                <Chip label={r.status} color={getColor(r.status)} size="small" />
              </Grid>

              {/* ACTION */}
              <Grid item xs={3}>
                {r.status === "Upcoming" && (
                  <MDButton variant="gradient" color="warning" size="small">
                    📩 Send Reminder
                  </MDButton>
                )}

                {r.status === "Missed" && (
                  <MDButton variant="gradient" color="error" size="small">
                    ⚠️ Urgent Follow-up
                  </MDButton>
                )}

                {r.status === "Completed" && (
                  <MDButton variant="outlined" color="success" size="small">
                    View Record
                  </MDButton>
                )}
              </Grid>
            </Grid>
          ))}
        </MDBox>

        {/* 📌 CARE INFORMATION PANEL */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#fff8e1",
            border: "1px solid #ffe0b2",
          }}
        >
          <MDTypography variant="h6" fontWeight="medium">
            📌 Reminder System Rule
          </MDTypography>

          <MDTypography variant="caption" color="text">
            • Reminders are automatically prepared 2 days before vaccination date • Missed
            vaccinations trigger urgent follow-up alerts • Parents receive care notifications for
            all upcoming vaccines
          </MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
            <MDButton variant="gradient" color="success" fullWidth>
              Send All Upcoming Reminders
            </MDButton>

            <MDButton variant="outlined" color="warning" fullWidth>
              Review Missed Vaccines
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Reminders;
