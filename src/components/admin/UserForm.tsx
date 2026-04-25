'use client';

import { useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, User, Mail, Shield, Key, Save, UserPlus, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { createUser, updateUser } from '@/actions/users/manage-user';
import { adminUserInputSchema, updateUserSchema } from '@/lib/validators/user';
import { notifications } from '@/lib/toast';
import type { UserSummary } from '@/interfaces';
import { z } from 'zod';

interface UserFormProps {
  user?: UserSummary;
  isEdit?: boolean;
}

export function UserForm({ user, isEdit = false }: UserFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const schema = isEdit ? updateUserSchema : adminUserInputSchema;

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: user?.name ?? '',
      email: user?.email ?? '',
      role: (user?.role as 'user' | 'admin') ?? 'user',
      ...(isEdit ? {} : { password: '' }),
    },
  });

  const onSubmit = async (values: z.infer<typeof schema>) => {
    startTransition(async () => {
      try {
        if (isEdit && user?.id) {
          const result = await updateUser(user.id, values);
          if (result.success) {
            notifications.success('¡Usuario actualizado correctamente!');
            router.push('/admin/users');
            router.refresh();
          } else {
            notifications.error(result.message || 'Error al actualizar el usuario');
          }
        } else {
          const result = await createUser(values as z.infer<typeof adminUserInputSchema>);
          if (result.success) {
            notifications.success('¡Usuario creado correctamente!');
            router.push('/admin/users');
            router.refresh();
          } else {
            notifications.error(result.message || 'Error al crear el usuario');
          }
        }
      } catch (err) {
        console.error('Submit error:', err);
        notifications.error('Ocurrió un error inesperado');
      }
    });
  };

  return (
    <Card className="w-full max-w-2xl mx-auto border-none shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-primary mb-2">
          {isEdit ? <User className="w-6 h-6" /> : <UserPlus className="w-6 h-6" />}
          <CardTitle className="text-2xl font-bold tracking-tight">
            {isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
          </CardTitle>
        </div>
        <CardDescription className="text-muted-foreground">
          {isEdit 
            ? 'Modifica la información del perfil y los permisos del usuario.' 
            : 'Completa los datos para registrar un nuevo usuario en la plataforma.'}
        </CardDescription>
      </CardHeader>
      
      <Separator className="mb-6 opacity-50" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      Nombre Completo
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Ej: Juan Pérez" 
                        {...field} 
                        className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all"
                      />
                    </FormControl>
                    <FormDescription className="text-[10px] flex items-center gap-1">
                      <Info className="w-3 h-3" /> Mínimo 3 caracteres.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Email Field (Only show/editable if relevant) */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-primary" />
                      Correo Electrónico
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="ejemplo@correo.com" 
                        type="email" 
                        {...field} 
                        disabled={isEdit}
                        className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all disabled:opacity-70"
                      />
                    </FormControl>
                    {isEdit && (
                      <FormDescription className="text-[10px]">
                        El correo electrónico no se puede cambiar.
                      </FormDescription>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Role Field */}
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-primary" />
                      Rol de Usuario
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all">
                          <SelectValue placeholder="Selecciona un rol" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="user">Usuario Estándar</SelectItem>
                        <SelectItem value="admin">Administrador</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="text-[10px]">
                      Define los permisos de acceso.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field (Only for new users) */}
              {!isEdit && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel className="flex items-center gap-2">
                        <Key className="w-4 h-4 text-primary" />
                        Contraseña
                      </FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="••••••••" 
                          type="password" 
                          {...field} 
                          className="bg-background/50 border-muted-foreground/20 focus:border-primary transition-all"
                        />
                      </FormControl>
                      <FormDescription className="text-[10px]">
                        Mínimo 6 caracteres.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button 
              type="button" 
              variant="outline" 
              className="w-full sm:w-1/3 order-2 sm:order-1"
              onClick={() => router.back()}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isPending} 
              className="w-full sm:w-2/3 order-1 sm:order-2 bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20 transition-all"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  {isEdit ? <Save className="w-4 h-4 mr-2" /> : <UserPlus className="w-4 h-4 mr-2" />}
                  {isEdit ? 'Guardar Cambios' : 'Crear Usuario'}
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}