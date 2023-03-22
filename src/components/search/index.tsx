import React, {
  ChangeEvent,
  useCallback,
  useImperativeHandle,
  useState
} from 'react';
import {throttle} from 'lodash-es';

interface SearchProps {
  className?: string;
  placeholder?: "Search...",
  onSearch: (query: string) => void;
  debounceTime?: number;
  onLoadingChange: (loading: boolean) => void;
}

export interface SearchRef {
  handleConfirm: () => void;
  query: string
}

const Search = React.forwardRef<SearchRef, SearchProps>(
  (
    {
      onSearch,
      debounceTime = 500,
      placeholder = 'Search...',
      className,
      onLoadingChange
    },
    ref
  ) => {
    const [searchQuery, setSearchQuery] = useState('');
    const handleSearch = useCallback(
      throttle(async (query: string) => {
        onLoadingChange(true);
        try {
          await onSearch(query)
        } catch (err) {
          onLoadingChange(false);
        }
        onLoadingChange(false);
      }, debounceTime),
      [onSearch, debounceTime]
    );


    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value);
    };

    const handleConfirm = () => {
      handleSearch(searchQuery);
    }

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.keyCode === 13) {
        handleConfirm();
      }
    }

    useImperativeHandle(ref, () => ({
      handleConfirm,
      query: searchQuery
    }));

    return (
      <div className={`"${className ? className : ''}  mb-5  relative  px-0  px-[20px] md:px-[30%]   flex flex-col items-center w-full space-y-2"`}>
        <input
          className="w-full  px-3 py-1 md:py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleChange}
          onKeyUp={onKeyUp}
        />
      </div>
    );
  }
);
export default Search;


