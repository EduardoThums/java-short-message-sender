package br.ifsul.lp3.messagesender.api.repository.message;

import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<MessageEntity, Long> {

    List<MessageEntity> findAllBySenderId(Long senderId);
}
