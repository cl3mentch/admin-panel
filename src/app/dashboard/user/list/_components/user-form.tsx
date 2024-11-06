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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { fieldConfig } from "./form/fieldconfig";
import { defaultValues, formSchema } from "./form/schema";

type TFormData = z.infer<typeof formSchema>;

export default function EmployeeForm() {
  const form = useForm<TFormData>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  function onSubmit(values: TFormData) {
    console.log(values);
  }

  return (
    <Card className="mx-auto w-full">
      <CardHeader>
        <CardTitle className="text-left text-2xl font-bold">
          Employee Information
        </CardTitle>
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
                        name={config.name as keyof TFormData}
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
