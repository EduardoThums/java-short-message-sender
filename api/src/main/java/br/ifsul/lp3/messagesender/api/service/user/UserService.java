package br.ifsul.lp3.messagesender.api.service.user;

import br.ifsul.lp3.messagesender.api.domain.entity.UserEntity;
import org.springframework.stereotype.Service;

@Service
public interface UserService {

    void saveUser(UserEntity userEntity);
}
