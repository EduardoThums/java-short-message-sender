package br.ifsul.lp3.messagesender.api.config.security;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

@Data
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class UserPrincipal implements UserDetails {

    private static final String DEFAULT_ROLE = "USER";

    @EqualsAndHashCode.Include
    private Long id;

    private String username;

    private String password;

    private String imageUrl;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id,
                         String name,
                         String password,
                         String imageUrl,
                         Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = name;
        this.password = password;
        this.imageUrl = imageUrl;
        this.authorities = authorities;
    }

    public static UserPrincipal create(UserEntity userEntity) {

        List<GrantedAuthority> authorities = Collections.singletonList(
                new SimpleGrantedAuthority(DEFAULT_ROLE)
        );

        return new UserPrincipal(
                userEntity.getId(),
                userEntity.getUsername(),
                userEntity.getPassword(),
                userEntity.getImageUrl(),
                authorities
        );
    }


    @Override
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }


    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}