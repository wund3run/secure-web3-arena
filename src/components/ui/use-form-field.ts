import * as React from "react";
import { useFormContext } from "react-hook-form";

export const FormFieldContext = React.createContext<{
  name: string;
}>({} as any);

export const FormItemContext = React.createContext<{
  id: string;
}>({} as any);

export const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const formContext = useFormContext();

  if (!formContext) {
    throw new Error("useFormField must be used within a Form component");
  }

  const { getFieldState, formState } = formContext;

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};
