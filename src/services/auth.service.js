import api from './api/axios';
import router from '@/router';

class AuthService {
  async login(credentials) {
    try {
      // Log para debug
      console.log('AuthService - enviando credenciais:', credentials);

      // Removemos a desestruturação já que o interceptor já retorna o data
      const response = await api.post('/signin', {
        username: credentials.email,
        password: credentials.password
      });

      console.log('Login response:', response); // Debug

      // Verifica se a resposta é válida
      if (response && response.success && response.token) {
        // Log para debug
        console.log('AuthService - token recebido:', response.token);
        
        // Salva o token
        localStorage.setItem('token', response.token);
        console.log('Token salvo:', response.token); // Debug
        
        // Salva os dados do usuário se existirem
        if (response.user) {
          console.log('AuthService - salvando dados do usuário:', response.user);
          localStorage.setItem('user', JSON.stringify(response.user));
        }

        // Configura o token para futuras requisições
        api.defaults.headers['token'] = response.token;
        console.log('Headers após login:', api.defaults.headers); // Debug

        return response;
      }

      console.error('AuthService - resposta inválida:', response);
      throw new Error('Resposta inválida do servidor');
    } catch (error) {
      console.error('AuthService - erro no login:', error);
      throw error;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAuthenticated() {
    const token = this.getToken();
    return !!token;
  }

  logout() {
    console.log('Realizando logout'); // Debug
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete api.defaults.headers['token'];
    router.push('/login');
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }
}

export default new AuthService(); 