import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Peta from "./pages/Peta";
import Statistik from "./pages/Statistik";
import Login from "./pages/Login";

const MatomoTracker = () => {
  const location = useLocation();

  useEffect(() => {
    const _paq = (window._paq = window._paq || []);
    _paq.push(["setDocumentTitle", document.title]);
    _paq.push(["setCookieDomain", "*.localhost"]);
    _paq.push(["setDomains", ["*.localhost"]]);
    _paq.push(["trackPageView"]);
    _paq.push(["enableLinkTracking"]);

    if (!window._matomoScriptInjected) {
      const u = "//localhost/matomo/";
      _paq.push(["setTrackerUrl", u + "matomo.php"]);
      _paq.push(["setSiteId", "1"]);

      const d = document;
      const g = d.createElement("script");
      const s = d.getElementsByTagName("script")[0];
      g.type = "text/javascript";
      g.async = true;
      g.src = u + "matomo.js";
      s.parentNode.insertBefore(g, s);

      window._matomoScriptInjected = true;
    }
  }, []);

  useEffect(() => {
    if (window._paq) {
      window._paq.push(["setCustomUrl", window.location.href]);
      window._paq.push(["setDocumentTitle", document.title]);
      window._paq.push(["trackPageView"]);
    }
  }, [location]);

  return null;
};

export default function App() {
  return (
    <Router>
      <MatomoTracker />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/peta" element={<Peta />} />
        <Route path="/statistik" element={<Statistik />} />
      </Routes>
    </Router>
  );
}
