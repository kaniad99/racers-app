package app.racers.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import static javax.validation.constraints.Pattern.Flag.CASE_INSENSITIVE;


@Data
@ToString(exclude = {"password", "clearPassword"})
@Entity(name = "users")
public class User {
	@Id
	@GeneratedValue
	private Long id;

	@NotNull
	@Size(min = 3, max = 30)
	private String firstName;

	@NotNull
	@Size(min = 3, max = 30)
	private String lastName;

	private String description;

	@NotNull
	@Size(min = 3, max = 70)
	@Pattern(regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\."
		+ "[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@"
		+ "(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.?)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
		flags = CASE_INSENSITIVE, message = "Invalid email address")
	@Column(unique = true, nullable = false)
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	private String password;

	@JsonIgnore
	@Transient
	@Getter(AccessLevel.NONE)
	@Setter(AccessLevel.NONE)
	private transient String clearPassword;

	private String[] roles = new String[]{};

	public User() {
	}

	public User(String email, String firstName, String lastName, String description, String password, String... roles) {
		this.email = email;
		this.firstName = firstName;
		this.lastName = lastName;
		this.description = description;
		this.setPassword(password);
		this.roles = roles;
	}

	public void setPassword(String password) {
		this.clearPassword = password;
		this.password = new BCryptPasswordEncoder().encode(password);
	}

	@JsonIgnore
	@Transient
	public void setAlreadyEncodedPassword(String password) {
		this.clearPassword = null;
		this.password = password;
	}
}
