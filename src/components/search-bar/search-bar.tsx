import { useState, useCallback, SyntheticEvent, createRef, ChangeEvent } from 'react';
import './search-bar.scss';

import { Input, Button } from 'semantic-ui-react';
import { useDebouncedCallback } from 'use-debounce';

import 'semantic-ui-css/semantic.min.css';

interface SearchProps {
  defaultValue?: string;
  regexValidations?: {[key: string]: string};
  placeHolder?: string;
  disabled?: boolean;
  searchPressed?: (searchValue: string) => void;
}

export default function SearchBar(props: SearchProps) {
  const [ currValue, setCurrValue ] = useState(props.defaultValue ? props.defaultValue : '');
  const [ errorMessage, setErrorMessage ] = useState('');
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
  // TODO refactor to use button
  return (
    <>
      <Input
        error={errorMessage !== ''}
        disabled={props.disabled}
        defaultValue={props.defaultValue || ``}
        placeholder={props.placeHolder || `Search...`}
        onChange={(event: ChangeEvent, data: any)=> debounced.callback(data.value)}
      />
    </>
  );
}