export function setupResponseInterceptor(api) {
  api.interceptors.response.use(
    (response) => {
      // Log para debug
      console.log('Interceptor - resposta original:', response);
      
      // Verifica se a resposta tem data
      if (response && response.data) {
        console.log('Interceptor - retornando data:', response.data);
        return Promise.resolve(response.data);
      }
      
      return Promise.resolve(response);
    },
    (error) => {
      if (error.response) {
        // Error from server with response
        const message = error.response.data.message || 'Erro no servidor';
        return Promise.reject(new Error(message));
      } else if (error.request) {
        // Error without response (network error)
        return Promise.reject(new Error('Erro de conexão com o servidor'));
      }
      return Promise.reject(error);
    }
  );
} 