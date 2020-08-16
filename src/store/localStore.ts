const setValidUser = (userData: any) => {
  localStorage.setItem("validUsers", userData);
};

const getValidUser = () => {
  const userData = localStorage.getItem("validUsers");
  return userData || "";
};

const setEmployeeDetails = (empData: any) => {
  localStorage.setItem("empDetails", empData);
};

const getEmployeeDetails = () => {
  const empData = localStorage.getItem("empDetails");
  return empData || "";
};

export { setValidUser, getValidUser, setEmployeeDetails, getEmployeeDetails };
