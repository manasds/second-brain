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
    <Button onClick={handleLogin} className="px-4 py-2">
      Login
    </Button>
  );
};

export default LoginButton;