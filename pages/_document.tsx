import { Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ko">
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  );
}
