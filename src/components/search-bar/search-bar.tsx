import { useState, ChangeEvent, useEffect } from 'react';
import './search-bar.scss';

import { Input, Button } from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

import 'semantic-ui-css/semantic.min.css';

interface SearchProps {
  defaultValue?: string;
  regexValidation?: string;
  placeholder?: string;
  disabled?: boolean;
  searchPressed?: (searchValue: string) => void;
}

export default function SearchBar(props: SearchProps) {
  const [ currValue, setCurrValue ] = useState(props.defaultValue ? props.defaultValue : '');
  const [ hasError, setHasError ] = useState(false);

  useEffect(() => {
    if (props.regexValidation) {
      const regex = new RegExp(props.regexValidation);
      setHasError(!regex.test(currValue));
    }
  }, [
    props.regexValidation, currValue
  ]);

  // https://github.com/xnimorz/use-debounce
  // use debounce to prevent it from re-rendering on every keypress
  const debounced = useDebouncedCallback(
    // function
    (value: string) => {
      setCurrValue(value);
    },
    // delay in ms
    500
  );

  const onSearchClicked = () => {
    if (props.searchPressed && !props.disabled) {
      props.searchPressed(currValue);
    }
  };

  return (
    <>
      <Input
        action={
          <Button
            icon='search'
            disabled={props.disabled || hasError}
            onClick={onSearchClicked}
            circular
          >
          </Button>
        }
        fluid
        error={hasError}
        disabled={props.disabled}
        defaultValue={props.defaultValue || ``}
        placeholder={props.placeholder || `Search...`}
        onChange={(event: ChangeEvent, data: any)=> debounced.callback(data.value)}
      />
    </>
  );
}