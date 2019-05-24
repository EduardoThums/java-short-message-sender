package br.ifsul.lp3.messagesender.api.repository.user;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface UserRepository extends PagingAndSortingRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);
}
