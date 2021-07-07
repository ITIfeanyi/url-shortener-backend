module.exports = {
  handleError: (error) => {
    let err = "";
    if (error.message === "url does not exit") {
      err = "url does not exit";
    }
    if (error.message === "invalid url") {
      err = "invalid url";
    } else {
      err = error.message;
    }
    return err;
  },
};
