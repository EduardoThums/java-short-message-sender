package br.ifsul.lp3.messagesender.api.repository.message;

import br.ifsul.lp3.messagesender.api.domain.entity.MessageEntity;
import br.ifsul.lp3.messagesender.api.repository.Criteria;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.namedparam.NamedParameterJdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class MessageJdbcRepository {

    private NamedParameterJdbcTemplate namedParameterJdbcTemplate;

    public MessageJdbcRepository(NamedParameterJdbcTemplate namedParameterJdbcTemplate) {
        this.namedParameterJdbcTemplate = namedParameterJdbcTemplate;
    }

    public List<MessageEntity> findAllByCriteria(MessageJdbcCriteria messageJdbcCriteria) {
        final Map<String, Object> params = getDefaultParams(messageJdbcCriteria);
        final Criteria criteria = mapCriteria(messageJdbcCriteria);
        final String sql = "SELECT m.* FROM message m " +
                "INNER JOIN \"user\" u ON m.receiver_id = u.id "
                + criteria.getWhere()
                + "ORDER BY m.created_date DESC";

        return namedParameterJdbcTemplate.query(sql, params, new BeanPropertyRowMapper<>(MessageEntity.class));
    }

    private Criteria mapCriteria(MessageJdbcCriteria messageJdbcCriteria) {
        String where = "WHERE u.id = :loggedUserId ";

        if (messageJdbcCriteria.getSenderUsername() != null) {
            where += "AND u.username ILIKE concat(:username, '%') ";
        }

        if (messageJdbcCriteria.getSubject() != null) {
            where += "AND m.subject ILIKE concat('%', :subject, '%') ";
        }

        return Criteria.builder()
                .where(where)
                .build();
    }

    private Map<String, Object> getDefaultParams(MessageJdbcCriteria messageJdbcCriteria) {
        final Map<String, Object> params = new HashMap<>();
        params.put("loggedUserId", messageJdbcCriteria.getLoggedUserId());
        params.put("username", messageJdbcCriteria.getSenderUsername());
        params.put("subject", messageJdbcCriteria.getSubject());

        return params;
    }
}
