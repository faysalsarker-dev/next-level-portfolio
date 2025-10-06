"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FieldValues, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Lock, Mail } from "lucide-react";
import { fetchWithTag } from "@/lib/fetchWithTag";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
const router = useRouter();

  const form = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });


const onSubmit = async (values: FieldValues) => {
  try {
    setLoading(true);

    const result = await fetchWithTag(`/user/login`, {
      method: "POST",
      data: values,
      isFormData: false,
      tag: "auth",
    });

    if (!result?.success) {
      throw new Error(result?.message || "Login failed");
    }

toast({
  title: "Login Successful",
  description: "You have been logged in successfully.",
  duration: 1500,
});

     setTimeout(() => {
      router.push("/dashboard"); 
    }, 250);


  } catch (err) {
    console.error(err);
    toast({
      title: "Error",
      description: "Login failed. Please try again.",
      variant: "destructive",
    });
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="relative flex justify-center items-center min-h-screen ">
      {/* background gradient light */}

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-card/70 dark:bg-gray-800/70 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/20"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-90">
            Welcome Back 👋
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Login to your dashboard account
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="you@example.com"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                      <Input
                        type="password"
                        placeholder="••••••••"
                        className="pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

        

            <Button
              type="submit"
              className="w-full mt-2 rounded-full text-white font-medium tracking-wide transition-all duration-300"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Form>


      </motion.div>
    </div>
  );
}
