export type products = "cabbage" | "apple" | "radish";

export type result = {
  predicted_percent: number[];
  predicted_class: number;
  url: string;
};

export type kakao = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_koken_expires_in: number;
  scope: string;
  token_type: string;
};

export type kakaoLogin = {
  data: { user_email: string; user_name: string };
  result: string;
};
