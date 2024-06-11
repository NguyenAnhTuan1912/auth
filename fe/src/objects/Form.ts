import {
  GroupInputsDataProps,
  TextInputDataProps,
  GroupChipInputsDataProps,
  SelectDataProps,
  GroupSelectDataProps,
  FormElementValuesProps,
  FormPromptDataProps
} from "src/types/form"

export class Form {
  static setValuesToFormElement(formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement, values: any) {
    if(formEle instanceof HTMLInputElement) {
      formEle.value = values;
    }
  
    if(formEle instanceof HTMLSelectElement) {
      formEle.value = values;
    }
  
    if(formEle instanceof RadioNodeList) {
      if((formEle[0] as HTMLInputElement).type === "radio") {
        formEle.value = values;
      } else {
        formEle.forEach((ele: any) => {
          if(values.includes(ele.value)) ele.checked = true;
        })
      }
    }
  }

  static renderForm(
    form: FormPromptDataProps, 
    renderTextInput?: (input: TextInputDataProps) => JSX.Element,
    renderGroupInput?: (group: GroupInputsDataProps) => JSX.Element,
    renderGroupChipInput?: (group: GroupChipInputsDataProps) => JSX.Element,
    renderSelect?: (select: SelectDataProps) => JSX.Element,
    renderGroupSelect?: (group: GroupSelectDataProps) => JSX.Element,
    formKeys?: Array<string>
  ) {
    const keys = formKeys ? formKeys : Object.keys(form);
  
    return keys.map(key => {
      if(form[key].elementType === "select" && renderSelect) {
        const select = form[key] as SelectDataProps;
        return renderSelect(select);
      }
  
      if(form[key].elementType === "group-select" && renderGroupSelect) {
        const group = form[key] as GroupSelectDataProps;
        return renderGroupSelect(group);
      }
  
      if(form[key].elementType === "group-chip-input" && renderGroupChipInput) {
        const group = form[key] as GroupChipInputsDataProps;
        return renderGroupChipInput(group);
      }
  
      if(form[key].elementType === "group-input" && renderGroupInput) {
        const group = form[key] as GroupInputsDataProps;
        return renderGroupInput(group);
      }
  
      return renderTextInput && renderTextInput(form[key] as TextInputDataProps)
    })
  }

  static handleInputChangeWithCondition(e: React.ChangeEvent<HTMLInputElement>) {
    return function(
      condition: boolean | (() => boolean) | undefined,
      callWhenPass: (text: string) => void,
      callWhenFail: (text: string) => void
    ) {
      const text  = e.target.value;
      if(condition || (typeof condition === "function" && (condition as (() => boolean))())) {
        callWhenPass(text);
      } else {
        callWhenFail(text);
      }
    }
  }
  
  static getValuesOfFormElement(formEle: HTMLInputElement | RadioNodeList | HTMLSelectElement) {
    const data: FormElementValuesProps = {
      values: undefined,
      elementName: undefined
    };
    
    if(formEle instanceof HTMLInputElement) {
      data.values = formEle.value;
      data.elementName = formEle.name;
    }
  
    if(formEle instanceof HTMLSelectElement) {
      let values: Array<string | number> | string | number = [];
      let i = 0;
      
      while(formEle.selectedOptions[i]) {
        values.push(formEle.selectedOptions[0].value);
        i++;
      }
  
      if(values.length === 1) values = values[0];
  
      data.values = values;
      data.elementName = formEle.name;
    }
  
    if(formEle instanceof RadioNodeList) {
      if((formEle[0] as HTMLInputElement).type === "radio") {
        data.values = formEle.value;
        data.elementName = (formEle[0] as HTMLInputElement).name;
      } else {
        data.values = [];
        formEle.forEach(ele => {
          const actualEle = (ele as HTMLInputElement);
          if(!data.elementName) data.elementName = actualEle.name;
          if(actualEle.checked) (data.values as Array<string | number>).push(actualEle.value);
        })
      }
    }
  
    return data;
  }
}