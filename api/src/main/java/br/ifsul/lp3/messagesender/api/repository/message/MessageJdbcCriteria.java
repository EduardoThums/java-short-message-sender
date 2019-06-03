package br.ifsul.lp3.messagesender.api.repository.message;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MessageJdbcCriteria {

    private Long loggedUserId;

    private String senderUsername;

    private String subject;
}
