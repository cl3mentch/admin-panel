/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataForm from "@/components/shared/form/data-form";
import { TActionOptions } from "@/components/shared/table/data-actions";
import EnumAPI from "@/lib/api/enum";
import { onTranslateBackendError } from "@/lib/helper";
import { TWalletBalance } from "@/lib/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createRecord,
  getBalance,
  getRecord,
  updateRecord,
} from "../../_components/config/page-action";
import CustomBalanceForm from "./custom-form/CustomBalanceForm";
import {
  balanceDefaultValues,
  balanceFieldConfig,
  balanceFormSchema,
} from "./schema/balanceSchema";
import {
  defaultValues,
  userDetailFieldConfig,
  userFormSchema,
} from "./schema/userSchema";

interface FormPageProps {
  slug: TActionOptions;
  userId?: string;
}

export default function FormPage({ slug, userId }: FormPageProps) {
  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="p-3 space-y-3"
    >
      <UserForm slug={slug} userId={userId} />
      {slug !== "create" ? <BalanceForm slug={slug} userId={userId} /> : null}
    </motion.div>
  );
}

export function UserForm({ slug, userId }: FormPageProps) {
  type TUserFormSchema = z.infer<typeof userFormSchema>;

  const userForm = useForm<TUserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const getAccountStatusEnum = async () => {
    const result = await EnumAPI.listing<TAccountStatusEnum>("account_status");
    if (result.success) {
      userDetailFieldConfig.find((config) => {
        if (config.name === "status" && config.component === "select") {
          config.options = Object.values(result.data);
        }
      });
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  const handleFormSubmit = async (values: any) => {
    try {
      let result;
      if (slug === "create") {
        result = await createRecord({ ...values });
      } else if (slug === "edit" && userId) {
        result = await updateRecord(userId, { ...values });
      }

      if (result && result.success) {
        const successMessage =
          slug === "create" ? "Created Successfully" : "Updated Successfully";

        // Reset the form
        slug === "create" ? userForm.reset() : null;

        toast.success(successMessage);
      } else {
        onTranslateBackendError(result!.data);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  const getViewFormDetails = async () => {
    const result = await getRecord(userId!);
    if (result.success) {
      const populatedData = Object.keys(userForm.getValues()).reduce(
        (acc, key) => {
          // @ts-ignore
          acc[key] = result.data[key] ?? "";
          return acc;
        },
        {} as Partial<TUserFormSchema>
      );

      // Update form values dynamically after fetching the data
      Object.keys(populatedData).forEach((key) => {
        userForm.setValue(
          key as keyof TUserFormSchema,
          populatedData[key as keyof TUserFormSchema]
        );
      });
    } else {
      toast.error("Failed to get form data");
    }
  };

  useEffect(() => {
    if ((slug === "view" || slug === "edit") && userId) {
      getViewFormDetails();
      getAccountStatusEnum();
    }
  }, [slug]);
  return (
    <DataForm
      id={userId}
      slug={slug}
      onFormSubmit={handleFormSubmit}
      form={userForm}
      fieldConfig={userDetailFieldConfig}
      title={
        slug === "view"
          ? "View User Information"
          : slug === "edit"
          ? "Edit User Information"
          : slug === "create"
          ? "Create User"
          : ""
      }
    />
  );
}

export function BalanceForm({ slug, userId }: FormPageProps) {
  type TWalletEnumArray = Array<TWalletEnum[keyof TWalletEnum]>;
  type TBalanceFormSchema = z.infer<typeof balanceFormSchema>;

  const [walletEnumList, setWalletEnumList] = useState<TWalletEnumArray>();
  const [update, setUpdate] = useState(false);

  const balanceForm = useForm<TBalanceFormSchema>({
    resolver: zodResolver(balanceFormSchema),
    defaultValues: balanceDefaultValues,
  });

  const getWalletEnum = async () => {
    const result = await EnumAPI.listing<TWalletEnum>("wallet");
    if (result.success) {
      // Convert into an array
      const walletEnumArray = Object.values(result.data);
      setWalletEnumList(walletEnumArray);
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  const getViewFormDetails = async () => {
    const result = await getBalance(userId!);
    if (result.success) {
      // Iterate over the result data and populate the form
      const populatedData = result.data.reduce((acc, { code, amount }) => {
        // @ts-ignore
        acc[code as TWalletBalance["code"]] = parseFloat(
          Number(amount).toFixed(4)
        );
        return acc;
      }, {} as Partial<TBalanceFormSchema>);

      // Update form values dynamically after fetching the data
      Object.keys(populatedData).forEach((key) => {
        balanceForm.setValue(
          key as keyof TBalanceFormSchema,
          populatedData[key as keyof TBalanceFormSchema]!
        );
      });
    } else {
      toast.error("Failed to get form data");
    }
  };

  useEffect(() => {
    if ((slug === "view" || slug === "edit") && userId) {
      getViewFormDetails();
      getWalletEnum();
    }
  }, [slug, update]);
  return (
    <CustomBalanceForm
      id={userId}
      slug={slug}
      form={balanceForm}
      fieldConfig={balanceFieldConfig}
      walletEnumList={walletEnumList}
      setUpdate={setUpdate}
      title={
        slug === "view"
          ? "View User Balance"
          : slug === "edit"
          ? "Edit User Balance"
          : ""
      }
    />
  );
}
