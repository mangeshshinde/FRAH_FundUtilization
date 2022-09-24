package com.mangesh.frahevent.service;


import com.mangesh.frahevent.dto.EmployeeDto;
import com.mangesh.frahevent.dto.LoginDto;
import com.mangesh.frahevent.model.Employee;
import com.mangesh.frahevent.model.Roles;
import com.mangesh.frahevent.repository.EmployeeRepository;
import com.mangesh.frahevent.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class EmployeeService {

	@Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private RoleRepository roleRepository;


    public List<Employee> getEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployee(long id) {
        Employee response = Optional.ofNullable(employeeRepository.findById(id)).get().orElse(null);
		return response;
    }

    public boolean registerService(EmployeeDto employee) {
        Employee userExists = (Employee) Optional.ofNullable(employeeRepository.findByEmail(employee.getEmail())).orElse(null);
        if(userExists != null) {
            return false;
        }
        Employee emp = new Employee();
        long roleId = 3;
        emp.setFname(employee.getFname());
        emp.setLname(employee.getLname());
        emp.setEmail(employee.getEmail());
        emp.setMobile(employee.getMobile());
        emp.setPassword(employee.getPassword());
        emp.setManagerId(employee.getManagerId());
        Roles role = Optional.ofNullable(roleRepository.findById(roleId)).get().orElse(null);
        if(role != null) {
            emp.setRole(role);
            employeeRepository.save(emp);
            return true;
        }
        else
            return false;
    }

    public Employee employeeLogin(LoginDto employeeLogin) {
        try {
            return Optional.ofNullable(employeeRepository.findByEmail(employeeLogin.getEmailId())).get();
        } catch (Exception e) {
            return null;
        }
    }
}
