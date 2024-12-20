import DataForm from "@/components/shared/form/data-form";
import { DeletePromp } from "@/components/shared/table/DeletePromp";
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
import { useActionStore } from "@/store/actionStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react/dist/iconify.js";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { PageListingType } from "../../transactionDetails/_components/setting";
import { pageConfig } from "./config";
import { pageFormConfig } from "./schema/transaction";

export type TActionOptions = "edit" | "delete" | "create" | any;

export type TAction = {
  name: TActionOptions;
  icon: string;
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

  type TPageFormSchema = z.infer<typeof pageFormConfig.schema>;

  const userForm = useForm<TPageFormSchema>({
    resolver: zodResolver(pageFormConfig.schema),
    defaultValues: pageFormConfig.defaultValues,
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
        {} as Partial<TPageFormSchema>
      );

      // Update form values dynamically
      Object.keys(populatedData).forEach((key) => {
        userForm.setValue(
          key as keyof TPageFormSchema,
          populatedData[key as keyof TPageFormSchema]
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
          <DataForm<PageListingType["data"][0]>
            onFormSubmit={handleFormSubmit}
            form={userForm}
            field={pageFormConfig.field}
            pageConfig={pageConfig}
            deleteRecord={pageConfig.method.deleteRecord}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
