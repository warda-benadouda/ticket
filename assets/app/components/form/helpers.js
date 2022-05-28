export const getInputClasses = (meta) => {
    if (meta.touched && meta.error) {
        return "is-invalid";
    }

    if (meta.touched && !meta.error) {
        return "is-valid";
    }

    return "";
};
