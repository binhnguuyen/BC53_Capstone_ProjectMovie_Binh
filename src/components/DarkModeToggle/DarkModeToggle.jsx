import React from 'react'

function DarkModeToggle({ isDarkMode, toggleDarkMode }) {
  return (
    <div>
      <label>
        <input type="checkbox" checked={isDarkMode} />
        Dark Mode
      </label>
    </div>
  );
}

export default DarkModeToggle