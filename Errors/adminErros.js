module.exports = {
  handleAdminError: (error) => {
    let err = "";
    if (error.message === "admin not found") {
      err = "Admin not found";
    }
    if (error.message === "incorrect password") {
      err = "incorrect password";
    } else {
      err = error.message;
    }
    return err;
  },
};
