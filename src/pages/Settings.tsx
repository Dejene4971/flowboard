import React from 'react';

export function Settings() {
  const [theme, setTheme] = React.useState('light');
  const [notifications, setNotifications] = React.useState(true);
  const [language, setLanguage] = React.useState('en');

  return (
    <div className="settings-page">
      <header className="page-header">
        <h2>Settings</h2>
        <p className="page-subtitle">Manage your preferences</p>
      </header>

      <div className="settings-sections">
        <section className="settings-section" aria-labelledby="appearance-heading">
          <h3 id="appearance-heading">Appearance</h3>
          <div className="setting-row">
            <label htmlFor="theme-select">Theme</label>
            <select
              id="theme-select"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>
        </section>

        <section className="settings-section" aria-labelledby="notifications-heading">
          <h3 id="notifications-heading">Notifications</h3>
          <div className="setting-row">
            <label htmlFor="notifications-toggle">Email notifications</label>
            <input
              id="notifications-toggle"
              type="checkbox"
              checked={notifications}
              onChange={(e) => setNotifications(e.target.checked)}
              role="switch"
              aria-checked={notifications}
            />
          </div>
        </section>

        <section className="settings-section" aria-labelledby="language-heading">
          <h3 id="language-heading">Language</h3>
          <div className="setting-row">
            <label htmlFor="language-select">Display language</label>
            <select
              id="language-select"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
        </section>
      </div>
    </div>
  );
}
