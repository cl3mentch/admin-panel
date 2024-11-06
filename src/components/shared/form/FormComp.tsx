"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { UseFormReturn } from "react-hook-form";

interface FormProps {
  title: string;
  form: UseFormReturn | any;
  fieldConfig: TFieldConfig[];
}

export default function FormComp({ title, form, fieldConfig }: FormProps) {
  function onSubmit(values: any) {
    console.log(values);
  }
  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                            <FormLabel>{config.label}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your name"
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
                            <FormLabel>{config.name}</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={config.placeholder}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {config?.options &&
                                  config.options.map((option) => (
                                    <SelectItem value={option}>
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
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
