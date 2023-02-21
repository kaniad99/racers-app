package app.racers.repository;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.security.access.prepost.PreAuthorize;
import app.racers.entity.User;

@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long> {

	User findByEmail(String email);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or #user?.email == authentication?.name")
	User save(@Param("user") User user);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or #user?.email == authentication?.name")
	void deleteById(Long id);

	@Override
	@PreAuthorize("hasRole('ROLE_ADMIN') or #user?.email == authentication?.name")
	void delete(@Param("user") User user);
}
