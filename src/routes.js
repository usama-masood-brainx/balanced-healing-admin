import Login from "views/auth/Login.js";
import Register from "views/auth/Register.js";
import MeditationsTable from "views/meditation/Meditations";
import Meditation from "views/meditation/Meditation";
import AddMeditation from "views/meditation/AddMeditation";
import MoodsTable from "views/mood/Moods";
import SheetsTable from "views/sheet/Sheets";
import AddSheet from "views/sheet/AddSheet";
import Sheet from "views/sheet/Sheet";

export const routes = [
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: Register,
        layout: "/auth",
      },
    ],
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
    icon: "ni ni-calendar-grid-58 text-red",
    component: Meditation,
    layout: "/admin",
  },
  {
    path: "/add-meditation/:id",
    name: "Edit Meditation",
    icon: "ni ni-calendar-grid-58 text-red",
    component: AddMeditation,
    layout: "/admin",
  },
  {
    path: "/add-meditation/",
    name: "Add Meditation",
    icon: "ni ni-calendar-grid-58 text-red",
    component: AddMeditation,
    layout: "/admin",
  },
  {
    path: "/sheet/:id",
    name: "Sheet",
    icon: "ni ni-calendar-grid-58 text-red",
    component: Sheet,
    layout: "/admin",
  },
  {
    path: "/add-sheet/:id",
    name: "Edit Sheet",
    icon: "ni ni-calendar-grid-58 text-red",
    component: AddSheet,
    layout: "/admin",
  },
  {
    path: "/add-sheet/",
    name: "Add Sheet",
    icon: "ni ni-calendar-grid-58 text-red",
    component: AddSheet,
    layout: "/admin",
  },
];
