<<<<<<< HEAD
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase";

import { doc, getDoc, collection, getDocs, updateDoc } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
=======
import { useEffect, useMemo, useState } from "react";
import { auth, db } from "../../firebase";

import { collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";

import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

<<<<<<< HEAD
// 🧮 SAME DATE ENGINE AS VaccineTracker
const calculateDate = (dob, weeks) => {
  if (!dob) return "Not set";

  const base = new Date(dob);
  const result = new Date(base);

  result.setDate(base.getDate() + weeks * 7);

  return result.toISOString().split("T")[0];
};

function Reminders() {
  const [childName, setChildName] = useState("");
  const [childDob, setChildDob] = useState("");
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH (MATCHES VaccineTracker EXACTLY)
  const fetchData = async () => {
    try {
=======
const REMINDER_DAYS_BEFORE = 2;
const REMINDER_API_URL = process.env.REACT_APP_REMINDER_API_URL || "/api/reminders";

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function addWeeks(dob, weeks) {
  if (!dob) return null;

  const base = new Date(`${dob}T00:00:00`);
  return addDays(base, weeks * 7);
}

function startOfToday() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return today;
}

function getReminderState(status, dueDate) {
  if (status === "Done" || status === "Completed") {
    return { label: "Completed", color: "success", priority: 4 };
  }

  if (status === "Missed") {
    return { label: "Missed", color: "error", priority: 0 };
  }

  if (!dueDate) {
    return { label: "Date not set", color: "default", priority: 5 };
  }

  const today = startOfToday();
  const due = new Date(dueDate);
  due.setHours(0, 0, 0, 0);

  const daysUntilDue = Math.ceil((due - today) / (24 * 60 * 60 * 1000));

  if (daysUntilDue < 0) {
    return { label: "Overdue", color: "error", priority: 0 };
  }

  if (daysUntilDue === 0) {
    return { label: "Due today", color: "error", priority: 1 };
  }

  if (daysUntilDue <= REMINDER_DAYS_BEFORE) {
    return {
      label: `Due in ${daysUntilDue} day${daysUntilDue === 1 ? "" : "s"}`,
      color: "warning",
      priority: 2,
    };
  }

  return { label: "Upcoming", color: "info", priority: 3 };
}

function Reminders() {
  const [childName, setChildName] = useState("");
  const [parentEmail, setParentEmail] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sendingChannel, setSendingChannel] = useState("");
  const [message, setMessage] = useState("");

  const fetchData = async () => {
    try {
      setLoading(true);
      setMessage("");

>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();
<<<<<<< HEAD

      const dob = data.child?.childDob || null;

      setChildName(data.child?.childName || "Unnamed Child");
      setChildDob(dob);
=======
      const dob = data.child?.childDob || null;

      setChildName(data.child?.childName || "Unnamed Child");
      setParentEmail(data.parent?.email || "");
      setParentPhone(data.parent?.phone || "");
      setSmsEnabled(data.settings?.sms ?? true);
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567

      const vaccinesRef = collection(db, "users", user.uid, "vaccines");
      const vaccinesSnap = await getDocs(vaccinesRef);

      const mapped = vaccinesSnap.docs.map((docSnap) => {
<<<<<<< HEAD
        const v = docSnap.data();

        return {
          id: docSnap.id,
          name: v.name,
          status: v.status || "Upcoming",
          note: v.note || "",
          offsetWeeks: v.dateOffsetWeeks || 0,

          // 🔥 SAME CALCULATION RULE AS TRACKER
          date: calculateDate(dob, v.dateOffsetWeeks || 0),
        };
      });

      setReminders(mapped);
    } catch (err) {
      console.error(err);
=======
        const vaccine = docSnap.data();
        const dueDateObject = addWeeks(dob, vaccine.dateOffsetWeeks || 0);
        const dueDate = dueDateObject ? formatDate(dueDateObject) : null;
        const reminderDateObject = dueDateObject
          ? addDays(dueDateObject, -REMINDER_DAYS_BEFORE)
          : null;
        const reminderDate = reminderDateObject ? formatDate(reminderDateObject) : null;
        const state = getReminderState(vaccine.status || "Upcoming", dueDate);

        return {
          id: docSnap.id,
          name: vaccine.name || "Unknown vaccine",
          note: vaccine.note || "",
          status: vaccine.status || "Upcoming",
          offsetWeeks: vaccine.dateOffsetWeeks || 0,
          dueDate,
          reminderDate,
          state,
        };
      });

      mapped.sort((a, b) => {
        if (a.state.priority !== b.state.priority) {
          return a.state.priority - b.state.priority;
        }

        return new Date(a.dueDate || "9999-12-31") - new Date(b.dueDate || "9999-12-31");
      });

      setReminders(mapped);
    } catch (error) {
      console.error(error);
      setMessage("Could not load reminders. Please try again.");
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

<<<<<<< HEAD
  // 🔁 UPDATE STATUS (SYNC WITH VaccineTracker)
=======
  const activeReminders = useMemo(
    () =>
      reminders.filter((reminder) =>
        ["Overdue", "Due today", "Due in 1 day", "Due in 2 days", "Missed"].includes(
          reminder.state.label
        )
      ),
    [reminders]
  );

>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
  const updateStatus = async (id, newStatus) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

<<<<<<< HEAD
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) return;

      const data = userSnap.data();

      const updatedVaccines = (data.vaccines || []).map((v) => {
        if (v.name === id) {
          return { ...v, status: newStatus };
        }
        return v;
      });

      await updateDoc(userRef, {
        vaccines: updatedVaccines,
      });

      fetchData(); // refresh
    } catch (error) {
      console.error(error);
    }
  };

  const getColor = (status) => {
    if (status === "Done") return "success";
    if (status === "Missed") return "error";
    return "warning";
  };

  const getIcon = (status) => {
    if (status === "Done") return "✅";
    if (status === "Missed") return "⚠️";
    return "⏳";
  };

