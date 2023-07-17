import moment from "moment";

export const getTime = (timePassed) => {
    const now = moment();
    const difference = now - moment(timePassed);
    const delta = moment.duration(difference).hours();
    let result;
  
    if (delta < 60) {
      result = `Just now`;
    } else if (delta < 3600) {
      result = `${Math.floor(delta / 60)} mins ago`;
    } else if (delta < 86400) {
      result = `${Math.floor(delta / 3600)} hrs ago`;
    } else {
      result = `${Math.floor(delta / 86400)} days ago`;
    }
  
    return result;      
};

