function mostrarFormularioCadastro() {
    document.getElementById('form-login').style.display = 'none';
    document.getElementById('form-cadastro').style.display = 'block';
}

function mostrarFormularioLogin() {
    document.getElementById('form-cadastro').style.display = 'none';
    document.getElementById('form-login').style.display = 'block';
}

document.getElementById('cadastro').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioCadastro = document.getElementById('usuario-cadastro').value;
    const senhaCadastro = document.getElementById('senha-cadastro').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    if (senhaCadastro !== confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    usuarios.push({ usuario: usuarioCadastro, senha: senhaCadastro });
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    alert('Cadastro realizado com sucesso!');
    mostrarFormularioLogin();
});

document.getElementById('login').addEventListener('submit', function(event) {
    event.preventDefault();

    const usuarioLogin = document.getElementById('usuario-login').value;
    const senhaLogin = document.getElementById('senha-login').value;

    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios.find(user => user.usuario === usuarioLogin && user.senha === senhaLogin);

    if (usuario) {
        alert('Login realizado com sucesso!');
        
        
        const perfilImage = localStorage.getItem('perfilImage');
        
        if (perfilImage) {
            document.getElementById('avatar').src = perfilImage;
        }
        
        window.location.href = "home.html";
    } else {
        alert('Usuário ou senha incorretos.');
    }
});


window.onload = function() {
    const perfilUsuario = document.getElementById('perfil-usuario');

    
    if (perfilUsuario) {
        const savedImage = localStorage.getItem('perfilImage'); 

        if (savedImage) {
            perfilUsuario.src = savedImage; 
        } else {
            perfilUsuario.src = 'default.jpg';  
        }
    } else {
        console.warn("Elemento 'perfil-usuario' não encontrado no DOM.");
    }

    const inputFile = document.getElementById('pasta');
    
    
    if (inputFile) {  
        inputFile.addEventListener('change', function(event) {
            const file = event.target.files[0];  

            if (file) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    const imageUrl = e.target.result;
                
                    perfilUsuario.src = imageUrl;
                    localStorage.setItem('perfilImage', imageUrl); 
                
                    document.getElementById('avatar').src = imageUrl;
                };

                reader.readAsDataURL(file);  
            }
        });
    }
};