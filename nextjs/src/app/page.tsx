import { cookies } from "next/headers";
import { Suspense, use } from "react";

export default function Home() {
  return (
    <div>
      <h1>Hello Hono!</h1>
      {/* インメモリキャッシュの動作確認のために同じリクエストをアホほど送信するようにしてる */}
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
      <Suspense fallback={<div>Loading...</div>}>
        <Container />
      </Suspense>
    </div>
  );
}

const Container = () => {
  const cookieStore = cookies();
  const name = cookieStore.get("name");
  const data = use(
    fetch("http://localhost:3000/api/test", {
      cache: "force-cache",
      // cookieが変更されるとキャッシュを無視してリクエストを送信することの確認
      headers: {
        "Content-Type": "application/json",
        Cookie: `name=${name?.value ?? ""}`,
      },
    }).then((res) => res.json())
  );

  return <div>{data.route}</div>;
};
