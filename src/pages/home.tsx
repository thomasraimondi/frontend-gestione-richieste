import HeaderMessage from "../components/ui/HeaderMessage";

export default function Home() {
  return (
    <>
      <div>
        <HeaderMessage title="Gestione Richieste" />
        <div className="container w-full p-4 grow mx-auto">
          <p>questa applicazione gestisce le richieste da parte dei Crew, per la gestione delle richieste si può accedere tramite il menu a sinistra</p>
        </div>
      </div>
    </>
  );
}
