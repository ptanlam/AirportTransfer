import { Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from '@material-ui/lab/Autocomplete';
import parse from 'autosuggest-highlight/parse';
import throttle from 'lodash/throttle';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller } from 'react-hook-form';
import { toast } from 'react-toastify';

const autocompleteService = { current: null };

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(2),
  },
}));

export default function VerticalPlaceInput({
  label,
  control,
  loading,
  register,
  inputName,
  orderNumber,
  transportType,
}) {
  const classes = useStyles();
  const [value, setValue] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [options, setOptions] = useState([]);

  const fetch = useMemo(
    () =>
      throttle((request, callback) => {
        autocompleteService.current.getPlacePredictions(request, callback);
      }, 200),
    [],
  );

  useEffect(() => {
    let active = true;
    if (!autocompleteService.current && window.google) {
      autocompleteService.current = new window.google.maps.places.AutocompleteService();
    }
    if (!autocompleteService.current) {
      return undefined;
    }
    if (inputValue === '') {
      setOptions(value ? [value] : []);
      return undefined;
    }
    fetch({ input: inputValue }, (results) => {
      if (active) {
        let newOptions = [];
        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });
    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Grid container direction='column'>
      <Grid item>
        <Typography variant='caption' style={{ fontWeight: 'bold' }}>
          {label}{' '}
          <span style={{ color: 'grey', fontWeight: 'lighter' }}>
            (Leave it if have not any changes)
          </span>
        </Typography>
      </Grid>
      <Grid item>
        <Controller
          name={inputName}
          render={(props) => (
            <Autocomplete
              size='small'
              fullWidth
              disabled={loading}
              id={`${orderNumber}`}
              ref={register}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
              }
              filterOptions={(x) => x}
              options={options}
              autoComplete
              includeInputInList
              filterSelectedOptions
              value={value}
              onChange={(event, newValue) => {
                if (newValue === null) {
                  props.onChange({});
                } else {
                  try {
                    const { description, place_id, terms } = newValue;
                    let district = '';
                    const city = terms[terms.length - 2].value;
                    const country = terms[terms.length - 1].value;
                    if (transportType === 'cars') {
                      props.onChange({
                        city,
                        country,
                      });
                    } else {
                      district = terms[terms.length - 3].value;
                    }
                    props.onChange({
                      description,
                      placeId: place_id,
                      district,
                      city,
                      country,
                    });
                  } catch (error) {
                    toast.warning('Please enter more specific location!');
                  }
                }
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
              }}
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
              }}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' fullWidth />
              )}
              renderOption={(option) => {
                const matches =
                  option.structured_formatting.main_text_matched_substrings;
                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match) => [
                    match.offset,
                    match.offset + match.length,
                  ]),
                );

                return (
                  <Grid container alignItems='center'>
                    <Grid item>
                      <LocationOnIcon className={classes.icon} />
                    </Grid>
                    <Grid item xs>
                      {parts.map((part, index) => (
                        <span
                          key={index}
                          style={{ fontWeight: part.highlight ? 700 : 400 }}>
                          {part.text}
                        </span>
                      ))}

                      <Typography variant='body2' color='textSecondary'>
                        {option.structured_formatting.secondary_text}
                      </Typography>
                    </Grid>
                  </Grid>
                );
              }}
            />
          )}
          defaultValue={{}}
          control={control}
          rules={{
            required: true,
            validate: (value) => {
              if (value === {}) {
                return 'Please provide a location!';
              }
            },
          }}
          onChange={([, { data }]) => data}
        />
      </Grid>
    </Grid>
  );
}
