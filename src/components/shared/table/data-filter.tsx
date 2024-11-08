"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
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
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { TFieldConfig } from "@/lib/types/formType";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react/dist/iconify.js";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { useMediaQuery } from "react-responsive";

interface FilterProps {
  form: UseFormReturn | any;
  field: TFieldConfig[];
  onFormSubmit: (values: any) => void;
}

export function Filter({ form, field, onFormSubmit }: FilterProps) {
  const isXl = useMediaQuery({ query: "(min-width: 1280px)" });

  // Watch for changes in all form values
  const formValues = form.watch(); // Get all form values
  const isAllValuesEmpty = Object.values(formValues).every((value) => !value);

  function onSubmit(values: any) {
    onFormSubmit(values);
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"sm"}
          className="text-xs xl:text-sm flex gap-x-0 items-center"
        >
          <Icon icon="mdi:filter-outline" />
          {isXl ? "Add Filter" : null}
        </Button>
      </SheetTrigger>
      <SheetContent className="xl:max-w-[50vw] w-full">
        <SheetHeader>
          <SheetTitle className="text-left">Add Your Filter</SheetTitle>
          <SheetDescription className="text-left text-black/50 dark:text-white/50">
            Make changes to your filter here. Click search when you're done.
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-4 gap-y-6 xl:gap-6 md:grid-cols-2 py-5 h-full">
              {field.map((config, i) => {
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
                              {config.label}
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
                        render={({ field }) => {
                          return (
                            <FormItem>
                              <FormLabel className="text-foreground">
                                {config.label}{" "}
                              </FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                value={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    className={`${
                                      !field.value &&
                                      "text-black/50 dark:text-white/50 border-border"
                                    }`}
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
                          );
                        }}
                      />
                    );
                  case "date":
                    return (
                      <FormField
                        key={i}
                        control={form.control}
                        name={config.name}
                        render={({ field }) => (
                          <FormItem className="flex flex-col">
                            <FormLabel>{config.label}</FormLabel>
                            <Popover modal={true}>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal text-foreground ",
                                      !field.value &&
                                        "text-black/50 dark:text-white/50"
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
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  className=""
                                  disabled={(date) =>
                                    date < new Date("1900-01-01")
                                  }
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
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
            <SheetFooter className="flex flex-col xl:flex-row gap-3">
              <Button
                type="reset"
                variant={"outline"}
                className="w-full text-foreground"
                onClick={() => form.reset()}
              >
                <Icon icon="ri:reset-left-fill" />
                Reset
              </Button>
              <SheetClose asChild>
                <Button className="w-full" type="submit">
                  <Icon icon="material-symbols:search" />
                  Search
                </Button>
              </SheetClose>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
