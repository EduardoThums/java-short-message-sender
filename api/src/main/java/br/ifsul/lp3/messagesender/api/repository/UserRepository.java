package br.ifsul.lp3.messagesender.api.repository;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByName(String name);

    Optional<UserEntity> findByNameAndPassword(String name, String password);
}
