package br.ifsul.lp3.messagesender.api.config;

import org.junit.Before;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public abstract class AbstractUnitTest {

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
    }

}
