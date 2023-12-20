import Header from "@/components/header/Header";
import Sidemenu from "@/components/sidemenu/Sidemenu";

export default function Home() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateAreas: "'sidemenu header' 'sidemenu main",
        gridTemplateRows: "auto 1fr",
      }}
    >
      <div style={{ gridArea: "sidemenu" }}>
        <Sidemenu />
      </div>
      <div style={{ gridArea: "header" }}>
        <Header />
      </div>
      <div
        style={{ gridArea: "main", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "6rem" }}
      >
        <main>메인컨텐츠</main>
      </div>
    </div>
  );
}
