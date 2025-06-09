
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Eye, EyeOff, Package, Users, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["admin", "manager", "operator"], {
    required_error: "Please select a role",
  }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      role: undefined,
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    try {
      console.log('Attempting login with:', { email: values.email, role: values.role });
      
      const response = await authApi.login({
        email: values.email,
        password: values.password,
        role: values.role,
      });

      console.log('Login response:', response.data);

      // Store auth token and user role
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('userRole', values.role);
      localStorage.setItem('userEmail', values.email);

      toast({
        title: "Login Successful",
        description: `Welcome back! Logged in as ${values.role}`,
      });

      // Navigate to dashboard
      navigate('/');
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials or server error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const roleOptions = [
    {
      value: "admin",
      label: "Administrator",
      description: "Full system access and management",
      icon: BarChart3,
      color: "text-red-600",
    },
    {
      value: "manager",
      label: "Manager",
      description: "Inventory and team management",
      icon: Users,
      color: "text-blue-600",
    },
    {
      value: "operator",
      label: "Operator",
      description: "Product tracking and updates",
      icon: Package,
      color: "text-green-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">PLM</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-slate-800">
            Logistics Pro Login
          </CardTitle>
          <CardDescription>
            Sign in to access your logistics management system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Role</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Choose your role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {roleOptions.map((role) => (
                          <SelectItem key={role.value} value={role.value}>
                            <div className="flex items-center space-x-2">
                              <role.icon className={`h-4 w-4 ${role.color}`} />
                              <div>
                                <div className="font-medium">{role.label}</div>
                                <div className="text-xs text-slate-500">{role.description}</div>
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 pt-4 border-t border-slate-200">
            <div className="text-center text-sm text-slate-600">
              Demo Credentials:
            </div>
            <div className="mt-2 space-y-1 text-xs text-slate-500">
              <div>Admin: admin@logistics.com / admin123</div>
              <div>Manager: manager@logistics.com / manager123</div>
              <div>Operator: operator@logistics.com / operator123</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
