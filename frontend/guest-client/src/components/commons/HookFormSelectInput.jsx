import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Controller } from 'react-hook-form';

const HookFormSelectInput = ({
  name,
  label,
  control,
  defaultValue,
  children,
  ...props
}) => {
  return (
    <FormControl {...props}>
      <Controller
        as={
          <Select label={label} style={{ minWidth: 200 }}>
            {children}
          </Select>
        }
        name={name}
        control={control}
        rules={{ required: true }}
        defaultValue={defaultValue}
      />
    </FormControl>
  );
};
export default HookFormSelectInput;
