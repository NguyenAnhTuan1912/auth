import React from 'react'
import { useNavigate } from 'react-router-dom';

// Import apis
import { Auth_API } from 'src/apis';

// Import utils
import { BrowserStorageUtils, SessionStorageKeys } from 'src/utils/browser_storage';

// Import layouts
import FormLayoutData from 'src/layouts/form/FormLayoutData';

// Import components
import Button from '../buttons/Button';
import LoadingIndicator from '../loading_indicator/LoadingIndicator';
import { openSnackbar } from '../modal_items/utils';

// Import route configs
// import { RouteNames } from 'src/routes.config';

// Import data for form building
import __ActivateAccountFormContent__ from "src/assets/forms/activate_account_form.json" 

// Import types
import type { FormPromptDataProps } from 'src/types/form';

export default function ActivateAccount() {
  const [isActivating, setIsActivating] = React.useState(false);
  const navigate = useNavigate();
  const __FormContentData__ = React.useMemo(function() {
    return __ActivateAccountFormContent__ as any as FormPromptDataProps;
  }, []);
  
  return (
    <FormLayoutData
      className="block max-w-sm w-full"
      data={__FormContentData__}
      handleOnSubmit={function(formData) {
        const { code } = formData;
        const username = BrowserStorageUtils.getItem<string>(SessionStorageKeys.username);

        if(!username) {
          openSnackbar({ headerColor: "error", content: "Username is required" });
          navigate("/");
          return;
        }

        setIsActivating(true);

        Auth_API
          .activateAccountAsync({ username, code })
          .then(result => {
            let message = "";
            let snackbarHeaderColor = "";
            if(result.error) {
              message = result.error.message as string;
              snackbarHeaderColor = "error";
            }

            if(result.success) {
              message = result.success.message as string;
              snackbarHeaderColor = "success";
            }

            openSnackbar({ headerColor: snackbarHeaderColor as any, content: message });
            navigate("/");
            setIsActivating(false);
          })
      }}
      actionElements={
        <Button
          key="submit"
          extendClassName="flex items-center justify-center w-full"
          type="submit"
          disabled={isActivating}
        >
          {
            isActivating
              ? <LoadingIndicator text={<p className="text-on-primary ms-3">Vui lòng chờ...</p>} />
              : "Kích hoạt tài khoản"
          }
        </Button>
      }
    />
  )
}