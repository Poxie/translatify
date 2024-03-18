import Navigation from '@/app/index';
import AuthProvider from './contexts/auth';
import DatabaseProvider from './contexts/database';

export default function App() {
  return(
    <AuthProvider>
      <DatabaseProvider>
        <Navigation />
      </DatabaseProvider>
    </AuthProvider>
  )
}