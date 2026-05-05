import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

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
  const [loading, setLoading] = useState(true);

  // 👤 Parent details
  const [parentName, setParentName] = useState("");
  const [phone, setPhone] = useState("");

  // 🔔 Settings
  const [reminder2Days, setReminder2Days] = useState(true);
  const [sameDay, setSameDay] = useState(false);
  const [missedNotify, setMissedNotify] = useState(true);

  const [sms, setSms] = useState(true);
  const [inApp, setInApp] = useState(true);

  // 🔥 FETCH FROM FIREBASE
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          setParentName(data?.parent?.parentName || "");
          setPhone(data?.parent?.phone || "");

          setReminder2Days(data?.settings?.reminder2Days ?? true);
          setSameDay(data?.settings?.sameDay ?? false);
          setMissedNotify(data?.settings?.missedNotify ?? true);

          setSms(data?.settings?.sms ?? true);
          setInApp(data?.settings?.inApp ?? true);
        }
      } catch (err) {
        console.error("Settings fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // 💾 SAVE SETTINGS
  const saveSettings = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      await setDoc(
        doc(db, "users", user.uid),
        {
          parent: {
            parentName,
            phone,
          },
          settings: {
            reminder2Days,
            sameDay,
            missedNotify,
            sms,
            inApp,
          },
        },
        { merge: true }
      );

      alert("✅ Settings saved successfully!");
    } catch (err) {
      console.error("Save error:", err);
      alert("❌ Failed to save settings");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <DashboardNavbar />
        <MDBox p={3}>
          <MDTypography>Loading settings...</MDTypography>
        </MDBox>
        <Footer />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
        <MDTypography variant="h5" fontWeight="medium">
          ⚙️ Care Settings & Preferences
        </MDTypography>

        {/* 👩 PARENT */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#e8f5e9" }}>
          <MDTypography variant="h6" mb={2}>
            👩 Parent Contact Details
          </MDTypography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Parent Name"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Grid>
          </Grid>
        </MDBox>

        {/* 📩 REMINDERS */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#f0f7f4" }}>
          <MDTypography variant="h6" mb={2}>
            📩 Reminder Preferences
          </MDTypography>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              2 Days Before Reminder
            </Grid>
            <Grid item xs={4}>
              <Switch checked={reminder2Days} onChange={() => setReminder2Days(!reminder2Days)} />
            </Grid>

            <Grid item xs={8}>
              Same Day Reminder
            </Grid>
            <Grid item xs={4}>
              <Switch checked={sameDay} onChange={() => setSameDay(!sameDay)} />
            </Grid>

            <Grid item xs={8}>
              Missed Vaccines Alert
            </Grid>
            <Grid item xs={4}>
              <Switch checked={missedNotify} onChange={() => setMissedNotify(!missedNotify)} />
            </Grid>
          </Grid>
        </MDBox>

        {/* 🔔 NOTIFICATIONS */}
        <MDBox mt={3} p={3} borderRadius="lg" sx={{ backgroundColor: "#fff8e1" }}>
          <MDTypography variant="h6" mb={2}>
            🔔 Notification Settings
          </MDTypography>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              SMS Notifications
            </Grid>
            <Grid item xs={4}>
              <Switch checked={sms} onChange={() => setSms(!sms)} />
            </Grid>

            <Grid item xs={8}>
              In-App Alerts
            </Grid>
            <Grid item xs={4}>
              <Switch checked={inApp} onChange={() => setInApp(!inApp)} />
            </Grid>
          </Grid>
        </MDBox>

        {/* 💾 SAVE */}
        <MDBox mt={3} display="flex" gap={2}>
          <MDButton variant="gradient" color="success" fullWidth onClick={saveSettings}>
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
