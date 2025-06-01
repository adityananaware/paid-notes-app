import { useSession, signIn, signOut } from "next-auth/react";

export function Navbar() {
  const { data: session } = useSession();
  return (
    <nav>
      <a href="/">Home</a>
      {session ? (
        <>
          <span>Welcome, {session.user?.name}</span>
          <button onClick={() => signOut()}>Logout</button>
        </>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </nav>
  );
}