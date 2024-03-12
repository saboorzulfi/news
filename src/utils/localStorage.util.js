
const LocalStorage = {
  getItem: (key) => {
    let value = localStorage.getItem(key) || "";

    if (value === "undefined") value = "";
    return value ? JSON.parse(value) : value;
  },

  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },

};

export default LocalStorage;
