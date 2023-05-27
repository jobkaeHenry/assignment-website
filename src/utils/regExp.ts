/**
 * 올바른 email인지 체크하는 RegExp
 */
// eslint-disable-next-line no-useless-escape
export const emailRegExp = /^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
/**
 * 숫자, 영문, 특수문자를 포함한 8~25자 사이의 문자 RegExp
 */
export const passwordRegExp =
  /^(?=.*[a-zA-z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

/**
 * 올바른 URL인지 확인하는 RegExp
 */
export const urlRegExp =
  // eslint-disable-next-line no-useless-escape
  /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w.-]*)*\//;
/**
 * 한글, 영어, 숫자만 입력가능한 RegExp
 * 닉네임에 사용
 */
export const KoEnNumExp = /^[가-힣a-zA-Z0-9]+$/;
