package br.ifsul.lp3.messagesender.api.repository.user;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    Optional<UserEntity> findByUsername(String username);

    @Query(value = "SELECT u.* from \"user\" u "
            + "WHERE u.id != :loggedUserId "
            + "AND u.username ILIKE concat(:username, '%')", nativeQuery = true)
    List<UserEntity> findAllExceptByLoggedUserAndUsernameAutoComplete(@Param("loggedUserId") Long loggedUserId, @Param("username") String username);

    @Query(value = "SELECT u FROM UserEntity u "
            + "WHERE u.id != :loggedUserId")
    List<UserEntity> findAllExceptByLoggedUser(@Param("loggedUserId") Long loggedUserId);
}
