import { createFileRoute, notFound } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { getPublicProfile } from "@/lib/public-profile.functions";
import { isLang, DEFAULT_LANG, type Lang } from "@/lib/routes-i18n";
import { PublicProfilePage } from "@/components/profile/PublicProfilePage";

export const profileQO = (id: string) =>
  queryOptions({ queryKey: ["public-profile", id], queryFn: () => getPublicProfile({ data: { id } }) });

const T: Record<Lang, { title: (n: string) => string; desc: string; anon: string; priv: string }> = {
  nl: { title: (n) => `${n} — profiel bij Maxilien`, desc: "Badges, certificaten en tijdlijn op de stadsboerderij Maxilien.", anon: "Boerderijvriend", priv: "Privéprofiel — Maxilien" },
  fr: { title: (n) => `${n} — profil chez Maxilien`, desc: "Badges, certificats et fil d'activité à la ferme urbaine Maxilien.", anon: "Ami de la ferme", priv: "Profil privé — Maxilien" },
  en: { title: (n) => `${n} — profile at Maxilien`, desc: "Badges, certificates and timeline at city farm Maxilien.", anon: "Farm friend", priv: "Private profile — Maxilien" },
};

export const Route = createFileRoute("/$lang/u/$id")({
  ssr: "data-only",
  loader: async ({ params, context }) => {
    if (!/^[a-z2-9]{10}$/i.test(params.id)) throw notFound();
    const p = await context.queryClient.ensureQueryData(profileQO(params.id.toLowerCase())).catch(() => null);
    if (!p || p.status === "not_found") throw notFound();
    return { status: p.status, name: p.status === "ok" ? p.name : null };
  },
  head: ({ params, loaderData }) => {
    const lang: Lang = isLang(params.lang) ? params.lang : DEFAULT_LANG;
    const t = T[lang];
    const ok = loaderData?.status === "ok";
    const title = ok ? t.title(loaderData?.name || t.anon) : t.priv;
    return {
      meta: [
        { title },
        { name: "description", content: t.desc },
        { property: "og:title", content: title },
        { property: "og:description", content: t.desc },
        { property: "og:type", content: "profile" },
        { name: "twitter:card", content: "summary" },
        ...(ok ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  notFoundComponent: () => <PublicProfilePage notFoundView />,
  errorComponent: () => <PublicProfilePage notFoundView />,
  component: () => <PublicProfilePage />,
});
