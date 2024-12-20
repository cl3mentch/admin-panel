"use client";
import { Button } from "@/components/ui/button";
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
import { onTranslateBackendError } from "@/lib/helper";
import { TFieldConfig } from "@/lib/types/formType";
import React, { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";
import { pageConfig } from "../config/config";

interface FormProps<TColumn> {
  id?: string | undefined;
  form: UseFormReturn | any;
  field: TFieldConfig[];
  walletEnumList: Array<TWalletEnum[keyof TWalletEnum]> | undefined;
  setUpdate: (update: boolean) => void;
}

export default function CustomBalanceForm<TColumn>({
  id,
  form,
  field,
  walletEnumList,
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
      <Form {...form}>
        <form className="space-y-8">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {field.map((config, i) => {
              switch (config.component) {
                case "input":
                  return (
                    <React.Fragment key={i}>
                      <LocalInput config={config} form={form} />
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

  const [loading, setLoading] = useState(false);

  const handleWalletChange = (value: string) => {
    setInputData((prev) => ({ ...prev, selectedWallet: value }));
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputData((prev) => ({ ...prev, amount: Number(e.target.value) }));
  };

  const onActionBalance = async () => {
    setLoading(true);
    let result;
    if (action === "add" && id) {
      result = await pageConfig.customMethod!.addBalance(
        id,
        Number(inputData.selectedWallet),
        inputData.amount
      );
    } else if (action === "deduct" && id) {
      result = await pageConfig.customMethod!.deductBalance(
        id,
        Number(inputData.selectedWallet),
        inputData.amount
      );
    }
    if (result?.success) {
      setTimeout(() => {
        setUpdate!(true);
        setInputData({
          selectedWallet: "",
          amount: 0,
        });
        setShowModal(false);
        setLoading(false);
        toast.success(
          action === "add" ? "Added Successfully" : "Deducted Successfully"
        );
      }, 1000);
    } else {
      onTranslateBackendError(result?.data);
    }
  };

  useEffect(() => {
    if (showModal) {
      setInputData({
        selectedWallet: "",
        amount: 0,
      });
    }
  }, [showModal]);

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
            disabled={loading}
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
