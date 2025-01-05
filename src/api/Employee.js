class Employee {
  constructor(name, role, email, phone, startDate, activeStatus) {
    this.id = generateId();
    this.name = name;
    this.role = role;
    this.email = email;
    this.phone = phone;
    this.startDate = startDate;
    this.activeStatus = activeStatus;
  }
}

function generateId(length = 10) {
  return Math.random()
    .toString(36)
    .substring(2, length + 2);
}
