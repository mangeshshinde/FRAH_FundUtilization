package com.mangesh.frahevent.controller;

import com.mangesh.frahevent.dto.EmployeeDto;
import com.mangesh.frahevent.dto.LoginDto;
import com.mangesh.frahevent.model.Employee;
import com.mangesh.frahevent.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("/employee")
    public List<Employee> getEmployees() {
        return employeeService.getEmployees();
    }

    @GetMapping(path = { "/employee/{id}" })
    public Employee getEmployee(@PathVariable("id") long id) {
        Employee employee = employeeService.getEmployee(id);
        return employee;
    }

    @PostMapping(path = {"/register"})
    public boolean registerEmployee(@RequestBody EmployeeDto employee) {
        return employeeService.registerService(employee);
    }

    @GetMapping(path = {"/login/{emailId}/{password}"})
    public Employee loginEmployee(@PathVariable("emailId") String email,
                                  @PathVariable("password") String password) {
        LoginDto loginDto = new LoginDto(email, password);
        return employeeService.employeeLogin(loginDto);
    }


}
