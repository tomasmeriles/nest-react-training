import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import z from 'zod';
import { authService } from '../../services/auth.service';
import { AxiosError } from 'axios';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
import { loginSchema } from './login.schema';

export function useLogin() {
  const router = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: () => router('/home'),
    onError: (error) => {
      let message = 'An error occurred';

      if (error instanceof AxiosError) {
        message = error.response?.data?.message ?? message;
      }

      const id = toast('Error', {
        description: message,
        action: {
          label: 'Close',
          onClick: () => toast.dismiss(id),
        },
      });
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    mutate(values);
  }

  return { form, onSubmit, isPending };
}
