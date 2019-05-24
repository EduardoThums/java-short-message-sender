package br.ifsul.lp3.messagesender.api.repository.message;

import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface MessageRepository extends PagingAndSortingRepository<MessageEntity, Long> {
}
