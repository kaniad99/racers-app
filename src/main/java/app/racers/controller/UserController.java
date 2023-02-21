package app.racers.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import app.racers.entity.User;
import app.racers.enums.Roles;
import app.racers.service.UserService;

import javax.servlet.http.HttpServletRequest;


@RestController
public class UserController {

	@Autowired
	private UserService userService;

	@PutMapping("/api/users/{id}/profile")
	@PreAuthorize("hasRole('ROLE_ADMIN') or #user?.email == authentication?.name")
	public User edit(HttpServletRequest request, @PathVariable Long id,
					 @Validated @RequestBody User user) {
		return userService.edit(id, user, request.isUserInRole(Roles.ROLE_ADMIN.name()));
	}
}
