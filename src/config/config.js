import moment from "moment";

export const navbarBrand = "Your News";
export const header = (category) => `News - Top ${category} Headlines`;
export const noFound = "No Results Found";
export const searching = "Searching...";

export const summary = "Source and PublishedAt";
export const newsChannel = (channel) => `Source: ${channel}`;
export const lastUpdate = (published) => `Published at: ${moment(published).format("ddd, DD MMM YYYY HH:mm:ss")}`;

export const API_NEWSAPI_URL = process.env.REACT_APP_NEWSAPI_URL
export const API_NEWAPI_KEY = process.env.REACT_APP_NEWS_API_KEY
