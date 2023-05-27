/**
 * [post] 토큰을 Refresh 하는 라우트
 */
export const refreshTokenURL = "/user/refresh" as const;
/**
 * [post] 로그인 라우트
 */
export const loginRoute = "/user/login" as const;
/**
 * [post] 회원가입 라우트
 */
export const signupRoute = "/user/signup" as const;
/**
 * [post] 일반유저 에서 Seller (Admin) 으로 권한을 업그레이드하는 라우트
 */
export const upgradeRoute = "/user/upgrade" as const;

/**
 * JWT 로 유저 정보를 받는 라우트
 */
export const getUserInfoByUserId = "/user/userInfo" as const