import Link from "next/link";

import { CLUSTER_LABELS, getPillar, getSpokes, type Cluster } from "@/lib/blog-registry";
import { accentText } from "@/lib/blog-colors";
import { cn } from "@/lib/utils";

const CLUSTERS: Cluster[] = ["lead-response", "whatsapp", "local-marketing", "verticals"];

export function ClusterNav({ currentCluster }: { currentCluster: Cluster }) {
  return (
    <section aria-labelledby="cluster-nav-heading" className="py-16">
      <h2 id="cluster-nav-heading" className="text-[12px] font-medium uppercase tracking-[0.14em] text-inkMuted">
        Explore by topic
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CLUSTERS.map((cluster) => {
          const pillar = getPillar(cluster);
          if (!pillar) return null;
          const spokes = getSpokes(pillar.slug);
          const isActive = cluster === currentCluster;

          return (
            <div
              key={cluster}
              className={cn(
                "rounded-2xl border p-5",
                isActive ? "border-ink/20 bg-canvasAlt" : "border-hairline",
              )}
            >
              <p className={cn("text-[11px] font-medium uppercase tracking-[0.14em]", accentText(pillar.accent))}>
                {CLUSTER_LABELS[cluster]}
              </p>
              <Link
                href={`/blog/${pillar.slug}`}
                className="mt-2 block text-[15px] font-medium text-ink transition-colors hover:text-inkBody"
              >
                {pillar.title}
              </Link>

              {isActive && spokes.length > 0 && (
                <ul className="mt-3 space-y-1.5 border-t border-hairline pt-3">
                  {spokes.map((spoke) => (
                    <li key={spoke.slug}>
                      <Link
                        href={`/blog/${spoke.slug}`}
                        className="text-[13px] text-inkBody transition-colors hover:text-ink"
                      >
                        {spoke.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
