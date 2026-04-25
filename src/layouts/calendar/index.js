import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

function Calendar() {
  const childName = "Ava Ndlovu";

  const events = [
    {
      title: "💉 BCG Vaccine (Done)",
      date: "2026-01-10",
      backgroundColor: "#4caf50",
    },
    {
      title: "⚠️ Polio Vaccine (Missed)",
      date: "2026-02-20",
      backgroundColor: "#f44336",
    },
    {
      title: "📅 DTaP Vaccine (Upcoming)",
      date: "2026-03-10",
      backgroundColor: "#ff9800",
    },
    {
      title: "📅 Hepatitis B (Upcoming)",
      date: "2026-04-15",
      backgroundColor: "#ff9800",
    },
  ];

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        {/* 🏥 HEADER */}
        <MDBox mb={3}>
          <MDTypography variant="h5" fontWeight="medium">
            📅 Immunisation Calendar
          </MDTypography>

          <MDTypography variant="button" color="text">
            Child: <b>{childName}</b> — Health appointment schedule
          </MDTypography>
        </MDBox>

        {/* 🌿 CALENDAR CONTAINER (HEALTH STYLE) */}
        <MDBox
          p={3}
          borderRadius="lg"
          sx={{
            backgroundColor: "#e8f5e9",
            border: "1px solid #c8e6c9",
          }}
        >
          <MDBox
            sx={{
              backgroundColor: "#ffffff",
              borderRadius: "12px",
              p: 2,
              boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            }}
          >
            <FullCalendar
              plugins={[dayGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              height="auto"
              events={events}
            />
          </MDBox>
        </MDBox>

        {/* 📌 LEGEND / HEALTH GUIDE */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#fff8e1" }}>
          <MDTypography variant="h6" fontWeight="medium">
            📌 Health Calendar Guide
          </MDTypography>

          <MDTypography variant="caption" color="text">
            🟢 Green = Completed vaccination 🔴 Red = Missed appointment (needs follow-up) 🟠 Orange
            = Upcoming vaccination (reminder active)
          </MDTypography>

          <MDBox mt={2} display="flex" gap={2}>
            <MDButton variant="gradient" color="success" fullWidth>
              Send Upcoming Reminders
            </MDButton>

            <MDButton variant="outlined" color="error" fullWidth>
              Review Missed Vaccines
            </MDButton>
          </MDBox>
        </MDBox>
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Calendar;
