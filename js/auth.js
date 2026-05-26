/* ============================================================
   auth.js — gerencia usuários no localStorage
   ============================================================ */
(function () {
  const USERS_KEY = "pf_users";
  const SESSION_KEY = "pf_current_user";

  function readUsers() {
    try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
    catch { return []; }
  }
  function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  const Auth = {
    register({ name, email, password }) {
      name = (name || "").trim();
      email = (email || "").trim().toLowerCase();
      if (!name || !email || !password) {
        return { ok: false, message: "Preencha todos os campos." };
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { ok: false, message: "E-mail inválido." };
      }
      if (password.length < 6) {
        return { ok: false, message: "A senha deve ter ao menos 6 caracteres." };
      }
      const users = readUsers();
      if (users.some(u => u.email === email)) {
        return { ok: false, message: "Este e-mail já está cadastrado." };
      }
      users.push({ name, email, password });
      writeUsers(users);
      return { ok: true, message: "Cadastro realizado com sucesso!" };
    },

    login({ email, password }) {
      email = (email || "").trim().toLowerCase();
      const users = readUsers();
      const user = users.find(u => u.email === email && u.password === password);
      if (!user) return { ok: false, message: "E-mail ou senha incorretos." };
      localStorage.setItem(SESSION_KEY, JSON.stringify({ name: user.name, email: user.email }));
      return { ok: true, message: `Bem-vindo(a), ${user.name}!` };
    },

    logout() {
      localStorage.removeItem(SESSION_KEY);
    },

    current() {
      try { return JSON.parse(localStorage.getItem(SESSION_KEY)); }
      catch { return null; }
    },
  };

  /* ---------- atualizar header em todas as páginas ---------- */
  function refreshHeader() {
    const slot = document.querySelector("[data-auth-slot]");
    if (!slot) return;
    const user = Auth.current();
    if (user) {
      slot.innerHTML = `
        <span class="user-chip">
          <span>Olá, ${user.name.split(" ")[0]}</span>
          <button type="button" id="logoutBtn">Sair</button>
        </span>`;
      document.getElementById("logoutBtn").addEventListener("click", () => {
        Auth.logout();
        refreshHeader();
      });
    } else {
      slot.innerHTML = `<a class="nav__link" href="${slot.dataset.loginHref || 'pages/login.html'}">Login</a>`;
    }
  }

  window.PF_Auth = Auth;
  window.PF_refreshHeader = refreshHeader;
  document.addEventListener("DOMContentLoaded", refreshHeader);
})();