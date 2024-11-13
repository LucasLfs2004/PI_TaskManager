import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 5 * (60 * 1000), // 5 minutos
      cacheTime: 10 * (60 * 1000), // 10 minutos,
      retry: 3,
    },
  },
});
