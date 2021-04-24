import Head from 'next/head';
// import PropTypes from 'prop-types';
// import connectToDatabase from '../middleware/mongodb';

// export default function Home({ isConnected }) {
export default function Home() {
  let goals;

  if (typeof window !== 'undefined') {
    goals = JSON.parse(window.localStorage.getItem('goals'));
  } else {
    goals = '';
  }

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>
      <h1>Welcome!</h1>
      <p>Plan your groceries nutritiously</p>
      <div>
        Kcal Goal:
        {goals.kcal}
      </div>
      <div>
        Fat Goal:
        {goals.fat}
      </div>
      <div>
        Carbs Goal:
        {goals.carbs}
      </div>
      <div>
        Protein Goal:
        {goals.protein}
      </div>

      {/* {isConnected ? (
        console.log('You are connected to MongoDB')
      ) : (
        console.log('You are NOT connected to MongoDB')
      )} */}
    </>
  );
}

// export async function getServerSideProps() {
//   const { client } = await connectToDatabase();

//   const isConnected = await client.isConnected();

//   return {
//     props: { isConnected },
//   };
// }

// Home.propTypes = {
//   isConnected: PropTypes.bool.isRequired,
// };
