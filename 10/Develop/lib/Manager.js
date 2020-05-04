// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, phone) {
        super(name, id, email, "Manager");
        this.officeNumber = phone;
        this.getOfficeNumber = function() {
            return this.officeNumber;
        };
        this.getRole = function() {
            return this.role;
        };
    }
};

module.exports = Manager;