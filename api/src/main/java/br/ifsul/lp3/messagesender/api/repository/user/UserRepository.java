package br.ifsul.lp3.messagesender.api.repository.user;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    List<UserEntity> findAllByIdIn(List<Long> usersIds);

    @Query("SELECT u FROM UserEntity u WHERE u.id != :userId")
    List<UserEntity> findAllExceptByLoggedUser(@Param("userId") Long userId);
}
