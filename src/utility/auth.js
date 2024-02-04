import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

// Utility function to handle session status and redirection
export const useAuth = () => {
  const { data: session, status } = useSession();

  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  const redirectToLogin = () => {
    return redirect("/login");
  };

  // Call this function to redirect if the user is not authenticated
  const requireAuth = () => {
    if (!isLoading && !isAuthenticated) {
      redirectToLogin();
    }
  };

  return { session, status, isLoading, isAuthenticated, requireAuth };
};
