import Head from 'next/head'
// import { GoalProvider } from '../contexts/GoalContext';
// import { FoodItemsProvider } from '../contexts/FoodItemsContext';
import Layout from '../components/Layout';
import '../styles/global.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,300;0,400;1,300;1,400;1,700&display=swap" rel="stylesheet" />
      </Head>
      {/* <GoalProvider> */}
      {/* <FoodItemsProvider> */}
        <Layout>
          <Component {...pageProps} />
        </Layout>
      {/* </GoalProvider> */}
      {/* </FoodItemsProvider> */}
    </>
  );
}
