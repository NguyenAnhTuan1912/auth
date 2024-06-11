import React from "react"

// Import routes
import AuthenticationRoutes from "./routes/AuthenticationRoutes"
import UserRoutes from "./routes/UserRoutes"

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);

  return (
    !isAuthenticated
      ? <AuthenticationRoutes />
      : <UserRoutes />
  )
}

export default App
