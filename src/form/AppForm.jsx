import { Formik, Form, Field, ErrorMessage } from "formik"
import validator from "validator"

 function AppForm () {

    // vite - formik - formspree 

    const url = import.meta.env.VITE_KEY_FORMIK;

    return (
        <Formik
        initialValues={{ name: "", email: "", message: "" }}
        validate={ values => {
            let errors = {};
            if(!values.name){
                errors.name= "Name is required"
            } else if (!values.email){
                errors.email= "Email is required"
            } else if (!validator.isEmail(values.email)){
                errors.email= "The email is not valid"
            }
  
            return errors;
        }}
        onSubmit={
            (values, { setSubmitting }) => {
                let formData = new FormData();
                formData.append("name", values.name);
                formData.append("email", values.email);
                formData.append("message", values.message);

                fetch(url, {
                    method: "POST",
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                }).then(res => {
                    setSubmitting(false);
                })
            }
        }
        >
            {
                ({isSubmiting}) => (
                    <Form>
                        <div>
                            <label htmlFor="name">Name:</label>
                            <Field name="name" type="text" />
                            <ErrorMessage name="name" component="p"/>
                        </div>
                        <div>
                            <label htmlFor="email">Email:</label>
                            <Field name="email" type="email" />
                            <ErrorMessage name="email" component="p"/>
                        </div>
                        <div>
                            <label htmlFor="message">Message:</label>
                            <Field component="textarea" name="message"></Field>
                        </div>
                        <button type="submit" disabled={isSubmiting}>{isSubmiting ? "Sending.." : "Send"}</button>
                    </Form>
                )
            }
        </Formik>
    )
}

export default AppForm;
