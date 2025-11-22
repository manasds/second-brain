"use client" ;
import { authClient } from "@/lib/auth-client";
const LoginButton = () => {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <button onClick={handleLogin} className="text-white bg-gray-900 p-4 rounded-full hover:bg-white hover:text-black cursor-pointer">
      Login
    </button>
  );
};

export default LoginButton;