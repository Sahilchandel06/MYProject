import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Landingpage.css";

const Landingpage = () => {
  const navigate = useNavigate();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Check for authentication status and errors on component mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const error = params.get("error");

    if (error === "authentication_failed") {
      setShowError(true);
      setErrorMessage("Unable to authenticate with GitHub. Please try again.");
      // Clear error from URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }

    // Check if user is already authenticated
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch("http://localhost:3000/auth/status", {
        credentials: "include",
      });
      const data = await response.json();

      if (data.authenticated) {
        navigate("/home");
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
    }
  };

  const handleGitHubLogin = () => {
    // Redirect to backend GitHub OAuth route
    window.location.href = "http://localhost:3000/auth/github";
  };

  const closeErrorPopup = () => {
    setShowError(false);
  };

  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="landing-container">
      {/* Error Popup */}
      {showError && (
        <div className="error-popup-overlay">
          <div className="error-popup">
            <div className="error-popup-header">
              <span className="error-icon">❌</span>
              <h3>Login Unsuccessful</h3>
            </div>
            <p>{errorMessage}</p>
            <button className="error-close-btn" onClick={closeErrorPopup}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Terminal-style Navigation */}
      <nav className="navbar">
        <div className="nav-content">
          <div className="logo">
            <span className="terminal-prefix">$</span>
            <span className="logo-text">websitename</span>
          </div>
          <ul className="nav-menu">
            <li>
              <a href="#features" onClick={() => scrollToSection("features")}>
                features
              </a>
            </li>
            <li>
              <a href="#workflow" onClick={() => scrollToSection("workflow")}>
                workflow
              </a>
            </li>
            {/* <li>
              <a href="#about" onClick={() => scrollToSection("about")}>
                about
              </a>
            </li> */}
            <li>
              <button className="github-signin-btn" onClick={handleGitHubLogin}>
                <svg
                  className="github-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign in with GitHub
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section with Terminal Aesthetics */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="terminal-controls">
                  <span className="control close"></span>
                  <span className="control minimize"></span>
                  <span className="control maximize"></span>
                </div>
                <span className="terminal-title">~/codesage</span>
              </div>
              <div className="terminal-body">
                <div className="terminal-line">
                  <span className="prompt">user@codesage:~$</span>
                  <span className="command">./analyze --repo=your-project</span>
                </div>
                <div className="terminal-line output">
                  <span className="success">
                    ✅ Repository analyzed successfully
                  </span>
                </div>
                <div className="terminal-line output">
                  <span className="info">🧠 Generating insights...</span>
                </div>
                <div className="terminal-line">
                  <span className="prompt">
                    📊 Building dependency graph...
                  </span>
                  <span className="cursor">📘 Creating README...</span>
                </div>
              </div>
            </div>

            <h1 className="hero-title">
              <span className="code-bracket"></span>
              Codebase Analysis
              <span className="code-bracket"></span>
            </h1>
            <p className="hero-subtitle">
              <span className="comment">
                Transform any repository into actionable insights
              </span>
              <br />
            </p>

            <div className="hero-buttons">
              <button className="primary-btn" onClick={handleGitHubLogin}>
                <svg
                  className="github-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Sign in with GitHub
              </button>
            </div>
          </div>

          <div className="hero-visual">
            <div className="code-editor">
              <div className="editor-header">
                <div className="editor-tabs">
                  <div className="tab active">analysis.json</div>
                  <div className="tab">insights.md</div>
                  <div className="tab">refactor.js</div>
                </div>
              </div>
              <div className="editor-content">
                <div className="line-numbers">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                </div>
                <div className="code-content">
                  <div className="code-line">
                    <span className="brace">{"{"}</span>
                  </div>
                  <div className="code-line">
                    <span className="key">&nbsp;&nbsp;"complexity"</span>
                    <span className="colon">:</span>{" "}
                    <span className="value">"low"</span>
                    <span className="comma">,</span>
                  </div>
                  <div className="code-line">
                    <span className="key">&nbsp;&nbsp;"dependencies"</span>
                    <span className="colon">:</span>{" "}
                    <span className="number">47</span>
                    <span className="comma">,</span>
                  </div>
                  <div className="code-line">
                    <span className="key">&nbsp;&nbsp;"coverage"</span>
                    <span className="colon">:</span>{" "}
                    <span className="number">94.2</span>
                    <span className="comma">,</span>
                  </div>
                  <div className="code-line">
                    <span className="key">&nbsp;&nbsp;"suggestions"</span>
                    <span className="colon">:</span>{" "}
                    <span className="brace">[</span>
                  </div>
                  <div className="code-line">
                    <span className="string">
                      &nbsp;&nbsp;&nbsp;&nbsp;"Extract duplicate logic"
                    </span>
                  </div>
                  <div className="code-line">
                    <span className="brace">&nbsp;&nbsp;]</span>
                  </div>
                  <div className="code-line">
                    <span className="brace">{"}"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <br />
              Analyze. Visualize. Improve.
            </h2>
            <p className="section-subtitle">
              Analyze, visualize, and improve your codebase — no configs, just
              results.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🧠</div>
              </div>
              <h3>Deep Code Analysis</h3>
              <p>
                Extract LOC, function counts, and complexity metrics with
                AI-powered insights to understand your codebase and improve
                quality.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🔗</div>
              </div>
              <h3>Interactive Dependency Graph</h3>
              <p>
                Visualize your project's file and module structure with
                interactive graphs that reveal dependencies, bottlenecks, and
                circular links.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📘</div>
              </div>
              <h3>AI Documentation Generator</h3>
              <p>
                Automatically generate comprehensive documentation, README
                files, and module summaries using AI — exportable in Markdown or
                PDF.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">🧹</div>
              </div>
              <h3>Refactoring Engine</h3>
              <p>
                Receive smart AI suggestions to refactor complex functions,
                remove duplicate logic, and enhance code readability and
                performance.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">📊</div>
              </div>
              <h3>Code Quality Dashboard</h3>
              <p>
                Track real-time metrics like complexity, LOC, and comment
                density with an interactive dashboard highlighting risky or
                high-impact files.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-header">
                <div className="feature-icon">👥</div>
              </div>
              <h3>GitHub Repo Visualization (Bonus Feature)</h3>
              <p>
                Visualize any public GitHub repository's file structure and
                contributors with an interactive, color-coded graph for quick
                understanding.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section id="workflow" className="workflow">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">
              <span className="section-comment"> How It Works</span>
              <br />
              From Repository to Insights in Minutes
            </h2>
          </div>

          <div className="workflow-container">
            <div className="workflow-step">
              <div className="step-number">01</div>
              <div className="step-content">
                <h3>Connect & Clone</h3>
                <div className="step-code">
                  <code>
                    Authenticate with GitHub and select any repository. Our
                    system securely clones and analyzes your codebase.
                  </code>
                </div>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">02</div>
              <div className="step-content">
                <h3>Processing</h3>
                <div className="step-code">
                  <code>
                    Advanced AI models parse your code, extract patterns, and
                    generate comprehensive analysis reports.
                  </code>
                </div>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">03</div>
              <div className="step-content">
                <h3>Interactive Results</h3>
                <div className="step-code">
                  <code>
                    {" "}
                    Explore your codebase through interactive visualizations,
                    metrics, and actionable recommendations.
                  </code>
                </div>
              </div>
            </div>

            <div className="workflow-step">
              <div className="step-number">04</div>
              <div className="step-content">
                <h3>Export & Share</h3>
                <div className="step-code">
                  <code>
                    {" "}
                    Generate documentation, share insights with your team, and
                    integrate reports into your development workflow.
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>
                <span className="terminal-prefix">$</span>
                website name
              </h3>
              <p>
                Codebase analysis for the modern developer. Built for
                developers.
              </p>
              <div className="social-links">
                <a
                  href="https://github.com/Sahilchandel06/MYProject"
                  className="social-link"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="footer-section">
              <h4>Features</h4>
              <ul>
                <li>Code Analysis</li>
                <li>Dependency Graphs</li>
                <li>AI Documentation</li>
                <li>Quality Metrics</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landingpage;
