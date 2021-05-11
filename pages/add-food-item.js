import Head from 'next/head';
import Link from 'next/link';

export default function Login() {
  return (
    <>
      <Head>
        <title>Add food item</title>
      </Head>
      {/* <h1>Add a food item</h1>
      <h2>Search from database</h2>
      <input type="text" /> */}
      <h1>Add</h1>
      <div>
        <Link href="/create-custom-food-item">
          <a>Create a custom Food Item</a>
        </Link>
      </div>

    </>
  );
}
