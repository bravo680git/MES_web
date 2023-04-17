export const VALUE_TYPE = {
    boolean: 0,
    interger: 1,
    decimal: 2,
    string: 3,
}

export const SEGMENT_RELATION = {
    afterWithDuration: 0,
    afterJustDone: 1,
    after: 2,
}

export const TIME_UNIT_LIST = [
    { value: 0, key: "Mili giây" },
    { value: 1, key: "Giây" },
    { value: 2, key: "Phút" },
    { value: 3, key: "Giờ" },
    { value: 4, key: "Ngày" },
]

export const SEGMENT_RELATION_OPTION_LIST = [
    { value: SEGMENT_RELATION.afterWithDuration, key: "Thực hiện sau một khoảng thời gian" },
    { value: SEGMENT_RELATION.afterJustDone, key: "Thực hiện ngay sau" },
    { value: SEGMENT_RELATION.after, key: "Thực hiện sau" },
]
