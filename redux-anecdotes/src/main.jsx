import ReactDOM from 'react-dom/client'
import store from './store'
import { QueryClient, QueryClientProvider, ReactQueryDevtools } from '@tanstack/react-query'
import App from './App'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient} store={store}>
    <App />
    <ReactQueryDevtools />
  </QueryClientProvider>
)