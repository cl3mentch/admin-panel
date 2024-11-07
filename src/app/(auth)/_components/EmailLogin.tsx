import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useEffect } from "react";
import AuthAPI from "@/lib/api/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/lib/store/userDataStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

// Define form fields with types
interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function EmailLogin() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Watch input fields
    setValue, // For setting initial values
  } = useForm<FormData>(); // Provide FormData type here
  const [viewPassword, setViewPassword] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUser } = useUserStore();

  // Watch password field to track if it's empty or not
  const passwordValue = watch("password");

  // Load saved credentials if "Remember Me" is enabled
  useEffect(() => {
    const savedData = localStorage.getItem("loginData");
    if (savedData) {
      const { email, password, rememberMe } = JSON.parse(savedData);
      if (rememberMe) {
        setValue("email", email);
        setValue("password", password);
        setValue("rememberMe", rememberMe);
      }
    }
  }, [setValue]);

  const onSubmit: SubmitHandler<FormData> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);

    try {
      const auth = await AuthAPI.email.login(data.email, data.password);
      if (auth) {
        toast.success("Login Successful");
        setUser({ email: data.email });
        router.push("/dashboard");

        if (data.rememberMe) {
          const loginData = JSON.stringify({
            email: data.email,
            password: data.password,
            rememberMe: data.rememberMe,
          });
          localStorage.setItem("loginData", loginData);
        } else {
          localStorage.removeItem("loginData");
        }
      } else {
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Input
          type="text"
          placeholder="Enter Your Email Address"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <div className="relative">
          <Input
            type={viewPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 1,
                message: "Password is required",
              },
            })}
          />
          {passwordValue && (
            <button
              type="button" // Prevent form submission
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute right-5 top-[50%] translate-y-[-50%] cursor-pointer"
            >
              {viewPassword ? (
                <Icon icon="weui:eyes-off-outlined" />
              ) : (
                <Icon icon="weui:eyes-on-outlined" />
              )}
            </button>
          )}
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          {...register("rememberMe")}
          id="rememberMe"
          className="cursor-pointer checked:bg-primary checked:text-white"
        />

        <Label htmlFor="rememberMe" className="text-sm cursor-pointer">
          Remember Me
        </Label>
      </div>

      <Button disabled={loading} type="submit" className="w-full">
        {loading ? (
          <Icon icon="eos-icons:bubble-loading" className="w-10 h-10" />
        ) : (
          <>
            <Icon icon="ic:outline-email" />
            Continue With Email
          </>
        )}
      </Button>
    </form>
  );
}
