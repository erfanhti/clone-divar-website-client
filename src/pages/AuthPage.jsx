import  { useState } from "react";
import CheckForm from "../components/AuthForms/CheckForm";
import SendFormPage from "../components/AuthForms/SendFormPage";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendFormPage
          mobile={mobile}
          setMobile={setMobile}
          setStep={setStep}
          setCode={setCode}
        />
      )}
      {step === 2 && (
        <CheckForm
          code={code}
          setCode={setCode}
          mobile={mobile}
          setMobile={setMobile}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default AuthPage;
