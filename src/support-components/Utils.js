

class Utils {
    formatDate(date) {
      let month = date.getMonth() + 1;
      let year = date.getYear();
    
      return (month < 10 ? "0" + month : month) + "/" + (year%100);
    }
}

export default new Utils();