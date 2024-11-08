"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TFieldConfig } from "@/lib/types/formType";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import DataAction, { TActionOptions } from "../table/data-actions";
import React from "react";
import { TPageConfig } from "@/lib/types/commonType";

interface FormProps<TColumn> {
  id?: string | undefined;
  slug: TActionOptions;
  title: string;
  form: UseFormReturn | any;
  field: TFieldConfig[];
  pageConfig: TPageConfig<TColumn>;
  onFormSubmit: (values: any) => void;
}

export default function DataForm<TColumn>({
  id,
  slug,
  title,
  form,
  field,
  pageConfig,
  onFormSubmit,
}: FormProps<TColumn>) {
  const checkboxValue = form.watch("check"); // Watch the checkbox value

  function onSubmit(values: any) {
    onFormSubmit(values);
    uncheck();
  }

  function uncheck() {
    form.reset({
      ...form.getValues(), // Preserve the other values if needed
      check: false, // Reset the checkbox to false
    });
  }

  return (
    <Card className="mx-auto h-full w-full">
      <CardHeader className="p-3 xl:p-6 xl:pb-4">
        <CardTitle className="text-left text-2xl font-bold text-foreground">
          <div className="flex justify-between items-center">
            {title}

            {slug === "view" && id ? (
              <DataAction actions={pageConfig.actions} data={{ id }} />
            ) : null}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3 xl:p-6 xl:pt-0">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
              {field.map((config, i) => {
                switch (config.component) {
                  case "input":
                    return (
                      <React.Fragment key={i}>
                        <LocalInput config={config} slug={slug} form={form} />
                      </React.Fragment>
                    );
                  case "select":
                    return (
                      <React.Fragment key={i}>
                        <LocalSelect config={config} slug={slug} form={form} />
                      </React.Fragment>
                    );

                  case "date":
                    return (
                      <React.Fragment key={i}>
                        <LocalDate config={config} slug={slug} form={form} />
                      </React.Fragment>
                    );
                  default:
                    return null;
                }
              })}
            </div>
            {slug !== "view" ? (
              <>
                {field.map((config, i) => {
                  switch (config.component) {
                    case "checkbox":
                      return (
                        <React.Fragment key={i}>
                          <LocalCheckBox field={field} form={form} />
                        </React.Fragment>
                      );
                    default:
                      return null;
                  }
                })}
                <Button
                  disabled={!checkboxValue}
                  type="submit"
                  className="w-full xl:w-fit"
                >
                  Submit
                </Button>
              </>
            ) : null}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}

/**
 * INPUT COMPONENT
 * */
type InputFieldConfig = Extract<TFieldConfig, { component: "input" }>;
interface LocalInputProps extends Partial<FormProps<any>> {
  config: InputFieldConfig;
}

function LocalInput({ config, form, slug }: LocalInputProps) {
  return (
    <FormField
      control={form.control}
      name={config.name}
      render={({ field: inputField }) => (
        <FormItem>
          <FormLabel className="text-foreground">
            {config.label}{" "}
            {slug !== "view" ? (
              config.isRequired ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-black/50 dark:text-white/50 text-xs">
                  (Optional)
                </span>
              )
            ) : null}
          </FormLabel>

          <FormControl>
            <Input
              {...inputField}
              readOnly={slug === "view"}
              className="text-foreground"
              placeholder={config.placeholder}
              type={config.type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * SELECT COMPONENT
 **/
type SelectFieldConfig = Extract<TFieldConfig, { component: "select" }>;
interface LocalSelectProps extends Partial<FormProps<any>> {
  config: SelectFieldConfig;
}

function LocalSelect({ config, form, slug }: LocalSelectProps) {
  return (
    <FormField
      key={config.name}
      control={form.control}
      name={config.name}
      render={({ field }) => {
        return (
          <FormItem>
            <FormLabel className="text-foreground">
              {config.label}{" "}
              {slug !== "view" ? (
                config.isRequired ? (
                  <span className="text-red-500">*</span>
                ) : (
                  <span className="text-black/50 dark:text-white/50 text-xs">
                    (Optional)
                  </span>
                )
              ) : null}
            </FormLabel>
            <Select onValueChange={field.onChange} value={field.value}>
              <FormControl>
                <SelectTrigger
                  className={`text-foreground  ${
                    !field.value && "text-black/50 dark:text-white/50"
                  }`}
                  disabled={config.options.length === 0 || slug === "view"}
                >
                  <SelectValue placeholder={config.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {config?.options &&
                  config.options.map((option, i) => (
                    <SelectItem
                      key={i}
                      value={option}
                      className="text-foreground hover:bg-accent"
                    >
                      {option}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

/**
 * SELECT COMPONENT
 **/
type DateFieldConfig = Extract<TFieldConfig, { component: "date" }>;
interface LocalDateProps extends Partial<FormProps<any>> {
  config: DateFieldConfig;
}

function LocalDate({ config, form, slug }: LocalDateProps) {
  return (
    <FormField
      key={config.name}
      control={form.control}
      name={config.name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>
            {config.label}{" "}
            {slug !== "view" ? (
              config.isRequired ? (
                <span className="text-red-500">*</span>
              ) : (
                <span className="text-black/50 dark:text-white/50 text-xs">
                  (Optional)
                </span>
              )
            ) : null}
          </FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal text-foreground ",
                    !field.value && "text-black/50 dark:text-white/50"
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>{config.placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                className=""
                disabled={(date) => date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/**
 * CHECKBOX COMPONENT
 **/
function LocalCheckBox({ field, form }: Partial<FormProps<any>>) {
  return (
    <>
      {field?.map((config, i) => {
        switch (config.component) {
          case "checkbox":
            return (
              <FormField
                key={i}
                control={form.control}
                name={config.name}
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 ">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        required={config.isRequired}
                      />
                    </FormControl>
                    <FormLabel className="text-foreground">
                      {config.label}
                    </FormLabel>
                  </FormItem>
                )}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
}
