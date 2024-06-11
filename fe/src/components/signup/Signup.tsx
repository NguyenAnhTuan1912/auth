import React from 'react'

// Import layouts
import FormLayoutData from 'src/layouts/form/FormLayoutData';

// Import components
import Button from '../buttons/Button';
import LoadingIndicator from '../loading_indicator/LoadingIndicator';

// Import data for form building
import __SignupFormContent__ from "src/assets/forms/signup_form.json" 

// Import types
import type { FormPromptDataProps } from 'src/types/form';

export default function Signup() {
  const [isSigningup, setIsSigningup] = React.useState(false);
  const __FormContentData__ = React.useMemo(function() {
    return __SignupFormContent__ as any as FormPromptDataProps;
  }, []);
  
  return (
    <FormLayoutData
      className="block max-w-sm w-full"
      data={__FormContentData__}
      handleOnSubmit={function(formData) {
        const { username, password, confirmedPassword, email } = formData;
        if(password !== confirmedPassword) {
          return;
        }
        setIsSigningup(true);
      }}
      actionElements={
        <Button
          key="submit"
          extendClassName="flex items-center justify-center w-full"
          type="submit"
          disabled={isSigningup}
        >
          {
            isSigningup
              ? <LoadingIndicator text={<p className="text-on-primary ms-3">Vui lòng chờ...</p>} />
              : "Đăng ký"
          }
        </Button>
      }
    />
  )
}