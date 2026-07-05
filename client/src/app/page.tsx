export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
      <div className="max-w-xl w-full text-center space-y-6">
        <h1 className="text-4xl font-extrabold tracking-tight">
          Mini Task Manager
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Welcome to the technical assessment boilerplate! The project has been configured with Next.js (App Router), Tailwind CSS, TypeScript, and an Express backend connection.
        </p>
        <div className="border border-slate-200 dark:border-slate-800 rounded-lg p-6 bg-white dark:bg-slate-800 shadow-sm text-left">
          <h2 className="text-xl font-bold mb-4">Initial Setup Complete</h2>
          <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
            <li><span className="font-semibold text-slate-700 dark:text-slate-300">client/</span> - Next.js frontend with Tailwind</li>
            <li><span className="font-semibold text-slate-700 dark:text-slate-300">server/</span> - Node.js & Express server with TypeScript</li>
            <li><span className="font-semibold text-slate-700 dark:text-slate-300">MongoDB</span> - Configured connection helper</li>
          </ul>
        </div>
      </div>
    </main>
  );
}

