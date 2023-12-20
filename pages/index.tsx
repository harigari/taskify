import Header from "@/components/header/Header";
import Sidemenu from "@/components/sidemenu/Sidemenu";

export default function Home() {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidemenu />
      </div>
      <div>
        <Header />
      </div>
    </div>
  );
}
