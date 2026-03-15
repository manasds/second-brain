"use client" ;
import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
const LoginButton = () => {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };
  return (
    <Button onClick={handleLogin} className="text-white text-md px-8 py-2 bg-black rounded-lg relative shadow-md shadow-cyan-600 ">
      Sign Up 
    </Button>
  );
};

export default LoginButton;