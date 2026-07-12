import SignUpForm from "@/components/authPages/SignUpForm";
import PetLoadingScreen from "@/components/ui/PetLoadingScreen";
import React, { Suspense } from "react";

const SignUpPage: React.FC = () => {
  return (
    <div>
      <Suspense fallback={<PetLoadingScreen />}>
        <SignUpForm />
      </Suspense>
    </div>
  );
};

export default SignUpPage;
