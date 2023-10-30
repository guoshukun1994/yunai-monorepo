export const TOP_NAV_LIST = [
    {
        key: 'basics',
        path: 'basics',
        label: '基础',
    },
    {
        key: 'algorithm',
        path: 'algorithm',
        label: '算法',
    },
    {
        key: 'frame',
        path: 'frame',
        label: '框架',
    },
    {
        key: 'engineering',
        path: 'engineering',
        label: '工程化',
    },
]

export type SORT_SEARCH_KEYS_TYPE = {
    bubble: string
    select: string
    insert: string
    merge: string
}

export const SORT_SEARCH_KEYS: SORT_SEARCH_KEYS_TYPE = {
    bubble: '冒泡',
    select: '选择',
    insert: '插入',
    merge: '归并',
}
