import { Field, useField } from "formik";
import React from "react";
import DatePicker, {ReactDatePickerProps} from "react-datepicker";
import { Form, Label } from "semantic-ui-react";


interface Props {
    placeholder: string;
    name: string;
    label?: string;
}

export default function MyDateInput(props: Partial<ReactDatePickerProps>){
    const [field, meta, helpers] = useField(props.name!)
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && !!meta.error ? (
                <Label basic color='red' content={meta.error}></Label>
            ) : null}
        </Form.Field>
    )
}