export const formatDateString = (dateString) => {
    const date = new Date(dateString);
  
    // Options for formatting
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const formattedDate = date.toLocaleDateString("en-GB", options); // Format as 'DD-MMM-YYYY'
  
    // Replace the comma with a space and return the result
    return formattedDate.replace(",", "").replace(/\s+/g, "-").toLowerCase();
  };