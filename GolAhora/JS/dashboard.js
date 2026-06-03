document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificar sesión activa en LocalStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser) {
        // Si no hay sesión, redirige directo al login de la raíz
        window.location.href = 'login.html';
        return;
    }

    // 2. Inicializar componentes visuales de la interfaz
    initInterfaceControls();
    renderUserInformation(currentUser);
    renderDashboardByRole(currentUser);
});

function initInterfaceControls() {
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            document.getElementById('wrapper').classList.toggle('toggled');
        });
    }
}

function renderUserInformation(user) {
    // Colocar el nombre en la barra superior
    document.getElementById('top-navbar-user-name').textContent = `${user.nombre} ${user.apellido}`;

    // Colocar la tarjeta de perfil en el sidebar
    const profileSummary = document.getElementById('user-profile-summary');
    profileSummary.innerHTML = `
        <div class="d-flex align-items-center">
            <div class="avatar-box bg-success bg-opacity-25 text-sports rounded-circle d-flex align-items-center justify-content-center me-2" style="width: 40px; height: 40px;">
                <i class="fa-solid fa-user-tie"></i>
            </div>
            <div class="overflow-hidden">
                <div class="fw-bold text-white text-truncate lh-1 small">${user.nombre} ${user.apellido}</div>
                <small class="text-sports text-uppercase fw-bold tracking-wider" style="font-size: 0.65rem;">${user.role}</small>
            </div>
        </div>
    `;
}

