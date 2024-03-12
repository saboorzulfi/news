// ** React 
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "routes/AppRoutes";

// ** Component
import ErrorBoundary from "@nub/components/ErrorBoundary";

// ** Layout
import NavBar from "layout/NavBar/NavBar";


function App() {
  return (
    <Router>
      <ErrorBoundary>
        <NavBar />
      </ErrorBoundary>
      <ErrorBoundary>
        <AppRoutes />
      </ErrorBoundary>
    </Router>
  );
}

export default App;
