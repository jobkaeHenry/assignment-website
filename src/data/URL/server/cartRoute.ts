/**
 * [get] 아이템 id로 상세페이지 정보를 받는 Route
 */
export const getCartItemById = '/cart' as const

export const getItemRoute = (id: string) => `/items/${id}`;

export const addToCartRoute = "/cart";
