import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './src/config/reactQuery';
import Routes from './src/routes';

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes />
    </QueryClientProvider>
  );
}
