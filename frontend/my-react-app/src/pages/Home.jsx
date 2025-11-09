import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check for login success parameter
    const params = new URLSearchParams(window.location.search);
    const loginStatus = params.get("login");

    if (loginStatus === "success") {
      console.log("✅ Login successful!");
      // Clear parameter from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Fetch user data
    fetchUserData();
  }, []); // Empty dependency array - only run once on mount

  const fetchUserData = async () => {
    try {
      console.log("🔍 Fetching user data...");
      const response = await fetch("http://localhost:3000/auth/user", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("✅ User data received:", data);
        setUser(data.user);
        setError(null);
      } else {
        console.log("❌ User not authenticated, redirecting...");
        // User not authenticated, redirect to landing page
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (error) {
      console.error("❌ Error fetching user data:", error);
      setError("Failed to load user data. Redirecting...");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      console.log("🚪 Logging out...");
      await fetch("http://localhost:3000/auth/logout", {
        method: "GET",
        credentials: "include",
      });
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
      // Still redirect even if logout fails
      navigate("/");
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="loading-container">
        <div className="error-message">
          <h2>⚠️ {error}</h2>
          <button onClick={() => navigate("/")} className="error-btn">
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  // No user state (shouldn't happen, but just in case)
  if (!user) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Main render when user is loaded
  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome, {user?.displayName || user?.username}!</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>

      <section className="user-info">
        <div className="profile-card">
          {user?.avatarUrl && (
            <img
              src={user.avatarUrl}
              alt="Profile"
              className="profile-avatar"
            />
          )}
          <div className="profile-details">
            <h2>{user?.displayName || user?.username}</h2>
            <p className="username">{user?.username}</p>
            {user?.email && <p className="email">{user.email}</p>}
            {user?.profileUrl && (
              <a
                href={user.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="github-link"
              >
                View GitHub Profile
              </a>
            )}
          </div>
        </div>
      </section>

      <section className="dashboard">
        <h2>Your Dashboard</h2>
        <div className="dashboard-content">
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>🔍 Analyze Repositories</h3>
              <p>
                Start analyzing your GitHub repositories to get insights and
                metrics.
              </p>
              <button className="dashboard-btn">Coming Soon</button>
            </div>

            <div className="dashboard-card">
              <h3>📊 View Analytics</h3>
              <p>
                Access detailed analytics and visualization of your codebase.
              </p>
              <button className="dashboard-btn">Coming Soon</button>
            </div>

            <div className="dashboard-card">
              <h3>📘 Documentation</h3>
              <p>Generate AI-powered documentation for your projects.</p>
              <button className="dashboard-btn">Coming Soon</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
