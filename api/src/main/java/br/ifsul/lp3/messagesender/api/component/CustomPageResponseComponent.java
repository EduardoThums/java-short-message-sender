package br.ifsul.lp3.messagesender.api.component;

import lombok.Getter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CustomPageResponseComponent {

    @Getter
    private Integer defaultSize;

    public CustomPageResponseComponent(@Value("${pagination.default-size}") Integer defaultSize) {
        this.defaultSize = defaultSize;
    }

    public <T> Page<T> customPageResponse(List<T> items, int pageNumber) {
        PageRequest pageRequest = PageRequest.of(pageNumber, defaultSize);
        int start = (int) pageRequest.getOffset();
        int end = (start + pageRequest.getPageSize()) > items.size() ? items.size() : (start + pageRequest.getPageSize());
        return new PageImpl<>(items.subList(start, end), pageRequest, items.size());
    }

    public <T> Page<T> customSinglePageResponse(List<T> items) {
        Integer size = items.size();
        PageRequest pageRequest = PageRequest.of(0, size);
        return new PageImpl<>(items, pageRequest, items.size());
    }

}
