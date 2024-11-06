"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFieldConfig } from "@/lib/types/formType";
import { useState } from "react";
import { set, UseFormReturn } from "react-hook-form";

interface FormProps {
  title: string;
  form: UseFormReturn | any;
  fieldConfig: TFieldConfig[];
  onFormSubmit: (values: any) => void;
}

export default function FormComp({
  title,
  form,
  fieldConfig,
  onFormSubmit,
}: FormProps) {
  const [isChecked, setIsChecked] = useState(false);

  async function validateForm() {
    return await form.trigger();
  }

  async function handleCheckboxChange() {
    const isValid = await validateForm();
    // Trigger validation on the entire form
    if (isValid) {
      setIsChecked(!isChecked);
    }
  }
  function onSubmit(values: any) {
    onFormSubmit(values);
  }
  return (
    <Card className="mx-auto h-full w-full ">
      <CardHeader className="p-3 xl:p-6 xl:pb-4">
        <CardTitle className="text-left text-2xl font-bold text-foreground">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 xl:p-6 xl:pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {fieldConfig.map((config, i) => {
                switch (config.component) {
                  case "input":
                    return (
                      <FormField
                        key={i}
                        control={form.control}
                        name={config.name}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              {config.label}{" "}
                              {config.isRequired ? (
                                <span className="text-red-500">*</span>
                              ) : (
                                <span className="text-black/50 dark:text-white/50 text-xs">
                                  (Optional)
                                </span>
                              )}
                            </FormLabel>

                            <FormControl>
                              <Input
                                className="text-foreground"
                                placeholder={config.placeholder}
                                {...inputField}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  case "select":
                    return (
                      <FormField
                        key={i}
                        control={form.control}
                        name={config.name}
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">
                              {config.label}{" "}
                              {config.isRequired ? (
                                <span className="text-red-500">*</span>
                              ) : (
                                <span className="text-black/50 dark:text-white/50 text-xs">
                                  (Optional)
                                </span>
                              )}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger
                                  className="text-foreground border-border "
                                  disabled={config.options.length === 0}
                                >
                                  <SelectValue
                                    placeholder={config.placeholder}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {config?.options &&
                                  config.options.map((option, i) => (
                                    <SelectItem
                                      key={i}
                                      value={option}
                                      className="text-foreground  hover:bg-accent"
                                    >
                                      {option}
                                    </SelectItem>
                                  ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isChecked}
                id="terms"
                onCheckedChange={handleCheckboxChange}
                className="text-foreground"
              />

              <label
                htmlFor="terms"
                className="text-sm sf-light-font leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-foreground"
              >
                I agree that the information filled above is correct
              </label>
            </div>
            <Button
              disabled={!isChecked}
              type="submit"
              className="w-full xl:w-fit"
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
