package app.racers.config;

import app.racers.entity.Racer;
import app.racers.entity.User;
import app.racers.enums.Roles;
import app.racers.repository.RacerRepository;
import app.racers.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.stream.Stream;

@Component
@Slf4j
public class DatabaseLoader {

    @Bean
    CommandLineRunner init(UserRepository userRepository, RacerRepository racerRepository) {
        return args -> {
            SecurityContextHolder.getContext().setAuthentication(
                    new UsernamePasswordAuthenticationToken("server", "server",
                            AuthorityUtils.createAuthorityList(Roles.ROLE_ADMIN.name(), Roles.ROLE_USER.name())));
            if (userRepository.count() == 0L) createDefaultUsers(userRepository);
            if (racerRepository.count() == 0L) createDefaultRacers(racerRepository);
            SecurityContextHolder.clearContext();
        };
    }

    private void createDefaultRacers(RacerRepository racerRepository) {
        Stream.of(
                new Racer(1L, "Robert", "Kubica", LocalDate.of(1984, 12, 7), "Renault", "Megane Coupe GT", "test", "5min 30sec")
        ).forEach(racer -> {
            log.info("Created {}", racerRepository.save(racer));
        });
    }

    private void createDefaultUsers(UserRepository userRepository) {
        Stream.of(
                new User("admin", "admin", "admin", "admin account", "admin", Roles.ROLE_ADMIN.name()),
                new User("user", "user", "user", "user account", "user", Roles.ROLE_USER.name())
        ).forEach(user -> {
            log.info("Created {}", userRepository.save(user));
        });
    }
}
