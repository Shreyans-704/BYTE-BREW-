import { useState } from "react";
import GlobalStyles from "./components/GlobalStyles";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PageHome from "./pages/Home";
import PageAbout from "./pages/About";
import PageMenu from "./pages/Menu";
import PageStory from "./pages/Story";
import PageCommunity from "./pages/Community";
import PageContact from "./pages/Contact";
import PageOrderWaitGame from "./pages/OrderWaitGame";

/* ─── ROUTER / APP SHELL ──────────────────────────────────── */
const PAGES = {
  Home: PageHome,
  About: PageAbout,
  Menu: PageMenu,
  Story: PageStory,
  Community: PageCommunity,
  Contact: PageContact,
  Game: PageOrderWaitGame,
};

export default function App() {
  const [page, setPage] = useState("Home");
  const navigate = (p) => { setPage(p); window.scrollTo(0, 0); };
  const Page = PAGES[page] || PageHome;

  return (
    <div style={{ minHeight: "100vh", fontFamily: "Georgia, serif" }}>
      <GlobalStyles />
      <Navbar page={page} navigate={navigate} />
      <main>
        <Page navigate={navigate} />
      </main>
      <Footer navigate={navigate} />
    </div>
  );
}
