import { authService } from './services/authService.js';

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.getElementById('form-login');
    const formRegistro = document.getElementById('form-registro');
    const btnRecover = document.getElementById('btn-recover');

    // --- MANEJO DEL LOGIN ---
    if (formLogin) {
        formLogin.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (!formLogin.checkValidity()) {
                e.stopPropagation();
                formLogin.classList.add('was-validated');
                return;
            }

            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const spinner = document.getElementById('login-spinner');
            const btnSubmit = document.getElementById('btn-submit-login');

            try {
                // Mostrar Loader de carga
                spinner.classList.remove('d-none');
                btnSubmit.disabled = true;

                // Intentar autenticación
                const user = await authService.login(email, password);
                
                // Alerta SweetAlert de éxito
                Swal.fire({
                    icon: 'success',
                    title: `¡Bienvenido, ${user.nombre}!`,
                    text: 'Ingresando al panel de control...',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    window.location.href = 'dashboard.html';
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error de ingreso',
                    text: error.message,
                    confirmButtonColor: '#0A2540'
                });
            } finally {
                spinner.classList.add('d-none');
                btnSubmit.disabled = false;
            }
        });
    }

    // --- MANEJO DEL REGISTRO ---
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (e) => {
            e.preventDefault();

            const password = document.getElementById('passwordReg').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            const confirmInput = document.getElementById('confirmPassword');

            // Validar contraseñas coincidentes manualmente
            if (password !== confirmPassword) {
                confirmInput.setCustomValidity('Invalid');
                formRegistro.classList.add('was-validated');
                return;
            } else {
                confirmInput.setCustomValidity('');
            }

            if (!formRegistro.checkValidity()) {
                e.stopPropagation();
                formRegistro.classList.add('was-validated');
                return;
            }

            const spinner = document.getElementById('registro-spinner');
            const btnSubmit = document.getElementById('btn-submit-registro');

            const nuevoUsuario = {
                nombre: document.getElementById('nombre').value.trim(),
                apellido: document.getElementById('apellido').value.trim(),
                dni: document.getElementById('dni').value.trim(),
                email: document.getElementById('emailReg').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                password: password,
                role: 'Cliente' // Rol inicial por defecto por formulario público
            };

            try {
                spinner.classList.remove('d-none');
                btnSubmit.disabled = true;

                await authService.register(nuevoUsuario);

                Swal.fire({
                    icon: 'success',
                    title: 'Registro Completado',
                    text: 'Tu cuenta fue creada de forma segura.',
                    confirmButtonColor: '#00C16E'
                }).then(() => {
                    window.location.href = 'login.html';
                });

            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'No se pudo registrar',
                    text: error.message,
                    confirmButtonColor: '#0A2540'
                });
            } finally {
                spinner.classList.add('d-none');
                btnSubmit.disabled = false;
            }
        });
    }

    // --- RECUERDO DE CONTRASEÑA (EXTRA) ---
    if (btnRecover) {
        btnRecover.addEventListener('click', (e) => {
            e.preventDefault();
            Swal.fire({
                title: 'Recuperar Contraseña',
                input: 'email',
                inputLabel: 'Ingresá tu correo electrónico',
                inputPlaceholder: 'nombre@correo.com',
                confirmButtonColor: '#00C16E',
                showCancelButton: true,
                cancelButtonText: 'Cancelar'
            }).then((result) => {
                if (result.isConfirmed && result.value) {
                    Swal.fire('Enviado', `Se enviaron las instrucciones a ${result.value}`, 'success');
                }
            });
        });
    }
});