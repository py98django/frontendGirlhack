import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from 'next/link';
import './globals.css';

export const metadata = {
  title: 'Disco Themed App',
  description: 'Welcome to our Disco-themed website!',
};

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body>
        <header>
          <h1>Disco Themed Website</h1>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/disco-room">Disco Room</Link>
            <Link href="/disco-game">Disco Game</Link>
            <Link href="/careers">Careers</Link>
            {!session ? (
              <>
                <Link href="/signin">Sign In</Link>
                <Link href="/signup">Sign Up</Link>
              </>
            ) : (
              <button onClick={() => signOut()}>Logout</button>
            )}
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
};

export default Layout;
