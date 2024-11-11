/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataForm from "@/components/shared/form/data-form";
import { TActionOptions } from "@/components/shared/table/data-actions";
import { onTranslateBackendError } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { pageConfig } from "../config/config";
import { userFormConfig } from "../schema/adminPermission";

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
      {/* {slug !== "create" ? (
      ) : null} */}
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
    <DataForm<typeof pageConfig.columns | any>
      id={recordId}
      slug={slug}
      onFormSubmit={handleFormSubmit}
      form={userForm}
      field={userFormConfig.field}
      pageConfig={pageConfig}
      deleteRecord={pageConfig.method.deleteRecord}
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

/**
 * Custom Form
 * You may import or write your custom form here
 * */
