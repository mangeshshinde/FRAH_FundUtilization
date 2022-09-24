package com.mangesh.frahevent.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDto {
    private String fname;
    private String lname;
    private String password;
    private String email;
    private Long mobile;
    private Long managerId;
}
