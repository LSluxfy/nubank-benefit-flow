import { supabase } from '@/integrations/supabase/client';
import { HubApiResponse, HubApiError } from '@/types/hubApi';

export const fetchHubData = async (cpf: string): Promise<HubApiResponse> => {
  try {
    const { data, error } = await supabase.functions.invoke('fetch-hub-data', {
      body: { cpf }
    });

    if (error) {
      throw new Error(error.message || 'Erro ao buscar dados');
    }

    if (data.error) {
      throw new Error(data.message || data.error);
    }

    return data as HubApiResponse;
  } catch (error) {
    console.error('Error fetching Hub data:', error);
    throw error;
  }
};

export const formatCpfFromApi = (cpf: string): string => {
  const numbers = cpf.replace(/\D/g, '');
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatDateFromApi = (date: string): string => {
  // Hub API returns date in format "17/07/1981"
  // Convert to YYYY-MM-DD format for HTML date input
  const [day, month, year] = date.split('/');
  return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const formatDisplayDate = (date: string): string => {
  // Convert from YYYY-MM-DD to DD/MM/YYYY for display
  const [year, month, day] = date.split('-');
  return `${day}/${month}/${year}`;
};