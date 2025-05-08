import { createRouter, createWebHashHistory } from "vue-router";
import AuthService from '@/services/auth.service';

import Dashboard from "@/views/Dashboard.vue";
import Tables from "@/views/Tables.vue";
import Billing from "@/views/Billing.vue";
import VirtualReality from "@/views/VirtualReality.vue";
import Profile from "@/views/Profile.vue";
import Rtl from "@/views/Rtl.vue";
import SignIn from "@/views/SignIn.vue";
import SignUp from "@/views/SignUp.vue";
import ViewUsers from "@/views/user/Users.vue";
import AddUser from "@/views/user/AddUser.vue";

import Config from "@/views/sethings/Config.vue";
import Provincias from "@/views/sethings/Provinces/Provinces.vue";
import AddProvincia from "@/views/sethings/Provinces/addProvince.vue";
import Distritos from "@/views/sethings/Districts/Districts.vue";
import AddDistrito from "@/views/sethings/Districts/addDistrict.vue";
import Bairros from "@/views/sethings/Neighborhood/Neighborhoods.vue";
import Categorias from "@/views/categories/Categories.vue";
import AddCategoria from "@/views/categories/AddCategory.vue";
import Tarifas from "@/views/sethings/Tariffs/Tariffs.vue";
import Funcionarios from "@/views/funcionarios/Employe.vue";
import AddFuncionario from "@/views/funcionarios/addEmploye.vue";
import Expenses from "@/views/expenses/Expenses.vue";
import AddExpenses from "@/views/expenses/addExpenses.vue";
import ExpenseReport from "@/views/reports/ExpenseReport.vue";
import Reports from "@/views/reports/Reports.vue";
import Infringements from "@/views/infringement/Infringement.vue";
import ClientsWithInfractions from "@/views/infringement/ClientsWithInfractions.vue";
import Customers from "@/views/customer/Customers.vue";
import AddCustomer from "@/views/customer/addCustomer.vue";
import DeductionsAndBenefits from "@/views/sethings/DeductionsAndBenefits/DeductionsAndBenefits.vue";
import AddDeductionsAndBenefits from "@/views/sethings/DeductionsAndBenefits/addDeductionsAndBenefits.vue";
import Department from "@/views/sethings/department/department.vue";
import AddDepartment from "@/views/sethings/department/addDepartment.vue";
import AddInfringement from "@/views/infringement/addInfringement.vue";
import Help from "@/views/help.vue";
import Readings from "@/views/readings/Readings.vue";
import Invoice from "@/views/invoice/invoice.vue";
import Payment from "@/views/payment/payment.vue";
import Salary from "@/views/salaries/salary.vue";
import NotFound from "@/views/NotFound/NotFound.vue";
import SigninPage from '@/views/SignIn.vue';
import ForgotPassword from '@/views/SignUp.vue';
import MonitoriaEAvaliacao from "@/views/monitoria-e-avaliacao/monitoria-e-avaliacao.vue";
import EsgAdvisory from "@/views/esg-advisory/esg-advisory.vue";
import CyberRisk from "@/views/cyber-risks/cyber-risks.vue";
import Commercial from "@/views/commercial/commercial.vue";
import DigitalTransformation from "@/views/digital-transformation/digital-transformation.vue";
import EficienceOperations from "@/views/eficiencia-operacional/eficiencia-operacional.vue";
import AnalisisDeclinio from "@/views/monitoria-e-avaliacao/analise-declinio/analise-declinio.vue";
import AnalisisDeclinioData from "@/views/monitoria-e-avaliacao/analise-declinio/analise-declinio-data.vue";
import AnalisisDeclinioUpload from "@/views/monitoria-e-avaliacao/analise-declinio/analise-declinio-upload.vue";
import SustainabilityMenu from "@/views/sustainability/sustainability-menu.vue";
import FinancialProtocol from "@/views/financial-protocol/financial-protocol.vue";

