export const customIcons = {
  play: <i className="fa fa-play playIcon"></i>,
  pause: <i className="fa fa-pause playIcon"></i>,
};

export const defaultMeditation = {
  title: "",
  date: "",
  description: "",
  audio: "",
  image: "",
};

export const defaultSheet = {
  title: "",
  detail: "",
};

export const updateToast = {
  className: "updateToast",
  iconTheme: {
    primary: "white",
    secondary: "#3a3a73",
  },
};

export const successToast = {
  className: "successToast",
  iconTheme: {
    primary: "white",
    secondary: "#76d89c",
  },
};

export const errorToast = {
  className: "errorToast",
  iconTheme: {
    primary: "white",
    secondary: "red",
  },
};

export const meditationDeleteMessage = `Are you sure you want to delete this Meditation?`;

export const moodDeleteMessage = `Are you sure you want to delete this Mood?`;

export const sheetDeleteMessage = `Are you sure you want to delete this Sheet?<br/> This sheet might be linked with Moods`;