=======
      await updateDoc(doc(db, "users", user.uid, "vaccines", id), {
        status: newStatus,
        updatedAt: new Date(),
      });

      setMessage(`Reminder marked as ${newStatus}.`);
      fetchData();
    } catch (error) {
      console.error(error);
      setMessage("Could not update reminder status. Please try again.");
    }
  };

  const sendBrowserNotification = async () => {
    if (!("Notification" in window)) {
      setMessage("This browser does not support desktop notifications.");
      return;
    }

    const permission =
      Notification.permission === "granted" ? "granted" : await Notification.requestPermission();

    if (permission !== "granted") {
      setMessage("Notification permission was not granted.");
      return;
    }

    if (activeReminders.length === 0) {
      setMessage("There are no active reminders to send right now.");
      return;
    }

    const firstReminder = activeReminders[0];

    new Notification("VaxTrack reminder", {
      body: `${firstReminder.name} is ${firstReminder.state.label.toLowerCase()} for ${childName}.`,
    });

    setMessage("Browser reminder sent.");
  };

  const sendExternalReminder = async (channel) => {
    try {
      if (activeReminders.length === 0) {
        setMessage("There are no active reminders to send right now.");
        return;
      }

      if (channel === "email" && !parentEmail) {
        setMessage("Parent email is missing. Add it in Settings or registration details.");
        return;
      }

      if (["sms", "whatsapp"].includes(channel) && !parentPhone) {
        setMessage("Parent phone number is missing. Add it in Settings or registration details.");
        return;
      }

      if (channel === "sms" && !smsEnabled) {
        setMessage("SMS notifications are turned off in Settings.");
        return;
      }

      setSendingChannel(channel);
      setMessage("");

      const response = await fetch(REMINDER_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel,
          childName,
          recipient: {
            email: parentEmail,
            phone: parentPhone,
          },
          reminders: activeReminders.map((reminder) => ({
            name: reminder.name,
            dueDate: reminder.dueDate,
            reminderDate: reminder.reminderDate,
            state: reminder.state.label,
          })),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Could not send reminder.");
      }

      setMessage(`Sent ${data.sent} reminder${data.sent === 1 ? "" : "s"} by ${channel}.`);
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Could not send reminder. Please try again.");
    } finally {
      setSendingChannel("");
    }
  };

  const completed = reminders.filter((reminder) => reminder.state.label === "Completed").length;
  const overdue = reminders.filter((reminder) => reminder.state.label === "Overdue").length;
  const dueSoon = activeReminders.length;

