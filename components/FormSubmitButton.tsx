"use client";

import { PacmanLoader } from "react-spinners";
import { useFormStatus } from "react-dom";

const FormSubmitButton = ( { buttonText }: {buttonText: string}) => {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending} className="btn btn-outline mt-4" type="submit">
      {pending ? <PacmanLoader /> : buttonText}
    </button>
  );
};

export default FormSubmitButton;
