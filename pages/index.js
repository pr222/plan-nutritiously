import Head from 'next/head';
// import PropTypes from 'prop-types';
// import connectToDatabase from '../middleware/mongodb';

// export default function Home({ isConnected }) {
export default function Home() {
  let goals;

  if (typeof window !== 'undefined') {
    const loadGoals = JSON.parse(window.localStorage.getItem('goals'));
    if (loadGoals !== null) {
      goals = loadGoals;
    } else {
      goals = '';
    }
  } else {
    goals = '';
  }

  return (
    <>
      <Head>
        <title>Plan Nutritiously</title>
      </Head>
      {/* <h1>Welcome!</h1>
      <p>Plan your groceries nutritiously</p> */}
      <h1>Current goals</h1>
      <div>
        Kcal:
        {' '}
        {goals.kcal}
        {' per day'}
      </div>
      <div>
        Fat:
        {' '}
        {goals.fat}
        {' g per day'}
      </div>
      <div>
        Carbs:
        {' '}
        {goals.carbs}
        {' g per day'}
      </div>
      <div>
        Protein:
        {' '}
        {goals.protein}
        {' g per day'}
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
