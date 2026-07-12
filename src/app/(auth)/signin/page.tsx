import SignInForm from "@/components/authPages/SignInForm";
import PetLoadingScreen from "@/components/ui/PetLoadingScreen";
import { Suspense } from "react";

export default function SignInPage() {
  return (
    <Suspense fallback={<PetLoadingScreen />}>
      <SignInForm />
    </Suspense>
  );
}
