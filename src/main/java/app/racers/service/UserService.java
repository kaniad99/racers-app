package app.racers.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import app.racers.entity.User;
import app.racers.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;

	@PreAuthorize("hasRole('ROLE_ADMIN') or #user?.email == authentication?.name")
	public User edit(Long id, User user, boolean updateAsManager) {
		User userEntity = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("User not found"));
		if (updateAsManager) {
			if (user.getRoles() != null) userEntity.setRoles(user.getRoles());
		}
		if (user.getPassword() != null) {
			userEntity.setAlreadyEncodedPassword(user.getPassword());
		}
		userEntity.setEmail(user.getEmail());
		userEntity.setFirstName(user.getFirstName());
		userEntity.setLastName(user.getLastName());
		userEntity.setDescription(user.getDescription());
		return userRepository.save(userEntity);
	}
}
