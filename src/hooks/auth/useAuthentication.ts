
import { useLogin } from './login/useLogin';
import { useRegister } from './register/useRegister';
import { supabase } from '@/lib/supabase';

export const useAuthentication = () => {
  const { login, isLoading: isLoginLoading } = useLogin();
  const { register, isLoading: isRegisterLoading } = useRegister();

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error) {
      console.error("Logout error:", error);
      return { success: false, error };
    }
  };

  return {
    login,
    logout,
    register,
    isLoading: isLoginLoading || isRegisterLoading
  };
};
