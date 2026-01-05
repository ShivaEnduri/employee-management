export const validateEmployee = (data) => {
  const errors = {};

  if (!data.name.trim()) errors.name = "Full name is required";
  if (!data.gender) errors.gender = "Gender is required";
  if (!data.dob) errors.dob = "Date of birth is required";
  if (!data.state) errors.state = "State is required";

  return errors;
};
