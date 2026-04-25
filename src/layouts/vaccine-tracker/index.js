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
  const childName = "Ava Ndlovu";

  const vaccines = [
    {
      name: "BCG (Tuberculosis Protection)",
      date: "Jan 10",
      status: "Done",
      note: "Administered at birth clinic",
    },
    {
      name: "Polio Dose 1",
      date: "Feb 20",
      status: "Missed",
      note: "Follow-up required",
    },
    {
      name: "DTaP Dose 1",
      date: "Mar 10",
      status: "Upcoming",
      note: "Scheduled immunisation",
    },
    {
      name: "Hepatitis B",
      date: "Apr 15",
      status: "Upcoming",
      note: "Planned vaccination",
    },
  ];

  const getColor = (status) => {
    if (status === "Done") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  const getStatusIcon = (status) => {
    if (status === "Done") return "✅";
    if (status === "Missed") return "⚠️";
    return "⏳";
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* 🏥 HEADER */}
        <MDBox mb={4}>
          <MDTypography variant="h5" fontWeight="medium">
            🏥 Immunisation Care Timeline
          </MDTypography>
          <MDTypography variant="button" color="text">
            Child: <b>{childName}</b> — Full vaccination history & schedule
          </MDTypography>
        </MDBox>

        {/* 🌿 TIMELINE CARD CONTAINER */}
        <MDBox
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
          }}
        >
          {vaccines.map((v, i) => (
            <MDBox key={i} mb={2}>
              {/* CARD */}
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
                {/* LEFT SIDE */}
                <MDBox>
                  <MDTypography variant="button" fontWeight="medium">
                    {getStatusIcon(v.status)} {v.name}
                  </MDTypography>

                  <MDTypography variant="caption" color="text">
                    📅 Scheduled: {v.date}
                  </MDTypography>

                  <MDTypography variant="caption" color="text">
                    📝 {v.note}
                  </MDTypography>
                </MDBox>

                {/* RIGHT SIDE */}
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
                      <MDButton size="small" color="warning" variant="gradient">
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

        {/* 📩 ACTION PANEL */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#fff8e1" }}>
          <MDTypography variant="h6" fontWeight="medium">
            📩 Care Actions
          </MDTypography>

          <MDTypography variant="caption" color="text">
            Manage reminders and follow-ups for your child’s immunisation schedule.
          </MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
            <MDButton variant="gradient" color="success" fullWidth>
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
