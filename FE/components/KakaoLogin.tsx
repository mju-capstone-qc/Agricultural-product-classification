import { View } from "react-native";
import WebView from "react-native-webview";
import axios, { AxiosResponse } from "axios";
import { KAKAO_REST_API, KAKAO_CLIENT_SECRET, URI } from "@env";
import { kakao, kakaoLogin } from "../types/type";
import { useEffect, useState } from "react";
import { getLoginInfo, saveLoginInfo } from "../utils/login";

const runFirst = `window.ReactNativeWebView.postMessage("this is message from web");`;

type props = {
  loginHandler: (logined: boolean) => void;
};

const KakaoLogin = ({ loginHandler }: props) => {
  const [loading, setLoading] = useState(false);

  function LogInProgress(data: string) {
    console.log(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API}&redirect_uri=${URI}/kakao`
    );
    const exp = "code=";

    const condition = data.indexOf(exp);
    console.log(condition);
    if (condition != -1) {
      const request_code = data.substring(condition + exp.length);

      console.log("access code :: " + request_code);

      // 토큰값 받기

      requestToken(request_code);
    }
  }
  const requestToken = async (request_code: string) => {
    let returnValue = "none";
    setLoading(true);
    try {
      const request_token_url = "https://kauth.kakao.com/oauth/token";

      axios({
        method: "post",
        url: request_token_url,
        params: {
          grant_type: "authorization_code",
          client_id: KAKAO_REST_API,
          redirect_uri: `${URI}/kakao`,
          code: request_code,
          client_secret: KAKAO_CLIENT_SECRET,
        },
      })
        .then(function (response: AxiosResponse<kakao>) {
          returnValue = response.data.access_token;
          const refresh = response.data.refresh_token;
          console.log("refresh", refresh);
          saveLoginInfo(refresh);
          axios
            .post(`${URI}/kakao/login`, {
              access_token: returnValue,
            })
            .then((res: AxiosResponse<kakaoLogin>) => {
              console.log(res.data);
              if (res.data.result === "success") {
                loginHandler(true);
              }
            });
        })
        .catch(function (error) {
          console.log("error", error);
        });
    } catch (error) {
      console.log("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        originWhitelist={["*"]}
        scalesPageToFit={false}
        style={{ marginTop: 30 }}
        source={{
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_REST_API}&redirect_uri=http://172.20.10.3:5000/kakao`,
        }}
        injectedJavaScript={runFirst}
        javaScriptEnabled={true}
        onMessage={(event) => {
          LogInProgress(event.nativeEvent.url);
        }}

        // onMessage ... :: webview에서 온 데이터를 event handler로 잡아서 logInProgress로 전달
      />
    </View>
  );
};

export default KakaoLogin;
