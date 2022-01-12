import Login from "views/auth/Login.js";
import ForgotPassword from "views/auth/ForgotPassword";
import MeditationsTable from "views/meditation/Meditations";
import Meditation from "views/meditation/Meditation";
import AddMeditation from "views/meditation/AddMeditation";
import MoodsTable from "views/mood/Moods";
import SheetsTable from "views/sheet/Sheets";
import AddSheet from "views/sheet/AddSheet";
import Sheet from "views/sheet/Sheet";
import ResetPassword from "views/auth/ResetPassword";
import ChangePassword from "views/auth/ChangePassword";

export const routes = [
  {
    path: "/login",
    name: "Login",
    miniName: "L",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    miniName: "FP",
    component: ForgotPassword,
    layout: "/auth",
  },
  {
    path: "/reset-password/:id",
    name: "Reset Password",
    miniName: "RP",
    component: ResetPassword,
    layout: "/auth",
  },
];

export const sidebarRoutes = [
  {
    path: "/meditations",
    name: "Meditations",
    icon: "ni ni-archive-2 text-green",
    component: MeditationsTable,
    layout: "/admin",
  },
  {
    path: "/moods",
    name: "Moods",
    icon: "ni ni-chart-pie-35 text-info",
    component: MoodsTable,
    layout: "/admin",
  },
  {
    path: "/sheets",
    name: "Suggestions",
    icon: "ni ni-calendar-grid-58 text-red",
    component: SheetsTable,
    layout: "/admin",
  },
  {
    path: "/meditation/:id",
    name: "Meditation",
    component: Meditation,
    layout: "/admin",
  },
  {
    path: "/add-meditation/:id",
    name: "Edit Meditation",
    component: AddMeditation,
    layout: "/admin",
  },
  {
    path: "/add-meditation/",
    name: "Add Meditation",
    component: AddMeditation,
    layout: "/admin",
  },
  {
    path: "/sheet/:id",
    name: "Sheet",
    component: Sheet,
    layout: "/admin",
  },
  {
    path: "/add-sheet/:id",
    name: "Edit Sheet",
    component: AddSheet,
    layout: "/admin",
  },
  {
    path: "/add-sheet/",
    name: "Add Sheet",
    component: AddSheet,
    layout: "/admin",
  },
  {
    path: "/change-password",
    name: "Change Password",
    component: ChangePassword,
    layout: "/admin",
  },
];
