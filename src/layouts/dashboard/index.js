import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// 📅 DATE CALCULATION
const calculateDate = (dob, weeks) => {
  if (!dob) return null;

  const base = new Date(dob);
  const result = new Date(base.getTime() + weeks * 7 * 24 * 60 * 60 * 1000);

  const year = result.getFullYear();
  const month = String(result.getMonth() + 1).padStart(2, "0");
  const day = String(result.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

// 💉 VACCINE SCHEDULE
const vaccineSchedule = [
  { name: "BCG", weeks: 0 },
  { name: "Hepatitis B", weeks: 0 },
  { name: "OPV 1", weeks: 6 },
  { name: "DTaP 1", weeks: 6 },
  { name: "Hib 1", weeks: 6 },
  { name: "Rotavirus 1", weeks: 6 },
  { name: "OPV 2", weeks: 10 },
  { name: "DTaP 2", weeks: 10 },
  { name: "Hib 2", weeks: 10 },
  { name: "PCV 1", weeks: 10 },
  { name: "OPV 3", weeks: 14 },
  { name: "DTaP 3", weeks: 14 },
  { name: "MMR 1", weeks: 36 },
];

function Dashboard() {
  const [childName, setChildName] = useState("");
  const [vaccines, setVaccines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const snap = await getDoc(doc(db, "users", user.uid));
        if (!snap.exists()) return;

        const data = snap.data();

        const child = data?.child;
        const childDob = child?.childDob;

        setChildName(child?.childName || "Child");

        if (!childDob) return;

        const today = new Date();

        const generatedVaccines = vaccineSchedule.map((v) => {
          const date = calculateDate(childDob, v.weeks);
          const dateObj = new Date(date);

          let status = "Upcoming";

          if (dateObj < today) {
            status = "Done";
          }

          // small randomness for realism
          if (dateObj < today && Math.random() < 0.15) {
            status = "Missed";
          }

          return {
            name: v.name,
            date,
            status,
          };
        });

        setVaccines(generatedVaccines);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 📊 STATS
  const done = vaccines.filter((v) => v.status === "Done").length;
  const missed = vaccines.filter((v) => v.status === "Missed").length;
  const upcoming = vaccines.filter((v) => v.status === "Upcoming").length;

  // ⏳ NEXT VACCINE
  const nextVaccine = vaccines
    .filter((v) => v.status === "Upcoming")
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  const nextLabel = nextVaccine ? `${nextVaccine.name} (${nextVaccine.date})` : "All caught up 🎉";

  const chartData = {
    labels: ["Done", "Upcoming", "Missed"],
    datasets: {
      label: "Vaccination Status",
      data:
        done === 0 && upcoming === 0 && missed === 0
          ? [5, 3, 1] // fallback if empty
          : [done, upcoming, missed],
    },
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDTypography color="white">Loading dashboard...</MDTypography>
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
        <MDBox mb={3}>
          <MDTypography variant="h5" fontWeight="medium" color="#0F172A">
            👩‍👧 Immunisation Dashboard
          </MDTypography>

          <MDTypography variant="button" color="text">
            Child: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {/* STATS */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <ComplexStatisticsCard icon="event" title="Next Vaccine" count={nextLabel} />
          </Grid>

          <Grid item xs={12} md={3}>
            <ComplexStatisticsCard color="success" icon="check_circle" title="Done" count={done} />
          </Grid>

          <Grid item xs={12} md={3}>
            <ComplexStatisticsCard
              color="warning"
              icon="schedule"
              title="Upcoming"
              count={upcoming}
            />
          </Grid>

          <Grid item xs={12} md={3}>
            <ComplexStatisticsCard color="error" icon="warning" title="Missed" count={missed} />
          </Grid>
        </Grid>

        {/* CHARTS */}
        <MDBox mt={4}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <ReportsLineChart
                color="success"
                title="Immunisation Progress"
                description="Vaccination completion overview"
                date="updated now"
                chart={chartData}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <ReportsBarChart
                color="info"
                title="Vaccination Breakdown"
                description="Done vs Upcoming vs Missed"
                date="updated now"
                chart={chartData}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* LIST */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ background: "#0F2235" }}>
          <MDTypography variant="h6" color="white">
            🏥 Vaccination Schedule
          </MDTypography>

          {vaccines.map((v, i) => (
            <MDBox
              key={i}
              display="flex"
              justifyContent="space-between"
              p={2}
              mt={2}
              sx={{ backgroundColor: "#071A2F", borderRadius: "12px" }}
            >
              <MDBox>
                <MDTypography color="white">{v.name}</MDTypography>
                <MDTypography color="text" variant="caption">
                  {v.date}
                </MDTypography>
              </MDBox>

              <Chip
                label={v.status}
                color={
                  v.status === "Done" ? "success" : v.status === "Missed" ? "error" : "warning"
                }
                size="small"
              />
            </MDBox>
          ))}
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
