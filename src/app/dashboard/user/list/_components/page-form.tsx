/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import DataForm from "@/components/shared/form/data-form";
import { TActionOptions } from "@/components/shared/table/data-actions";
import UserAPI from "@/lib/api/user";
import useGetEnum from "@/lib/hooks/useGetEnum";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  defaultValues,
  userDetailFieldConfig,
  userFormSchema,
} from "./config/userSchema";
import { onTranslateBackendError } from "@/lib/helper";

type TUserFormData = z.infer<typeof userFormSchema>;

interface UserFormPageProps {
  slug: TActionOptions;
  userId?: string;
}

export default function UserFormPage({ slug, userId }: UserFormPageProps) {
  useGetEnum(userDetailFieldConfig);
  const userForm = useForm<TUserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange", // Validate on every change
  });

  const handleFormSubmit = async (values: any) => {
    try {
      let result;
      if (slug === "create") {
        result = await UserAPI.create({ ...values });
      } else if (slug === "edit" && userId) {
        result = await UserAPI.update(userId, { ...values });
      }

      if (result && result.success) {
        const successMessage =
          slug === "create" ? "Created Successfully" : "Updated Successfully";
        getViewFormDetails();
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
    const result = await UserAPI.read(userId);
    if (result.success) {
      const populatedData = Object.keys(userForm.getValues()).reduce(
        (acc, key) => {
          // @ts-ignore
          acc[key] = result.data[key] ?? "";
          return acc;
        },
        {} as Partial<TUserFormData>
      );

      // Update form values dynamically after fetching the data
      Object.keys(populatedData).forEach((key) => {
        userForm.setValue(
          key as keyof TUserFormData,
          populatedData[key as keyof TUserFormData]
        );
      });
    } else {
      toast.error("Failed to get form data");
    }
  };

  useEffect(() => {
    if ((slug === "view" || slug === "edit") && userId) {
      getViewFormDetails();
    }
  }, [slug]);

  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="p-3"
    >
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
    </motion.div>
  );
}
