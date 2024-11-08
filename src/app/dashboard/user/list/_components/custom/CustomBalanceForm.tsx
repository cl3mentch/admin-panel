"use client";
import DataAction, {
  TActionOptions,
} from "@/components/shared/table/data-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import UserAPI from "@/lib/api/user";
import { onTranslateBackendError } from "@/lib/helper";
import { TPageConfig } from "@/lib/types/commonType";
import { TFieldConfig } from "@/lib/types/formType";
import React, { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

interface FormProps<TColumn> {
  id?: string | undefined;
  slug: TActionOptions;
  title: string;
  form: UseFormReturn | any;
  field: TFieldConfig[];
  walletEnumList: Array<TWalletEnum[keyof TWalletEnum]> | undefined;
  pageConfig: TPageConfig<TColumn>;
  setUpdate: (update: boolean) => void;
}

export default function CustomBalanceForm<TColumn>({
  id,
  slug,
  title,
  form,
  field,
  walletEnumList,
  pageConfig,
  setUpdate,
}: FormProps<TColumn>) {
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState<"add" | "deduct" | undefined>(undefined);

  const onSelectAction = (actionParam: typeof action) => {
    if (actionParam === "add") {
      setAction("add");
      setShowModal(true);
    } else {
      setAction("deduct");
      setShowModal(true);
    }
  };

  return (
    <>
      <Card className="mx-auto h-full w-full ">
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
            <form className="space-y-8">
              <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                {field.map((config, i) => {
                  switch (config.component) {
                    case "input":
                      return (
                        <React.Fragment key={i}>
                          <LocalInput config={config} form={form} slug={slug} />
                        </React.Fragment>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </form>
          </Form>
          <div className="flex items-center gap-x-2 mt-5">
            <Button onClick={() => onSelectAction("add")}>Add</Button>
            <Button
              onClick={() => onSelectAction("deduct")}
              className="bg-red-500 hover:bg-red-500/90"
            >
              Deduct
            </Button>
          </div>
          <BalancePrompt
            id={id}
            showModal={showModal}
            setShowModal={setShowModal}
            walletEnumList={walletEnumList}
            action={action}
            setUpdate={setUpdate}
          />
        </CardContent>
      </Card>
    </>
  );
}

/**
 * INPUT COMPONENT
 * */
type InputFieldConfig = Extract<TFieldConfig, { component: "input" }>;
interface LocalInputProps extends Partial<FormProps<any>> {
  config: InputFieldConfig;
}

function LocalInput({ config, form }: LocalInputProps) {
  return (
    <FormField
      key={config.name}
      control={form.control}
      name={config.name}
      render={({ field: inputField }) => (
        <FormItem>
          <FormLabel className="text-foreground">{config.label} </FormLabel>

          <FormControl>
            <Input
              {...inputField}
              readOnly
              className="text-foreground"
              type={config.type}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

interface BalancePrompProps extends Partial<FormProps<any>> {
  id?: string;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  action: "add" | "deduct" | undefined;
}

function BalancePrompt({
  id,
  showModal,
  setShowModal,
  action,
  walletEnumList,
  setUpdate,
}: BalancePrompProps) {
  const [inputData, setInputData] = useState({
    selectedWallet: "",
    amount: 0,
  });

  const handleWalletChange = (value: string) => {
    setInputData((prev) => ({ ...prev, selectedWallet: value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, amount: Number(e.target.value) }));
  };

  const onActionBalance = async () => {
    let result;
    if (action === "add" && id) {
      result = await UserAPI.balance.add(
        id,
        Number(inputData.selectedWallet),
        inputData.amount
      );
    } else if (action === "deduct" && id) {
      result = await UserAPI.balance.deduct(
        id,
        Number(inputData.selectedWallet),
        inputData.amount
      );
    }
    if (result?.success) {
      setTimeout(() => {
        setUpdate!(true);
        toast.success(
          action === "add" ? "Added Successfully" : "Deducted Successfully"
        );
      }, 1000);
    } else {
      onTranslateBackendError(result?.data);
    }
    setInputData({
      selectedWallet: "",
      amount: 0,
    });
    setShowModal(false);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {action === "add" ? "Add Balance" : "Deduct Balance"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Make changes to your balance here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 w-full">
          <div className="flex items-center gap-x-5 w-full">
            <Label htmlFor="wallet" className="text-right">
              Wallet
            </Label>
            <Select
              required
              onValueChange={handleWalletChange}
              value={inputData.selectedWallet}
            >
              <SelectTrigger className="border-border">
                <SelectValue placeholder="Select a wallet" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel className="text-muted-foreground font-normal">
                    Select a wallet
                  </SelectLabel>
                  {walletEnumList?.map((walletEnum, i) => (
                    <SelectItem
                      className="text-foreground"
                      key={i}
                      value={String(i + 1)}
                    >
                      {walletEnum}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-x-2">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <Input
              id="amount"
              disabled={!inputData.selectedWallet}
              value={inputData.amount}
              onChange={handleAmountChange}
              type="number"
              className="w-full"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            className="capitalize"
            onClick={onActionBalance}
          >
            {action}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
