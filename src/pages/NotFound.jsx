import AppBar from "../components/AppBar";
import HeaderMessage from "../components/ui/HeaderMessage";

export default function NotFound() {
  return (
    <>
      <HeaderMessage title="Pagina non trovata" />
      <AppBar />
      <div className="flex flex-col items-center justify-center mt-[200px]">
        <h1>404 - Pagina non trovata</h1>
      </div>
    </>
  );
}
