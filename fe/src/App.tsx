import React from "react"

// Import routes
import AuthenticationRoutes from "./routes/AuthenticationRoutes"
import UserRoutes from "./routes/UserRoutes"

// Import themes
import { NormalTheme } from "./themes/normal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  React.useEffect(function() {
    NormalTheme.enable("light");
  }, []);

  return (
    !isAuthenticated
      ? <AuthenticationRoutes />
      : <UserRoutes />
  )
}

export default App
