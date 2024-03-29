import { LogBox } from 'react-native';
import Navigation from '@/app/index';
import AuthProvider from './contexts/auth';
import DatabaseProvider from './contexts/database';

LogBox.ignoreLogs(['Require cycle']);

export default function App() {
  return(
    <AuthProvider>
      <DatabaseProvider>
        <Navigation />
      </DatabaseProvider>
    </AuthProvider>
  )
}