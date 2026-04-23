const loginForm = document.getElementById("loginForm");
const cadastroForm = document.getElementById("cadastroForm");

document.getElementById("goCadastro").onclick = () => {
  loginForm.classList.remove("active");
  cadastroForm.classList.add("active");
};

document.getElementById("goLogin").onclick = () => {
  cadastroForm.classList.remove("active");
  loginForm.classList.add("active");
};

cadastroForm.addEventListener("submit", function(e){
  e.preventDefault();

  const nome = document.getElementById("cadNome").value;
  const email = document.getElementById("cadEmail").value;
  const senha = document.getElementById("cadSenha").value;
  const msg = document.getElementById("cadMsg");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  if(usuarios.find(u => u.email === email)){
    msg.style.color = "red";
    msg.textContent = "Email já cadastrado!";
    return;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem("usuarios", JSON.stringify(usuarios));

  msg.style.color = "green";
  msg.textContent = "Conta criada! Faça login.";

  cadastroForm.reset();
});

loginForm.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const senha = document.getElementById("loginSenha").value;
  const erro = document.getElementById("loginErro");

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if(usuario){
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
    window.location.href = "index.html";
  } else {
    erro.style.color = "red";
    erro.textContent = "Dados inválidos!";
  }
});