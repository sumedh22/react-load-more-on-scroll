package com.pagination.employeeservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@SpringBootApplication
public class EmployeeServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(EmployeeServiceApplication.class, args);
	}}
	@Entity
	 class Employee {

		@Id
		@GeneratedValue(strategy = GenerationType.AUTO)
		private long id;
		private String firstName;
		private String lastName;
		private String gender;
		private String ipAddress;
		private String email;

		public long getId() {
			return id;
		}

		public void setId(long id) {
			this.id = id;
		}


		public String getFirstName() {
			return firstName;
		}

		public void setFirstName(String firstName) {
			this.firstName = firstName;
		}

		public String getLastName() {
			return lastName;
		}

		public void setLastName(String lastName) {
			this.lastName = lastName;
		}

		public String getGender() {
			return gender;
		}

		public void setGender(String gender) {
			this.gender = gender;
		}

		public String getIpAddress() {
			return ipAddress;
		}

		public void setIpAddress(String ipAddress) {
			this.ipAddress = ipAddress;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}
	}

	@RepositoryRestResource(collectionResourceRel = "employee", path = "employee")
	 interface UserRepository extends PagingAndSortingRepository<Employee, Long> {
		List<Employee> findByFirstName(@Param("firstName") String name);
	}

