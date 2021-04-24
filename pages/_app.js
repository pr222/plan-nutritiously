import { GoalProvider } from '../contexts/GoalContext';
import Layout from '../components/Layout';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <GoalProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </GoalProvider>
  );
}
