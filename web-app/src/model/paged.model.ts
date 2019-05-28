interface PagedSort {
    sorted: boolean
    unsorted: boolean
    empty: boolean
}

interface Pageable {
    offset: number
    pageNumber: number
    pageSize: number
    paged: boolean
    unpaged: boolean
    sort: PagedSort
}

export interface Paged<E> {
    content: E[]
    empty: boolean
    first: boolean
    last: boolean
    number: number
    numberOfElements: number
    pageable: Pageable
    size: number
    sort: PagedSort
    totalElements: boolean
    totalPages: number
}