// Rotas públicas
const publicRoutes = [
  {
    path: "/login",
    name: "Login",
    component: SigninPage,
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout'
    }
  },
  {
    path: "/forgot-password",
    name: "Forgot Password",
    component: ForgotPassword,
    meta: {
      requiresAuth: false,
      layout: 'AuthLayout'
    }
  }
];

// Rotas protegidas
const protectedRoutes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: { title: 'Dashboard' }
  },
  { path: "/tables", name: "Tables", component: Tables, meta: { title: 'Tables' } },
  { path: "/billing", name: "Billing", component: Billing, meta: { title: 'Billing' } },
  { path: "/virtual-reality", name: "Virtual Reality", component: VirtualReality, meta: { title: 'Virtual Reality' } },
  { path: "/profile", name: "Profile", component: Profile, meta: { title: 'Profile' } },
  { path: "/rtl-page", name: "Rtl", component: Rtl, meta: { title: 'Rtl' } },
  { path: "/sign-in", name: "Sign In", component: SignIn, meta: { title: 'Sign In' } },
  { path: "/sign-up", name: "Sign Up", component: SignUp, meta: { title: 'Sign Up' } },
  { path: "/usuarios", name: "Usuários", component: ViewUsers, meta: { title: 'Usuários' } },
  { path: "/adicionar/usuario", name: "Adicionar Usuário", component: AddUser, meta: { title: 'Adicionar Usuário' } },
  { path: "/config", name: "Config", component: Config, meta: { title: 'Config' } },
  { path: "/provincias", name: "Provincias", component: Provincias, meta: { title: 'Provincias' } },
  { path: "/adicionar/provincia", name: "Adicionar Provincia", component: AddProvincia, meta: { title: 'Adicionar Provincia' } },
  { path: "/distritos", name: "Distritos", component: Distritos, meta: { title: 'Distritos' } },
  { path: "/adicionar/distrito", name: "Adicionar Distrito", component: AddDistrito, meta: { title: 'Adicionar Distrito' } },
  { path: "/bairros", name: "Bairros", component: Bairros, meta: { title: 'Bairros' } },
  { path: "/categorias", name: "Categorias", component: Categorias, meta: { title: 'Categorias' } },
  { path: "/adicionar/categoria", name: "Adicionar Categoria", component: AddCategoria, meta: { title: 'Adicionar Categoria' } },
  { path: "/tarifas", name: "Tarifas", component: Tarifas, meta: { title: 'Tarifas' } },
  { path: "/funcionarios", name: "Funcionários", component: Funcionarios, meta: { title: 'Funcionários' } },
  { path: "/adicionar/funcionario", name: "Adicionar Funcionário", component: AddFuncionario, meta: { title: 'Adicionar Funcionário' } },
  { path: "/despesas", name: "Despesas", component: Expenses, meta: { title: 'Despesas' } },
  { path: "/adicionar/despesa", name: "Adicionar Despesa", component: AddExpenses, meta: { title: 'Adicionar Despesa' } },
  { path: "/reports", name: "Relatórios", component: Reports, meta: { title: 'Relatórios' } },
  { path: "/infracoes", name: "Infrações", component: Infringements, meta: { title: 'Infrações' } },
  { path: "/clientes-com-infracoes", name: "Clientes com Infrações", component: ClientsWithInfractions, meta: { title: 'Clientes com Infrações' } },
  { path: "/clientes", name: "Clientes", component: Customers, meta: { title: 'Clientes' } },
  { path: "/adicionar/cliente", name: "Adicionar Cliente", component: AddCustomer, meta: { title: 'Adicionar Cliente' } },
  { path: "/impoistobeneficios", name: "Impostos e Benefícios", component: DeductionsAndBenefits, meta: { title: 'Impostos e Benefícios' } },
  { path: "/adicionar/imposto", name: "Adicionar Imposto", component: AddDeductionsAndBenefits, meta: { title: 'Adicionar Imposto' } },
  { path: "/departamentos", name: "Departamentos", component: Department, meta: { title: 'Departamentos' } },
  { path: "/adicionar/departamento", name: "Adicionar Departamento", component: AddDepartment, meta: { title: 'Adicionar Departamento' } },
  { path: "/adicionar/infracao", name: "Adicionar Infração", component: AddInfringement, meta: { title: 'Adicionar Infração' } },
  { path: "/help", name: "Ajuda", component: Help, meta: { title: 'Ajuda' } },
  { path: "/leituras", name: "Leituras", component: Readings, meta: { title: 'Leituras' } },
  { path: "/faturas", name: "Faturas", component: Invoice, meta: { title: 'Faturas' } },
  { path: "/pagamentos", name: "Pagamentos", component: Payment, meta: { title: 'Pagamentos' } },
  { path: "/salarios", name: "Salários", component: Salary, meta: { title: 'Salários' } },
  { path: "/home", name: "Home", component: Dashboard, meta: { title: 'Home' } },
  {
    path: "/esg-advisory",
    name: "EsgAdvisory",
    component: EsgAdvisory,
    meta: {
      requiresAuth: true,
      title: 'EsgAdvisory'
    },
  },
  {
    path: "/monitoria-e-avaliacao",
    name: "MonitoriaEAvaliacao",
    component: MonitoriaEAvaliacao,
    meta: {
      requiresAuth: true,
      title: 'MonitoriaEAvaliacao'
    },
  },
  {
    path: "/cyber-risks",
    name: "CyberRisks",
    component: CyberRisk,
    meta: {
      requiresAuth: true,
      title: 'CyberRisks'
    },
  },
  {
    path: "/commercial",
    name: "Commercial",
    component: Commercial,
    meta: {
      requiresAuth: true,
      title: 'Commercial'
    },
  },
  {
    path: "/digital-transformation",
    name: "DigitalTransformation",
    component: DigitalTransformation,
    meta: {
      requiresAuth: true,
      title: 'DigitalTransformation'
    },
  },
  {
    path: "/eficience-operations",
    name: "EficienceOperations",
    component: EficienceOperations,
    meta: {
      requiresAuth: true,
      title: 'EficienceOperations'
    },
  },
  {
    path: "/analise-declinio",
    name: "AnalisisDeclinio",
    component: AnalisisDeclinio,
    meta: {
      requiresAuth: true,
      title: 'AnalisisDeclinio'
    },
  },
  {
    path: "/analise-declinio-data",
    name: "AnalisisDeclinioData",
    component: AnalisisDeclinioData,
    meta: {
      requiresAuth: true,
      title: 'AnalisisDeclinioData'
    },
  },
  {
    path: "/analise-declinio-upload",
    name: "AnalisisDeclinioUpload",
    component: AnalisisDeclinioUpload,
    meta: {
      requiresAuth: true,
      title: 'AnalisisDeclinioUpload'
    },
  },
  {
    path: "/sustainability",
    name: "Sustainability",
    component: SustainabilityMenu,
    meta: { requiresAuth: true, title: 'Sustainability' }
  },
  {
    path: "/financial-protocol",
    name: "FinancialProtocol",
    component: FinancialProtocol,
    meta: { requiresAuth: true, title: 'FinancialProtocol' }
  },
].map(route => ({
  ...route,
  meta: {
    ...route.meta,
    requiresAuth: true,
    layout: 'DefaultLayout'
  }
}));

const routes = [
  ...publicRoutes,
  ...protectedRoutes,
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
    meta: { requiresAuth: false }
  }
];

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});

// Guarda de rota global
router.beforeEach((to, from, next) => {
  const publicRoutes = ['/login', '/forgot-password', '/register'];
  const requiresAuth = !publicRoutes.includes(to.path);

  if (requiresAuth) {
    if (!AuthService.isAuthenticated()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
      return;
    }
  } else if (AuthService.isAuthenticated() && to.path === '/login') {
    next('/dashboard');
    return;
  }

  next();
});


// Ações após cada navegação
router.afterEach((to) => {
  // Scroll para o topo da página
  window.scrollTo(0, 0);

  // Você pode adicionar analytics aqui
  // if (process.env.NODE_ENV === 'production') {
  //   logPageView(to.fullPath);
  // }
});

export default router;
