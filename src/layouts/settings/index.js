import Grid from "@mui/material/Grid";
import Switch from "@mui/material/Switch";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Settings() {
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* 🏥 HEADER */}
        <MDTypography variant="h5" fontWeight="medium">
          ⚙️ Care Settings & Preferences
        </MDTypography>

        <MDTypography variant="button" color="text">
          Manage how you receive health reminders for your child
        </MDTypography>

        {/* 👩 PARENT CONTACT SETTINGS */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
          }}
        >
          <MDTypography variant="h6" fontWeight="medium" mb={2}>
            👩 Parent Contact Details
          </MDTypography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Parent Name" defaultValue="Nomsa Ndlovu" />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone Number (SMS)" defaultValue="+27 82 555 1234" />
            </Grid>
          </Grid>
        </MDBox>

        {/* 📩 REMINDER SETTINGS */}
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
            📩 Reminder Preferences
          </MDTypography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <MDTypography variant="button">Send reminders 2 days before vaccination</MDTypography>
            </Grid>

            <Grid item xs={4}>
              <Switch defaultChecked />
            </Grid>

            <Grid item xs={8}>
              <MDTypography variant="button">Send same-day reminder</MDTypography>
            </Grid>

            <Grid item xs={4}>
              <Switch />
            </Grid>

            <Grid item xs={8}>
              <MDTypography variant="button">Notify for missed vaccinations</MDTypography>
            </Grid>

            <Grid item xs={4}>
              <Switch defaultChecked />
            </Grid>
          </Grid>
        </MDBox>

        {/* 🔔 NOTIFICATION SETTINGS */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#fff8e1",
            border: "1px solid #ffe0b2",
          }}
        >
          <MDTypography variant="h6" fontWeight="medium" mb={2}>
            🔔 Notification Settings
          </MDTypography>

          <Grid container spacing={2} alignItems="center">
            <Grid item xs={8}>
              <MDTypography variant="button">Enable SMS Notifications</MDTypography>
            </Grid>

            <Grid item xs={4}>
              <Switch defaultChecked />
            </Grid>

            <Grid item xs={8}>
              <MDTypography variant="button">Enable In-App Alerts</MDTypography>
            </Grid>

            <Grid item xs={4}>
              <Switch defaultChecked />
            </Grid>
          </Grid>
        </MDBox>

        {/* 💾 SAVE BUTTON */}
        <MDBox mt={3} display="flex" gap={2}>
          <MDButton variant="gradient" color="success" fullWidth>
            Save Care Settings
          </MDButton>

          <MDButton variant="outlined" color="warning" fullWidth>
            Reset
          </MDButton>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Settings;
