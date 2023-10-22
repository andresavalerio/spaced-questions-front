const validEmailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export const validateEmail = (email: string) => {
  if (email.length === 0) return false;

  return validEmailRegex.test(email);
};
