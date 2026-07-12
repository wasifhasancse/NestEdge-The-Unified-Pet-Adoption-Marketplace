import SignUpForm from "@/components/authPages/SignUpForm";
import PetLoadingScreen from "@/components/ui/PetLoadingScreen";
import React, { Suspense } from "react";

export default function SignUpPage()  {
  return (
    <Suspense fallback={<PetLoadingScreen />}>
      <SignUpForm />
    </Suspense>
  );
};