>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox py={3}>
<<<<<<< HEAD
        <MDBox mb={4}>
          <MDTypography variant="h5">🏥 Reminder Center</MDTypography>
          <MDTypography variant="button">
            Child: <b>{childName}</b>
          </MDTypography>
        </MDBox>

        {loading ? (
          <MDTypography>Loading...</MDTypography>
        ) : (
          <MDBox p={3} borderRadius="lg" sx={{ backgroundColor: "#0F2235" }}>
            {reminders.map((r) => (
              <Grid
                container
                key={r.id}
                spacing={2}
                sx={{
                  backgroundColor: "#071A2F",
                  p: 2,
                  mb: 1,
                  borderRadius: "12px",
                  alignItems: "center",
                }}
              >
                {/* Vaccine */}
                <Grid item xs={4}>
                  <MDTypography color="white">
                    {getIcon(r.status)} {r.name}
                  </MDTypography>
                  <MDTypography color="text" variant="caption">
                    {r.note}
                  </MDTypography>
                </Grid>

                {/* Date */}
                <Grid item xs={2}>
                  <MDTypography color="text">📅 {r.date}</MDTypography>
                </Grid>

                {/* Status */}
                <Grid item xs={3}>
                  <Chip label={r.status} color={getColor(r.status)} size="small" />
                </Grid>

                {/* Actions */}
                <Grid item xs={3}>
                  <MDButton
                    size="small"
                    color="success"
                    variant="outlined"
                    onClick={() => updateStatus(r.id, "Done")}
                    sx={{ mr: 1 }}
                  >
                    Done
                  </MDButton>

                  <MDButton
                    size="small"
                    color="error"
                    variant="outlined"
                    onClick={() => updateStatus(r.id, "Missed")}
                  >
                    Missed
                  </MDButton>
                </Grid>
              </Grid>
            ))}
          </MDBox>
=======
        <MDBox mb={3}>
          <MDTypography variant="h5" fontWeight="medium" color="#0F172A">
            Reminder Center
          </MDTypography>
          <MDTypography variant="button" color="text">
            Child: <b>{childName || "No child selected"}</b>
          </MDTypography>
        </MDBox>

        {message && (
          <MDBox mb={2}>
            <Alert severity={message.includes("Could not") ? "error" : "info"}>{message}</Alert>
          </MDBox>
        )}

        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={4}>
            <MDBox p={2} borderRadius="lg" sx={{ backgroundColor: "#E8F5E9" }}>
              <MDTypography variant="h4" color="success">
                {completed}
              </MDTypography>
              <MDTypography variant="button" color="text">
                Completed vaccines
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MDBox p={2} borderRadius="lg" sx={{ backgroundColor: "#FFF8E1" }}>
              <MDTypography variant="h4" color="warning">
                {dueSoon}
              </MDTypography>
              <MDTypography variant="button" color="text">
                Active reminders
              </MDTypography>
            </MDBox>
          </Grid>

          <Grid item xs={12} md={4}>
            <MDBox p={2} borderRadius="lg" sx={{ backgroundColor: "#FFEBEE" }}>
              <MDTypography variant="h4" color="error">
                {overdue}
              </MDTypography>
              <MDTypography variant="button" color="text">
                Overdue vaccines
              </MDTypography>
            </MDBox>
          </Grid>
        </Grid>

        <MDBox mb={3} display="flex" gap={2}>
          <MDButton
            variant="gradient"
            color="success"
            onClick={() => sendExternalReminder("email")}
            disabled={sendingChannel !== ""}
          >
            {sendingChannel === "email" ? "Sending..." : "Send Email"}
          </MDButton>
          <MDButton
            variant="gradient"
            color="warning"
            onClick={() => sendExternalReminder("whatsapp")}
            disabled={sendingChannel !== ""}
          >
            {sendingChannel === "whatsapp" ? "Sending..." : "Send WhatsApp"}
          </MDButton>
          <MDButton
            variant="gradient"
            color="dark"
            onClick={() => sendExternalReminder("sms")}
            disabled={sendingChannel !== "" || !smsEnabled}
          >
            {sendingChannel === "sms" ? "Sending..." : "Send SMS"}
          </MDButton>
          <MDButton variant="gradient" color="info" onClick={sendBrowserNotification}>
            Send Browser Reminder
          </MDButton>
          <MDButton variant="outlined" color="info" onClick={fetchData}>
            Refresh
          </MDButton>
        </MDBox>

        {loading ? (
          <MDTypography>Loading reminders...</MDTypography>
        ) : (
          <Stack spacing={2}>
            {reminders.length === 0 && <Alert severity="info">No vaccine reminders found.</Alert>}

            {reminders.map((reminder) => (
              <MDBox
                key={reminder.id}
                p={2}
                borderRadius="lg"
                sx={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E2E8F0",
                  boxShadow: "0 2px 8px rgba(15,23,42,0.06)",
                }}
              >
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12} md={4}>
                    <MDTypography variant="button" fontWeight="medium" color="dark">
                      {reminder.name}
                    </MDTypography>
                    {reminder.note && (
                      <MDTypography variant="caption" display="block" color="text">
                        {reminder.note}
                      </MDTypography>
                    )}
                  </Grid>

                  <Grid item xs={12} md={3}>
                    <MDTypography variant="caption" display="block" color="text">
                      Reminder date
                    </MDTypography>
                    <MDTypography variant="button" color="dark">
                      {reminder.reminderDate || "Not set"}
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} md={2}>
                    <MDTypography variant="caption" display="block" color="text">
                      Due date
                    </MDTypography>
                    <MDTypography variant="button" color="dark">
                      {reminder.dueDate || "Not set"}
                    </MDTypography>
                  </Grid>

                  <Grid item xs={12} md={1.5}>
                    <Chip label={reminder.state.label} color={reminder.state.color} size="small" />
                  </Grid>

                  <Grid item xs={12} md={1.5}>
                    <MDBox display="flex" gap={1}>
                      <MDButton
                        size="small"
                        color="success"
                        variant="outlined"
                        onClick={() => updateStatus(reminder.id, "Done")}
                      >
                        Done
                      </MDButton>
                      <MDButton
                        size="small"
                        color="error"
                        variant="outlined"
                        onClick={() => updateStatus(reminder.id, "Missed")}
                      >
                        Missed
                      </MDButton>
                    </MDBox>
                  </Grid>
                </Grid>
              </MDBox>
            ))}
          </Stack>
>>>>>>> 1cd81a0755fdf6a3d80d14caf8a73d39d1cde567
        )}
      </MDBox>

      <Footer />
    </DashboardLayout>
  );
}

export default Reminders;
