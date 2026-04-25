// Material Dashboard 2 React layouts
import Dashboard from "layouts/dashboard";
import VaccineTracker from "layouts/vaccine-tracker";
import ChildProfile from "layouts/child-profile";
import Reminders from "layouts/reminders";
import Calendar from "layouts/calendar";
import Settings from "layouts/settings";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">home</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },

  {
    type: "collapse",
    name: "Vaccine Tracker",
    key: "vaccine-tracker",
    icon: <Icon fontSize="small">vaccines</Icon>,
    route: "/vaccines",
    component: <VaccineTracker />,
  },

  {
    type: "collapse",
    name: "Child Profile",
    key: "child-profile",
    icon: <Icon fontSize="small">child_care</Icon>,
    route: "/child-profile",
    component: <ChildProfile />,
  },

  {
    type: "collapse",
    name: "Reminders",
    key: "reminders",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/reminders",
    component: <Reminders />,
  },

  {
    type: "collapse",
    name: "Calendar",
    key: "calendar",
    icon: <Icon fontSize="small">event</Icon>,
    route: "/calendar",
    component: <Calendar />,
  },

  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
];

export default routes;
