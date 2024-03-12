import PersonalNews from "@nub/pages/PersonalNews/PersonalNews";
import Home from "@nub/pages/Home/Home";
import Search from "@nub/pages/Search/Search";
import Settings from "@nub/pages/Settings/Settings";
export { default } from "./AppRoutes";

export const public_routes = [
  { path: "/", element:<Home/> },
  { path: "/news-feed", element:<PersonalNews/> },
  { path: "/search", element:<Search/> },
  { path: "/settings", element:<Settings/> },
];
