export type products = "cabbage" | "fuji_apple" | "yanggwang_apple" | "radish";

export type result = {
  predicted_percent: number[];
  predicted_class: 0 | 1 | 2;
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

export type info = {
  efficacy: string;
  select_tip: string;
  standard: string;
};

export type saveLogin = {
  platform: string;
  refresh?: string;
  email?: string;
};
