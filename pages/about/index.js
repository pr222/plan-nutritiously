import Head from 'next/head';
import Link from 'next/link';

export default function GetStarted() {
  return (
    <>
      <Head>
        <title>About</title>
      </Head>

      <h1>About</h1>
      <h2>Project</h2>
      <p>
        {'This is a student-project developed during a course at '}
        <Link href="https://lnu.se/">
          <a target="_blank">Linnaeus University</a>
        </Link>
        {' during the spring of 2021.'}
      </p>
      <p>
        The aim of this application is to provide a tool for planning
        personal nutrition and shopping-costs.
      </p>
      <h2>Contact</h2>
      <p>
        {'Contact the developer: '}
        <a href="mailto: pr222ja@student.lnu.se">pr222ja@student.lnu.se</a>
      </p>
      <h2>Usage</h2>
      <p>
        As a visitor you are free to use the application, however the
        application may without notice change functionalities that may
        break your prevoius changes or data. Tha application itself may
        be taken down without prior notifications.
      </p>
      <h2>Data</h2>
      <p>
        As there is currently no database involved, all data that you
        create in the application is only saved within your current browser.
        In other words, no data gets recorded for any use outside the current
        browser in your current device. That also means that if you use
        incognito-mode all data gets lost when you close the window. If you do not
        use incognito-mode you can close the window and the data will still
        be there, provided that you still use the same device and browser.
      </p>
    </>
  );
}
