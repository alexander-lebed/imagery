import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedValue } from '@/app/hooks/useDebouncedValue';

/**
 * A custom hook that manages a debounced search parameter in the URL.
 * It updates the URL search parameters after a delay when the search param changes.
 *
 * @param searchParam - The name of the search parameter in the URL
 * @returns A tuple containing the current search input value and a function to update it
 */
export const useDebouncedSearchParam = (
  searchParam: string
): [string, Dispatch<SetStateAction<string>>] => {
  const searchParams = useSearchParams();
  const searchValue = searchParams.get(searchParam) || '';
  const [value, setValue] = useState<string>(searchValue);
  const router = useRouter();
  const debouncedValue = useDebouncedValue(value);

  // Keep the input value in sync with the URL when navigating
  useEffect(() => {
    const urlValue = searchParams.get(searchParam) || '';
    setValue(urlValue);
  }, [searchParams, searchParam]);

  // Update search value in the URL
  useEffect(() => {
    const currentValue = searchParams.get(searchParam) || '';
    if (currentValue !== debouncedValue) {
      const params = new URLSearchParams(searchParams.toString());
      if (debouncedValue) {
        params.set(searchParam, debouncedValue);
      } else {
        params.delete(searchParam);
      }
      router.replace(`?${params.toString()}`);
    }
  }, [debouncedValue, router, searchParam, searchParams]);

  return [value, setValue];
};
