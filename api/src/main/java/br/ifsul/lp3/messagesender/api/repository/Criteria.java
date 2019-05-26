package br.ifsul.lp3.messagesender.api.repository;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Criteria {

    private String join;

    private String where;

    private String order;
}
