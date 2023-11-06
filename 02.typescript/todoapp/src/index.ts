import "./index.css";

// 확장자를 제거하면 확장자가 자동으로 판단한다
import App from "./App";

// 쿼리셀렉터는 DOM에 #root가 있다면 반환하고 아니면 null을 전달한다.
// 'root' is possibly 'null'. 그래서 다음 에러가 발생할 수 있다.
// 'root'가 있다는 걸 보장할 수 있기 때문에 ! 연산자를 사용한다.
const root = document.querySelector("#root");

(async () => {
  // ES2022부터 Top-level await 기능이 지원된다
  // 일부 브라우저에서는 지원이 안 될수 있어 즉시실행함수 안에서 실행한다
  root!.appendChild(await App());
})();

console.log("TODO App", location.href);
