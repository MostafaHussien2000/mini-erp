export class Employees {
  constructor() {}

  // Get all employees data
  async getAllEmployees(page = 1, perPage = 10) {
    try {
      const response = await fetch(
        `http://localhost:3001/employees?page=${page}&per_page=${perPage}`
      );
      if (!response.ok) throw new Error("Failed to fetch all employees.");

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Get employee data
  async getEmployeeDetails(id) {
    try {
      const response = await fetch("http://localhost:3001/employees/" + id);
      if (!response.ok) throw new Error("Failed to fetch product details.");

      const data = await response.json();
      console.log(data);

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Update employee data
  async updateEmployee(id, data) {}

  // Delete employee
  async deleteEmployee(id) {}
}
