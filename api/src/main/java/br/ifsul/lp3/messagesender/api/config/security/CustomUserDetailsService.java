package br.ifsul.lp3.messagesender.api.config.security;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import br.ifsul.lp3.messagesender.api.repository.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.function.Supplier;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) {
        UserEntity userEntity = getUser(() -> userRepository.findByUsername(username));
        return UserPrincipal.create(userEntity);
    }

    public UserDetails loadUserById(Long id) {
        UserEntity userEntity = getUser(() -> userRepository.findById(id));
        return UserPrincipal.create(userEntity);
    }

    private UserEntity getUser(Supplier<Optional<UserEntity>> supplier) {
        return supplier.get().orElseThrow(() ->
                new UsernameNotFoundException("User does not exists")
        );
    }

    public UserPrincipal getUser() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null) {
            return null;
        }

        return (UserPrincipal) authentication.getPrincipal();
    }
}
