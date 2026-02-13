export function initSidebar() {
  const currentPage = window.location.pathname;

  const sidebarHTML = `
    <div class="sidebar_header">
      <div class="logo">
        <img src="/public/e-social-systems-icon.svg" alt="e-Social Systems Logo">
      </div>
      <div class="logo_name">
        <h1>e-Social Systems</h1>
        <p>Système de Gestion <br> des Cotisations Sociales</p>
      </div>
    </div>

    <div class="sidebar-bottom">
      <nav>
        <a href="/dashboard.html" ${currentPage.includes('dashboard') ? 'class="active"' : ''}>
          <i class="fa-solid fa-table-columns"></i>
          Tableau de bord
        </a>

        <a href="/employeur.html" ${currentPage.includes('employeur') ? 'class="active"' : ''}>
          <i class="fa-regular fa-square-full"></i>
          Employeur
        </a>

        <a href="/assures.html" ${currentPage.includes('assures') ? 'class="active"' : ''}>
          <i class="fa-solid fa-users"></i>
          Assurés
        </a>

        <a href="/declarations.html" ${currentPage.includes('declarations') ? 'class="active"' : ''}>
          <i class="fa-solid fa-file-arrow-down"></i>
          Déclarations
        </a>

        <a href="/droits.html" ${currentPage.includes('droits') ? 'class="active"' : ''}>
          <i class="fa-solid fa-circle-check"></i>
          Droits Sociaux
        </a>

        <a href="/statistique.html" ${currentPage.includes('statistique') ? 'class="active"' : ''}>
          <i class="fa-solid fa-chart-simple"></i>
          Statistiques
        </a>
      </nav>
    </div>
  `;

  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = sidebarHTML;
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initSidebar);
} else {
  initSidebar();
}
