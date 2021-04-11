import Link from 'next/link'
import navStyles from '../styles/Nav.module.css'

const Nav = () => {
  return (
    <nav className={navStyles.nav}>
      <ul>
        <li>
          <Link href="/"><a>Home</a></Link>
        </li>
        <li>
          <Link href="/login"><a>Login</a></Link>
        </li>
        <li>
          <Link href="/register"><a>Register</a></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav