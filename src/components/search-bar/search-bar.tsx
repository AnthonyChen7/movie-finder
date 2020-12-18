import { useState, ChangeEvent, useEffect } from 'react';
import './search-bar.scss';

import { Input, Button, Icon } from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

import 'semantic-ui-css/semantic.min.css';

interface SearchProps {
  defaultValue?: string;
  regexValidations?: {[key: string]: string};
  placeholder?: string;
  disabled?: boolean;
  searchPressed?: (searchValue: string) => void;
}

export default function SearchBar(props: SearchProps) {
  const [ currValue, setCurrValue ] = useState(props.defaultValue ? props.defaultValue : '');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isDisabled, setDisabled ] = useState(props.disabled);

  // https://github.com/xnimorz/use-debounce
  // use debounce to prevent it from re-rendering on every keypress
  const debounced = useDebouncedCallback(
    // function
    (value: string) => {
      setCurrValue(value);
      if (props.regexValidations && Object.keys(props.regexValidations).length > 0) {
        const keys = Object.keys(props.regexValidations);
        let hasError = false;
        for (const key of keys) {
          const regex = new RegExp(key);
          if (!regex.test(value)) {
            setErrorMessage(props.regexValidations[key]);
            hasError = true;
            break;
          }
        }
        if (!hasError) {
          setErrorMessage('');
        }
      }
    },
    // delay in ms
    500
  );

  const onSearchClicked = () => {
    if (props.searchPressed && !errorMessage) {
      props.searchPressed(currValue);
    }
  };

  return (
    <>
      <Input
        action={
          <Button
            icon='search'
            disabled={isDisabled}
            onClick={onSearchClicked}
            circular
          >
          </Button>
        }
        fluid
        error={errorMessage !== ''}
        disabled={isDisabled}
        defaultValue={props.defaultValue || ``}
        placeholder={props.placeholder || `Search...`}
        onChange={(event: ChangeEvent, data: any)=> debounced.callback(data.value)}
      />
    </>
  );
}