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

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Add new employee
  async addNewEmployee(data) {
    data.image = data.base64;

    delete data.base64;

    try {
      const response = await fetch("http://localhost:3001/employees", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to add the employee.");

      const resData = await response.json();

      return resData;
    } catch (err) {
      console.error(err);
    }
  }

  // Get employee data
  async getEmployeeDetails(id) {
    try {
      const response = await fetch("http://localhost:3001/employees/" + id);
      if (!response.ok) throw new Error("Failed to fetch product details.");

      const data = await response.json();

      return data;
    } catch (err) {
      throw new Error(err.message);
    }
  }

  // Update employee data
  async updateEmployee(id, data) {
    data.image = data.base64;

    delete data.base64;
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to update.");

      const resData = await response.json();

      return resData;
    } catch (err) {
      console.error(err);
    }
  }

  // Delete employee
  async deleteEmployee(id) {
    try {
      const response = await fetch(`http://localhost:3001/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error(`Failed to delete post with ID ${id}.`);
      else console.log("Deleted");
    } catch (err) {
      console.error(err);
    }
  }
}
