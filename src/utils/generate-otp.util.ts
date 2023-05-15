import * as crypto from 'crypto';

// 4바이트 길이의 무작위 바이트 생성 - 난수 생성
export function generateOTP() {
  return crypto.randomBytes(4).toString('hex');
  // to.String('hex') 생성된 난수를 16진수로 변환하여 문자열로 반환 - OTP 숫자와 알파벳 대/소문자로 이루어진 문자열로 표현
}
