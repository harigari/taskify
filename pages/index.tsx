import Header from "@/components/header/Header";
import Sidemenu from "@/components/sidemenu/Sidemenu";

export default function Home() {
  return (
    <div style={{ display: "grid", gridTemplateAreas: "'sidemenu header' 'sidemenu main" }}>
      <div style={{ gridArea: "sidemenu" }}>
        <Sidemenu />
      </div>
      <div style={{ gridArea: "header" }}>
        <Header />
      </div>
      <div style={{ gridArea: "main" }}>
        <main>메인컨텐츠</main>
      </div>
    </div>
  );
}
