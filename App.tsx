import Navigation from '@/app/index';
import AuthProvider from './contexts/auth';

export default function App() {
  return(
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}