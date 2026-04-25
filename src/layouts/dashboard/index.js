import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const { sales } = reportsLineChartData;

  const childName = "Ava Ndlovu";

  const vaccines = [
    { name: "BCG (TB protection)", date: "Jan 10", status: "Upcoming" },
    { name: "Polio Dose 1", date: "Feb 20", status: "Upcoming" },
    { name: "DTaP Dose 1", date: "Mar 10", status: "Upcoming" },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* 👶 CHILD HEADER */}
        <MDBox mb={3}>
          <MDTypography variant="h5" fontWeight="medium">
            👩‍👧 My Child’s Health Dashboard
          </MDTypography>
          <MDTypography variant="button" color="text">
            Tracking immunisation progress for: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {/* 🌿 PERSONAL SUMMARY (NOT SYSTEM STATS) */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="health_and_safety"
              title="Health Status"
              count="Protected"
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard icon="event" title="Next Vaccine" count="2 Weeks" />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="success"
              icon="check_circle"
              title="Vaccines Done"
              count={6}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="warning"
              title="Missed / Delayed"
              count={0}
            />
          </Grid>
        </Grid>

        {/* 📈 PERSONAL HEALTH PROGRESS */}
        <MDBox mt={4.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ReportsLineChart
                color="success"
                title="My Child’s Immunisation Progress"
                description="Progress over time"
                date="updated today"
                chart={sales}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ReportsBarChart
                color="info"
                title="Vaccination Completion Status"
                description="Done vs Pending vaccines"
                date="live tracking"
                chart={reportsBarChartData}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* 🏥 PERSONAL CARE PLAN */}
        <MDBox
          mt={3}
          p={3}
          borderRadius="lg"
          sx={{
            background: "#f0f7f4",
            border: "1px solid #d6e9dc",
          }}
        >
          <MDTypography variant="h6" fontWeight="medium" mb={2}>
            🏥 My Child’s Vaccination Schedule
          </MDTypography>

          {vaccines.map((v, i) => (
            <MDBox
              key={i}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p={2}
              mb={1}
              borderRadius="md"
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
                  Due date: {v.date}
                </MDTypography>
              </MDBox>

              <Chip label={v.status} color="success" size="small" />
            </MDBox>
          ))}

          <MDBox mt={2}>
            <MDButton variant="gradient" color="success" fullWidth>
              📩 Send Reminder to Myself / Clinic
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
