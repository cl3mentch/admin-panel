/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataForm from "@/components/shared/form/data-form";
import { TActionOptions } from "@/components/shared/table/data-actions";
import { onTranslateBackendError } from "@/lib/helper";
import { TUserList, TWalletBalance } from "@/lib/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getWalletEnum } from "@/lib/service/getEnum";
import { pageConfig } from "../config/config";
import CustomBalanceForm from "../custom/CustomBalanceForm";
import { balanceFormConfig } from "../schema/balance";
import { userFormConfig } from "../schema/user";

interface FormPageProps {
  slug: TActionOptions;
  recordId?: string;
}

export default function FormPage({ slug, recordId }: FormPageProps) {
  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="p-3 space-y-3 w-full flex flex-col "
    >
      {/* The default form in the page */}
      <Form slug={slug} recordId={recordId} />
      {/* Custom Form */}
      {slug !== "create" ? (
        <BalanceForm slug={slug} recordId={recordId} />
      ) : null}
    </motion.div>
  );
}

export function Form({ slug, recordId }: FormPageProps) {
  type TUserFormSchema = z.infer<typeof userFormConfig.schema>;

  const userForm = useForm<TUserFormSchema>({
    resolver: zodResolver(userFormConfig.schema),
    defaultValues: userFormConfig.defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = async (values: any) => {
    try {
      let result;

      if (slug === "create") {
        result = await pageConfig.method.createRecord({ ...values });
      } else if (slug === "edit" && recordId) {
        result = await pageConfig.method.updateRecord(recordId, { ...values });
      }

      if (result?.success) {
        const successMessage =
          slug === "create" ? "Created Successfully" : "Updated Successfully";

        // Reset the form
        if (slug == "create") {
          Object.keys(userFormConfig.defaultValues).forEach((key) => {
            userForm.setValue(
              key as keyof TUserFormSchema,
              userFormConfig.defaultValues[key as keyof TUserFormSchema]
            );
          });
        }

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
    const result = await pageConfig.method.getRecord(recordId!);
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
    if ((slug === "view" || slug === "edit") && recordId) {
      getViewFormDetails();
    }
  }, [slug, recordId]);

  return (
    <DataForm<TUserList["data"][0]>
      id={recordId}
      slug={slug}
      onFormSubmit={handleFormSubmit}
      form={userForm}
      field={userFormConfig.field}
      pageConfig={pageConfig}
      deleteRecord={pageConfig.method.deleteRecord}
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

/**
 * Custom Form
 * You may import or write your custom form here
 * */

export function BalanceForm({ slug, recordId }: FormPageProps) {
  type TWalletEnumArray = Array<TWalletEnum[keyof TWalletEnum]>;
  type TBalanceFormSchema = z.infer<typeof balanceFormConfig.schema>;

  const [walletEnumList, setWalletEnumList] = useState<TWalletEnumArray>();
  const [update, setUpdate] = useState(false);

  const balanceForm = useForm<TBalanceFormSchema>({
    resolver: zodResolver(balanceFormConfig.schema),
    defaultValues: balanceFormConfig.defaultValues,
  });

  const getViewFormDetails = async () => {
    const result = await pageConfig.customMethod!.getBalance(recordId!);
    if (result.success) {
      // Iterate over the result data and populate the form
      // @ts-ignore
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
    if ((slug === "view" || slug === "edit") && recordId) {
      getViewFormDetails();
      (async () => setWalletEnumList(await getWalletEnum()))();
    }
  }, [slug, update]);
  return (
    <CustomBalanceForm
      id={recordId}
      slug={slug}
      form={balanceForm}
      field={balanceFormConfig.field}
      walletEnumList={walletEnumList}
      pageConfig={pageConfig}
      setUpdate={setUpdate}
      title={
        slug === "view"
          ? "View Record"
          : slug === "edit"
          ? "Edit Record"
          : slug === "create"
          ? "Create Record"
          : ""
      }
    />
  );
}
