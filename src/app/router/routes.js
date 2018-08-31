export default [
  {
    path: "/",
    name: "Home",
    redirect: "/dashboard",
    component: () => import("../Home"),
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        title: "Dashboard",
        component: () => import("../Dashboard")
      },
      {
        path: "usuarios",
        name: "Usuarios",
        title: "Usuários",
        component: () => import("../usuario/Usuarios")
      },
      {
        path: "novoUsuario",
        name: "NovoUsuario",
        title: "Novo Usuário",
        component: () => import("../usuario/FormUsuario")
      },
      {
        path: "editarUsuario",
        name: "EditarUsuario",
        title: "Editar Usuário",
        component: () => import("../usuario/FormUsuario")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../Login")
  }
];
