import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { onTranslateBackendError } from "@/lib/helper";
import { TUserList } from "@/lib/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { userFormConfig } from "../schema/user";
import { pageConfig } from "./config";
import DataForm from "./data-form";
import { DeletePromp } from "@/components/shared/table/DeletePromp";
import { useActionStore } from "@/store/actionStore";
import { balanceFormConfig } from "../schema/balance";
import { getWalletEnum } from "@/lib/service/getEnum";
import CustomBalanceForm from "../custom/CustomBalanceForm";

export type TActionOptions = "edit" | "delete" | "create" | any;

export type TAction = {
  name: TActionOptions;
  icon: string;
  param: string;
}[];

interface ActionProps<TData extends Record<string, any>> {
  data: TData;
  actions: TAction;
  deleteRecord: (id: string) => void;
}

export default function DataAction<TData extends Record<string, any>>({
  data,
  actions,
  deleteRecord,
}: ActionProps<TData>) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewBalance, setShowViewBalanceModal] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4 text-black dark:text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel className="text-sm py-[2px]">
            Action ({data.id})
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          {actions.map((option, i) => (
            <DropdownMenuItem key={i} className=" py-[2px]">
              <button
                onClick={() =>
                  option.name === "edit"
                    ? setShowEditModal(true)
                    : option.name === "View Balance"
                    ? setShowViewBalanceModal(true)
                    : setShowDeleteModal(true)
                }
                className="flex items-center gap-x-2 w-full capitalize"
              >
                <Icon icon={option.icon} />
                {option.name}
              </button>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Modal */}

      <DeletePromp
        id={data.id}
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        deleteRecord={deleteRecord}
      />
      <EditModal
        data={data}
        showModal={showEditModal}
        setShowModal={setShowEditModal}
      />

      <ViewBalanceModal
        data={data}
        showModal={showViewBalance}
        setShowModal={setShowViewBalanceModal}
      />
    </>
  );
}

// Default Edit Record Modal
interface IEditModalProps {
  data: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function EditModal({ showModal, data, setShowModal }: IEditModalProps) {
  const { setAction } = useActionStore();

  type TUserFormSchema = z.infer<typeof userFormConfig.schema>;

  const userForm = useForm<TUserFormSchema>({
    resolver: zodResolver(userFormConfig.schema),
    defaultValues: userFormConfig.defaultValues,
    mode: "onChange",
  });

  const handleFormSubmit = async (values: any) => {
    try {
      let result;

      result = await pageConfig.method.updateRecord(data.id, { ...values });

      if (result.success) {
        setTimeout(() => {
          // updates the action state to inform other component it has been updated
          setAction({ delete: true });
          setShowModal(false);
          toast.success(`Record ID ${data.id} has been updated.`);
        }, 1000);
      } else {
        onTranslateBackendError(result!.data);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      toast.error("An error occurred, please try again.");
    }
  };

  useEffect(() => {
    if (showModal) {
      const populatedData = Object.keys(userForm.getValues()).reduce(
        (acc, key) => {
          // @ts-ignore
          acc[key] = data[key] ?? "";
          return acc;
        },
        {} as Partial<TUserFormSchema>
      );

      // Update form values dynamically
      Object.keys(populatedData).forEach((key) => {
        userForm.setValue(
          key as keyof TUserFormSchema,
          populatedData[key as keyof TUserFormSchema]
        );
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showModal]);

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="w-full h-full sm:h-fit sm:max-w-[800px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>Edit Record ({data.id})</DialogTitle>
          <DialogDescription className="text-black/50 dark:text-white/50"></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <DataForm<TUserList["data"][0]>
            onFormSubmit={handleFormSubmit}
            form={userForm}
            field={userFormConfig.field}
            pageConfig={pageConfig}
            deleteRecord={pageConfig.method.deleteRecord}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Custom  Modal
interface IViewBalanceModalProps {
  data: any;
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

export function ViewBalanceModal({
  showModal,
  data,
  setShowModal,
}: IViewBalanceModalProps) {
  type TWalletEnumArray = Array<TWalletEnum[keyof TWalletEnum]>;
  type TBalanceFormSchema = z.infer<typeof balanceFormConfig.schema>;

  const [walletEnumList, setWalletEnumList] = useState<TWalletEnumArray>();
  const [update, setUpdate] = useState(false);

  const balanceForm = useForm<TBalanceFormSchema>({
    resolver: zodResolver(balanceFormConfig.schema),
    defaultValues: balanceFormConfig.defaultValues,
  });

  const onFetchBalance = async () => {
    const result = await pageConfig.customMethod?.getBalance(data.id);

    if (result?.success) {
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
      onTranslateBackendError(result!.data);
    }
  };

  useEffect(() => {
    if (showModal || update) {
      onFetchBalance();
    }

    if (showModal) {
      (async () => setWalletEnumList(await getWalletEnum()))();
    }
  }, [showModal, update]);

  return (
    <Dialog open={showModal} onOpenChange={() => setShowModal(false)}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader className="space-y-3">
          <DialogTitle>View Balance Record ({data.id})</DialogTitle>
          <DialogDescription className="text-black/50 dark:text-white/50"></DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto">
          <CustomBalanceForm
            id={data.id}
            form={balanceForm}
            field={balanceFormConfig.field}
            walletEnumList={walletEnumList}
            setUpdate={setUpdate}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
