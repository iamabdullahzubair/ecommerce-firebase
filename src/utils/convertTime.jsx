import dayjs from "dayjs";


const convertDate = (timestamp) => {
    const date = dayjs.unix(timestamp); // Convert seconds to dayjs instance
    return date.format("MMMM D, YYYY [at] h:mm A");
  };

  export default convertDate