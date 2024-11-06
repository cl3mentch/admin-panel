"use client";

import FormComp from "@/components/shared/form/FormComp";
import {
  defaultValues,
  userDetailFieldConfig,
  userFormSchema,
} from "./form/userSchema";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import EnumAPI from "@/lib/api/enum";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import UserAPI from "@/lib/api/user";
import { motion } from "framer-motion";

type TUserFormData = z.infer<typeof userFormSchema>;

export default function UserFormPage({ slug }: any) {
  const [, setForceUpdate] = useState(false);

  const userForm = useForm<TUserFormData>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange", // Validate on every change
  });

  const getAccountStatusEnum = async () => {
    const result = await EnumAPI.listing("account_status");
    if (result.success) {
      userDetailFieldConfig.find((config) => {
        if (config.name === "status" && config.component === "select") {
          config.options = Object.values(result.data);
          setForceUpdate(true);
        }
      });
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  const getWalletEnum = async () => {
    const result = await EnumAPI.listing("wallet");
    if (result.success) {
      userDetailFieldConfig.find((config) => {
        if (config.name === "wallet" && config.component === "select") {
          config.options = Object.values(result.data);
          setForceUpdate(true);
        }
      });
    } else {
      toast.error("Failed to get account status enum");
    }
  };

  const handleFormSubmit = async (values: any) => {
    const result = await UserAPI.create({ ...values });
    if (result.success) {
      toast.success("Created Successfuly");
    } else {
      result.data.forEach((data: any) => toast.error(data));
    }
  };

  useEffect(() => {
    getAccountStatusEnum();
    getWalletEnum();
  }, [slug]);

  return (
    <motion.div
      initial={{ x: "-10vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ stiffness: 10, duration: 0.5 }}
      className="p-3"
    >
      <FormComp
        onFormSubmit={handleFormSubmit}
        form={userForm} // Pass the shape of the schema if needed, or any raw data
        fieldConfig={userDetailFieldConfig}
        title={
          slug === "view"
            ? "View User Information"
            : slug === "edit"
            ? "Edit User Information"
            : slug === "new"
            ? "Create User"
            : ""
        }
      />
    </motion.div>
  );
}
