let selectedUser = null;

// Agregar eventos a las opciones de usuario
document.querySelectorAll('.user-option').forEach(option => {
    option.addEventListener('click', function() {
        console.log('Usuario clickeado:', this.dataset.user);
        
        // Remover selección previa
        document.querySelectorAll('.user-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Seleccionar nuevo usuario
        this.classList.add('selected');
        selectedUser = this.dataset.user;
        console.log('Usuario seleccionado:', selectedUser);
        
        // Limpiar mensaje de error al seleccionar usuario
        document.getElementById('error-message').textContent = '';
    });
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const errorMessage = document.getElementById('error-message');
    
    // Validación de selección de usuario
    if (!selectedUser) {
        errorMessage.textContent = 'Por favor selecciona un usuario';
        errorMessage.style.color = '#8474A1';
        
        Swal.fire({
            html: `
                <div style="color: #8474A1">
                    <i class="fas fa-user-slash" style="font-size: 70px;"></i>
                    <h2 style="margin: 15px 0; font-weight: 600">¡Usuario no seleccionado!</h2>
                </div>
            `,
            text: 'Debes seleccionar un usuario antes de continuar',
            confirmButtonText: 'Entendido',
            confirmButtonColor: '#8474A1',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            }
        });
        return;
    }
    
    const password = document.getElementById('password').value;
    
    // Validación de contraseña vacía
    if (!password) {
        errorMessage.textContent = 'Por favor ingresa una contraseña';
        errorMessage.style.color = '#8474A1';
        return;
    }
    
    const usuarios = {
        'Andres': '1724',
        'Monica': '1234'
    };
    
    if (usuarios[selectedUser] && usuarios[selectedUser] === password) {
        errorMessage.textContent = '';
        Swal.fire({
            html: `
                <div style="color: #08999D">
                    <i class="fas fa-check-circle" style="font-size: 60px;"></i>
                    <h2 style="margin: 10px 0">¡Bienvenido ${selectedUser}!</h2>
                </div>
            `,
            text: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 2000,
            timerProgressBar: true,
            showClass: {
                popup: 'animate__animated animate__jackInTheBox'
            },
            hideClass: {
                popup: 'animate__animated animate__zoomOut'
            }
        }).then(() => {
            window.location.href = 'Home.html';
        });
    } else {
        errorMessage.textContent = `Contraseña incorrecta para ${selectedUser}`;
        errorMessage.style.color = '#ff4444';
        
        Swal.fire({
            html: `
                <div style="color: #ff4444">
                    <i class="fas fa-exclamation-circle" style="font-size: 60px;"></i>
                    <h2 style="margin: 10px 0">¡Contraseña Incorrecta!</h2>
                </div>
            `,
            text: `La contraseña ingresada no es correcta para ${selectedUser}`,
            confirmButtonText: 'Intentar de nuevo',
            confirmButtonColor: '#08999D',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            }
        });
    }
}); 