/** Buitenlandse 2FA-aanvragen: vergelijk de code met het ontvangen bericht en keur goed. */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { Check, Loader2, X } from "lucide-react";
import { decideIntlRequest, listIntlRequests } from "@/lib/mfa.functions";

const STATUS: Record<string, string> = {
  pending: "Wacht op goedkeuring",
  approved: "Goedgekeurd",
  rejected: "Geweigerd",
  used: "Afgerond",
};

export function VerificationsPage() {
  const list = useServerFn(listIntlRequests);
  const decide = useServerFn(decideIntlRequest);
  const qc = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const q = useQuery({ queryKey: ["intl-requests"], queryFn: () => list(), refetchInterval: 10_000 });

  async function act(id: string, decision: "approved" | "rejected") {
    setBusy(id);
    setErr(null);
    try {
      await decide({ data: { id, decision } });
      await qc.invalidateQueries({ queryKey: ["intl-requests"] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Mislukt.");
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Verificaties</h1>
        <p className="text-sm text-muted-foreground">
          Keur een aanvraag pas goed als je het bericht met exact dezelfde code op je gsm ontving.
        </p>
      </div>
      {err && <p role="alert" className="text-sm text-destructive">{err}</p>}
      {q.isLoading ? (
        <Loader2 className="size-5 animate-spin" />
      ) : q.error ? (
        <p className="text-sm text-destructive">{(q.error as Error).message}</p>
      ) : !q.data?.length ? (
        <p className="text-sm text-muted-foreground">Geen aanvragen in de laatste 14 dagen.</p>
      ) : (
        <ul className="divide-y rounded-lg border bg-card">
          {q.data.map((r) => {
            const expired = new Date(r.expires_at).getTime() < Date.now();
            const open = r.status === "pending" && !expired;
            return (
              <li key={r.id} className="flex flex-wrap items-center gap-3 p-3">
                <div className="min-w-0 flex-1">
                  <div className="font-medium">{r.name || r.email}</div>
                  <div className="text-xs text-muted-foreground">
                    {r.email} · {r.country ?? "?"} · {new Date(r.created_at).toLocaleString("nl-BE")}
                  </div>
                </div>
                {open && r.code && (
                  <span className="rounded bg-muted px-2 py-1 font-mono text-lg tracking-widest">{r.code}</span>
                )}
                <span className="text-xs text-muted-foreground">
                  {expired && r.status === "pending" ? "Verlopen" : STATUS[r.status] ?? r.status}
                  {r.decided_by ? ` · ${r.decided_by}` : ""}
                </span>
                {open && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => act(r.id, "approved")}
                      disabled={busy === r.id}
                      className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-sm text-primary-foreground disabled:opacity-50"
                    >
                      <Check className="size-4" /> Goedkeuren
                    </button>
                    <button
                      onClick={() => act(r.id, "rejected")}
                      disabled={busy === r.id}
                      className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm disabled:opacity-50"
                    >
                      <X className="size-4" /> Weigeren
                    </button>
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
