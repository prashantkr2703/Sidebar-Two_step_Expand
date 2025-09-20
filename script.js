const sidebar = document.querySelector('.sidebar');
const expandBtn = document.getElementById('expand-btn');
const collapseBtn = document.getElementById('collapse-btn');
const panelTitle = document.getElementById('panel-title');
const panelContent = document.getElementById('panel-content');


// Panel content for each section (icon+text for expanded, icon-only for collapsed)
const panelTemplates = {
  Dashboard: {
    expanded: `
      <div class="search-box">
        <input type="text" placeholder="Search...">
      </div>
      <div class="menu-group">
        <h4>Dashboard Types</h4>
        <div class="menu-item active"><i class="fa-solid fa-table-cells-large"></i><span>Overview</span></div>
        <div class="menu-item dropdown"><i class="fa-solid fa-briefcase"></i><span>Executive Summary</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Revenue Overview</div>
          <div class="menu-item">Key Performance Indicators</div>
          <div class="menu-item">Strategic Goals Progress</div>
          <div class="menu-item">Department Highlights</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-chart-line"></i><span>Operations Dashboard</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Project Timeline</div>
          <div class="menu-item">Resource Allocation</div>
          <div class="menu-item">Team Performance</div>
          <div class="menu-item">Capacity Planning</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-sack-dollar"></i><span>Financial Dashboard</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Budget</div>
          <div class="menu-item">Expenses</div>
        </div>
      </div>
      <div class="menu-group">
        <h4>Report Summaries</h4>
        <div class="menu-item dropdown"><i class="fa-solid fa-calendar-week"></i><span>Weekly Reports</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Week 1</div>
          <div class="menu-item">Week 2</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-star"></i><span>Monthly Insights</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">January</div>
          <div class="menu-item">February</div>
        </div>
      </div>
    `,
    collapsed: '' // No text, handled by icon-only sidebar
  },
  Tasks: {
    expanded: `
      <div class="search-box">
        <input type="text" placeholder="Search...">
      </div>
      <div class="menu-group">
        <h4>Quick Actions</h4>
        <div class="menu-item"><i class="fa-solid fa-plus"></i><span>New task</span></div>
        <div class="menu-item"><i class="fa-solid fa-filter"></i><span>Filter tasks</span></div>
      </div>
      <div class="menu-group">
        <h4>My Tasks</h4>
        <div class="menu-item dropdown"><i class="fa-regular fa-clock"></i><span>Due today</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Item 1</div>
          <div class="menu-item">Item 2</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-moon"></i><span>In progress</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Item 1</div>
          <div class="menu-item">Item 2</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-check"></i><span>Completed</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Item 1</div>
          <div class="menu-item">Item 2</div>
        </div>
      </div>
      <div class="menu-group">
        <h4>Other</h4>
        <div class="menu-item dropdown"><i class="fa-solid fa-flag"></i><span>Priority tasks</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Item 1</div>
        </div>
        <div class="menu-item dropdown"><i class="fa-solid fa-box-archive"></i><span>Archived</span><span style="margin-left:auto"><i class="fa-solid fa-chevron-down"></i></span></div>
        <div class="submenu">
          <div class="menu-item">Item 1</div>
        </div>
      </div>
    `,
    collapsed: ''
  },
  Mail: {
    expanded: `
      <div class="search-box">
        <input type="text" placeholder="Search mail...">
      </div>
      <div class="mail-list-flat" style="margin-top: 24px;">
        <div class="mail-list-item"><i class="fa-solid fa-inbox"></i><span>Inbox</span></div>
        <div class="mail-list-item"><i class="fa-solid fa-paper-plane"></i><span>Sent</span></div>
        <div class="mail-list-item"><i class="fa-solid fa-star"></i><span>Starred</span></div>
        <div class="mail-list-item"><i class="fa-solid fa-trash"></i><span>Trash</span></div>
        <div class="mail-list-labels-header">Labels</div>
        <div class="mail-list-item"><i class="fa-solid fa-tag"></i><span>Work</span></div>
        <div class="mail-list-item"><i class="fa-solid fa-tag"></i><span>Personal</span></div>
      </div>
    `,
    collapsed: ''
  }
};


let currentSection = 'Dashboard';


// Icon sets for icon-only panel for each section
const iconOnlyIcons = {
  Dashboard: [
    'fa-table-cells-large',
    'fa-briefcase',
    'fa-chart-line',
    'fa-sack-dollar',
    'fa-calendar-week',
    'fa-star'
  ],
  Tasks: [
    'fa-plus',
    'fa-filter',
    'fa-clock',
    'fa-moon',
    'fa-check',
    'fa-flag',
    'fa-box-archive'
  ],
  Mail: [
    'fa-inbox',
    'fa-paper-plane',
    'fa-star',
    'fa-trash',
    'fa-tag',
    'fa-tag'
  ]
};

function updateDetailIcons(section) {
  const detailIconsDiv = document.querySelector('.detail-icons');
  if (!detailIconsDiv) return;
  const icons = iconOnlyIcons[section] || [];
    detailIconsDiv.innerHTML = `<div class="icon-btn"><i class="fa-solid fa-magnifying-glass"></i></div>` +
      icons.map(icon => `<div class="icon-btn"><i class="fa-solid ${icon}"></i></div>`).join('');
}

// Click on a main icon: if expanded, just switch content; if not, show icon-only detail panel
const mainIcons = document.querySelectorAll('.main-icon');
mainIcons.forEach(icon => {
  icon.addEventListener('click', () => {
    // Remove active from all, add to clicked
    mainIcons.forEach(i => i.classList.remove('active'));
    icon.classList.add('active');
    currentSection = icon.dataset.section;
    panelTitle.textContent = icon.dataset.section;
    if (sidebar.classList.contains('expanded')) {
      panelContent.innerHTML = panelTemplates[currentSection]?.expanded || '';
      setTimeout(bindDropdowns, 100);
    } else {
      panelContent.innerHTML = '';
      sidebar.classList.add('show-icon-only');
      sidebar.classList.remove('expanded');
      updateDetailIcons(currentSection);
    }
  });
});

// Click expand: show full content panel with icon+text
expandBtn.addEventListener('click', () => {
  sidebar.classList.add('expanded');
  panelTitle.textContent = currentSection;
  panelContent.innerHTML = panelTemplates[currentSection]?.expanded || '';
  setTimeout(bindDropdowns, 100);
});

// Click collapse: back to icon-only detail panel
collapseBtn.addEventListener('click', () => {
  sidebar.classList.remove('expanded');
  panelContent.innerHTML = '';
});

// Dropdown toggles (re-bind after content update)
function bindDropdowns() {
  document.querySelectorAll('.dropdown').forEach(item => {
    item.onclick = () => {
      const submenu = item.nextElementSibling;
      if (submenu && submenu.classList.contains('submenu')) {
        submenu.classList.toggle('show');
      }
    };
  });
}


// Theme toggle (icon in sidebar)
document.getElementById('theme-toggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

// Load default panel (Dashboard)
window.addEventListener('DOMContentLoaded', () => {
  currentSection = 'Dashboard';
  panelTitle.textContent = 'Dashboard';
  panelContent.innerHTML = '';
  updateDetailIcons('Dashboard');
  // Set Dashboard as active on load
  const dashboardIcon = document.querySelector('.main-icon[data-section="Dashboard"]');
  if (dashboardIcon) dashboardIcon.classList.add('active');
  // Show icon-only sidebar by default
  sidebar.classList.add('show-icon-only');
  sidebar.classList.remove('expanded');
});
