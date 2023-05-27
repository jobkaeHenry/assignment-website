/**
 * [get] 아이템 id로 상세페이지 정보를 받는 Route
 */
export const getItemRoute = (id: string) => `/items/${id}`;

/**
 * [get] userID를 Body로 받아 해당 유저가 판매중인 상품을 모두 보여줌
 */
export const getItemsByUserId = "/items";

/**
 * [post] 새로운 상품을 추가하는 Route
 */
export const createItemUrl = "/items";

/**
 * [get] 아이템 id로 해당 아이템을 삭제하는 Route
 */
export const deleteItemRoute = (id: string) => `/items/${id}`;
