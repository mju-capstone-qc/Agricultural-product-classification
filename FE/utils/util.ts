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

export function getKoreanDate(): string {
  // 현재 시간을 기준으로 Date 객체 생성
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  // getMonth() 메서드의 반환값은 0부터 시작하므로 1을 더해야 함
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();
  // 날짜와 시간을 형식화하여 문자열로 반환 (yyyy.mm.dd hh:mm)
  const formattedDate = `${year}.${month.toString().padStart(2, "0")}.${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  return formattedDate;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  date.setHours(date.getHours() - 9);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
};

export const product_idx = {
  cabbage: 1,
  apple: 2,
  radish: 3,
  // chinese_cabbage: 4,
};