function renderDashboardByRole(user) {
    const menuContainer = document.getElementById('sidebar-menu-items');
    const metricsContainer = document.getElementById('metrics-container');
    const workspaceTitle = document.getElementById('workspace-title');
    const workspaceContent = document.getElementById('workspace-content');

    let menuHTML = '';
    let metricsHTML = '';

    // Estructuras de navegación modularizadas según el Rol
    if (user.role === 'Administrador') {
        menuHTML = `
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link active" href="#"><i class="fa-solid fa-chart-line me-3"></i>Vista General</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-calendar-check me-3"></i>Control Reservas</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-users me-3"></i>Usuarios Sistema</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-trophy me-3"></i>Torneos y Ligas</a></li>
        `;
        metricsHTML = `
            <div class="col-md-4">
                <div class="card-metric p-3 border-start border-success border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Ingresos del Mes</small>
                    <h3 class="fw-bold mt-1 mb-0 text-white">$145.000</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-metric p-3 border-start border-primary border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Ocupación Canchas</small>
                    <h3 class="fw-bold mt-1 mb-0 text-white">82%</h3>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card-metric p-3 border-start border-warning border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Alertas de Pago</small>
                    <h3 class="fw-bold mt-1 mb-0 text-white">3 Pendientes</h3>
                </div>
            </div>
        `;
        workspaceTitle.textContent = "Monitoreo General de Canchas";
        workspaceContent.innerHTML = `
            <div class="table-responsive">
                <table class="table table-dark table-hover table-striped align-middle mb-0 small">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Cliente</th>
                            <th>Cancha</th>
                            <th>Horario</th>
                            <th>Monto</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><span class="text-sports fw-bold">#RES-992</span></td>
                            <td>Carlos Tevez</td>
                            <td>Cancha F7 - Sintético</td>
                            <td>Hoy 20:00 hs</td>
                            <td>$12.000</td>
                            <td><span class="badge bg-success">Abonado</span></td>
                        </tr>
                        <tr>
                            <td><span class="text-sports fw-bold">#RES-993</span></td>
                            <td>Lionel Messi</td>
                            <td>Cancha F11 - Profesional</td>
                            <td>Hoy 21:30 hs</td>
                            <td>$25.000</td>
                            <td><span class="badge bg-warning text-dark">Señado</span></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `;

    } else if (user.role === 'Cliente') {
        menuHTML = `
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link active" href="#"><i class="fa-solid fa-calendar-plus me-3"></i>Reservar Cancha</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-dumbbell me-3"></i>Mis Clases</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-receipt me-3"></i>Historial Recibos</a></li>
        `;
        metricsHTML = `
            <div class="col-md-6">
                <div class="card-metric p-3 border-start border-success border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Próximo Turno</small>
                    <h5 class="fw-bold mt-1 mb-0 text-white">Hoy 20:00hs - Cancha F7</h5>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card-metric p-3 border-start border-info border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Saldo de Cuenta</small>
                    <h5 class="fw-bold mt-1 mb-0 text-white">Sin Deudas</h5>
                </div>
            </div>
        `;
        workspaceTitle.textContent = "Turnos Disponibles para Reserva rápida";
        workspaceContent.innerHTML = `
            <div class="row g-3">
                <div class="col-md-6">
                    <div class="p-3 rounded bg-dark-navy border border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="fw-bold mb-1 text-white">Cancha F5 - "La Bombonera"</h6>
                            <small class="text-light-50">Turnos Libres desde las 18:00 hs</small>
                        </div>
                        <button class="btn btn-sm btn-sports px-3 fw-bold" onclick="solicitarReserva('F5')">Reservar</button>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="p-3 rounded bg-dark-navy border border-secondary border-opacity-25 d-flex justify-content-between align-items-center">
                        <div>
                            <h6 class="fw-bold mb-1 text-white">Cancha F11 - "El Monumental"</h6>
                            <small class="text-light-50">Turnos Libres desde las 21:00 hs</small>
                        </div>
                        <button class="btn btn-sm btn-sports px-3 fw-bold" onclick="solicitarReserva('F11')">Reservar</button>
                    </div>
                </div>
            </div>
        `;
    } else if (user.role === 'Profesor' || user.role === 'Entrenador') {
        menuHTML = `
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link active" href="#"><i class="fa-solid fa-clipboard-user me-3"></i>Clases Asignadas</a></li>
            <li><a class="nav-link text-white d-flex align-items-center py-2.5 px-3 sidebar-link" href="#"><i class="fa-solid fa-users-gear me-3"></i>Mis Alumnos</a></li>
        `;
        metricsHTML = `
            <div class="col-md-10">
                <div class="card-metric p-3 border-start border-primary border-4 shadow-sm">
                    <small class="text-light-50 text-uppercase fw-bold" style="font-size: 0.75rem;">Módulo de Docencia</small>
                    <h5 class="fw-bold mt-1 mb-0 text-white">Bienvenido al Panel de Seguimiento Técnico</h5>
                </div>
            </div>
        `;
        workspaceTitle.textContent = "Cronograma de Clases Semanales";
        workspaceContent.innerHTML = `<p class="text-light-50">Cargando la lista de asistencias y esquemas tácticos asignados para sus comisiones...</p>`;
    }

    // Agregar botón obligatorio de Logout al final de la navegación
    menuHTML += `
        <li class="nav-item mt-4">
            <a class="nav-link text-danger d-flex align-items-center py-2.5 px-3 sidebar-link" href="#" id="btn-logout-action">
                <i class="fa-solid fa-right-from-bracket me-3"></i>
                <span>Cerrar Sesión</span>
            </a>
        </li>
    `;

    // Inyectar bloques renderizados a la vista
    menuContainer.innerHTML = menuHTML;
    metricsContainer.innerHTML = metricsHTML;

    // Enganchar el listener de deslogueo seguro
    document.getElementById('btn-logout-action').addEventListener('click', (e) => {
        e.preventDefault();
        executeLogout();
    });
}

function executeLogout() {
    Swal.fire({
        title: '¿Cerrar sesión?',
        text: "Vas a salir del panel de gestión de Gol Ahora",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#00C16E',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, salir',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    });
}

// Función global simulada para interactuar con SweetAlert2 en el espacio de trabajo
window.solicitarReserva = function(tipo) {
    Swal.fire({
        icon: 'success',
        title: `Reserva pre-aprobada para Cancha ${tipo}`,
        text: 'Se ha registrado la solicitud. Diríjase al panel de pagos para confirmar el turno.',
        confirmButtonColor: '#00C16E'
    });
};