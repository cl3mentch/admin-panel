export type InputType =
  | "text"
  | "email"
  | "password"
  | "number"
  | "tel"
  | "url"; // Extend as needed

/**
 *  the @TFieldConfig name needs to be the same as the schema name or else it wont work
 */
export type TFieldConfig =
  | {
      name: string;
      label: string;
      component: "input";
      type: InputType;
      placeholder: string;
      isRequired: boolean;
    }
  | {
      name: string;
      label: string;
      component: "select";
      placeholder: string;
      options: string[];
      isRequired: boolean;
      type?: never;
    };
