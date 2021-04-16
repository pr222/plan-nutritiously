import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

// const PATH = process.env.BASE_PATH
const Nav = () => {
// export default function Nav(props) {
  const PATH = process.env.NEXT_PUBLIC_BASE_PATH

  // return (
  //   <nav className={navStyles.nav}>
  //     <ul>
  //       <li>
  //         <Link href={{ pathname: `${PATH}`}}><a>Home</a></Link>
  //       </li>
  //       <li>
  //         <Link href={{ pathname: `${PATH}/login`}}><a>Login</a></Link>
  //       </li>
  //       <li>
  //         <Link href={{ pathname: `${PATH}/register`}}><a>Register</a></Link>
  //       </li>
  //     </ul>
  //   </nav>
  // )

  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href='/'><a>Home</a></Link>
        </li>
        <li>
          <Link href='/login'><a>Login</a></Link>
        </li>
        <li>
          <Link href='/register'><a>Register</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export async function getStaticProps() {
  return {    props: {}    }
}

export default Nav