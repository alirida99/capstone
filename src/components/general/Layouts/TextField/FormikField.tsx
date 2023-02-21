import React from "react";
import { Box } from "@mui/material";
import TextField from "@mui/material/TextField";
import { ErrorMessage, Field } from "formik";
import styles from "./formikStyles.module.scss";
interface FormikFieldProps {
    name: string;
    id?: string;
    type?: string;
    label?: string;
    value?: string;
    defaultValue?: string;
    required?: boolean;
    error?: boolean;
    inputProps?: any;
    placeholder?: any;
    testTag?: any;
    errorTag?: any;
    helperText?: string;
    labelColor?: string;
    disabled?: boolean;
    style?: any;
    responsive?: boolean;
    size?: string;
    className?: string;
    fontSize?: string;
    // onChange?: Function;
    sx?: any;
}

const FormikField: React.FC<FormikFieldProps> = ({
    name,
    id,
    type,
    value,
    defaultValue,
    label,
    required = false,
    error,
    inputProps,
    testTag,
    placeholder,
    errorTag,
    labelColor,
    disabled,
    helperText,
    responsive,
    style,
    size,
    className,
    fontSize,
    // onChange,
    sx,
}) => {
    return (
        <Box>
            <span
                style={{ color: labelColor, fontSize: fontSize }}
                className={
                    !disabled
                        ? !responsive
                            ? styles.label
                            : styles.labelResp
                        : styles.disabledLabel
                }
            >
                {label}
            </span>
            <Field
                className={className}
                required={required}
                autoComplete="off"
                as={TextField}
                fullWidth
                name={name}
                id={id}
                style={style}
                error={error}
                type={type}
                value={value}
                defaultValue={defaultValue}
                InputLabelProps={{ shrink: true }}
                InputProps={inputProps}
                placeholder={placeholder}
                disabled={disabled}
                size={size}
                // onChange={onChange}
                sx={sx}
                // eslint-disable-next-line react/jsx-no-duplicate-props
                inputProps={{
                    "data-cy": testTag,
                }}
                helperText={
                    error ? (
                        <ErrorMessage name={name}>
                            {(msg) => (
                                <div className={styles.errorStyle} data-cy={errorTag}>
                                    {msg}
                                </div>
                            )}
                        </ErrorMessage>
                    ) : (
                        <div>{helperText}</div>
                    )
                }
            />
        </Box>
    );
};

export default FormikField;