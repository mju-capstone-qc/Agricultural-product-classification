// 현재 날짜와 시간을 가져오는 함수
export function getKoreanDateTime(): string {
  // 현재 시간을 기준으로 Date 객체 생성
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  // getMonth() 메서드의 반환값은 0부터 시작하므로 1을 더해야 함
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  // 날짜 형식을 문자열로 반환 (yyyy-mm-dd)
  return `${year}.${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")}`;
}
