export default function App() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">GITHUB ACTIONS BUILD TEST</p>
        <h1>External npm build plane verified.</h1>
        <p>
          This page requires React, ReactDOM, Vite, and the Vite React plugin to
          be fetched and built on a GitHub-hosted runner.
        </p>
        <div className="status">
          <span />
          Build artifact ready
        </div>
      </section>
    </main>
  );
}
