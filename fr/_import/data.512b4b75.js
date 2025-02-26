// Data import
import { FileAttachment } from "../_observablehq/stdlib.a12b38f2.js";

export const daten_controlling = await FileAttachment({"name":"../data/daten_controlling.txt","mimeType":"text/plain","path":"../_file/data/daten_controlling.7a3e776e.txt","lastModified":1740040485477,"size":7907}, import.meta.url).tsv({ typed: true });

const df_subcluster = await FileAttachment({"name":"../data/daten_subcluster.txt","mimeType":"text/plain","path":"../_file/data/daten_subcluster.4470f889.txt","lastModified":1739895367243,"size":2873}, import.meta.url).tsv({ typed: true });

export const df_subcluster_n = df_subcluster.map((d) => ({
  ...d,
  instrument_n:
    d.instrument === "Innovationsprojekte mit UP"
      ? "Projets d'innovation avec\npartenaire de mise en œuvre"
      : d.instrument === "Innovationsprojekte ohne UP"
        ? "Projets d'innovation sans\npartenaire de mise en œuvre"
        : d.instrument_fr,
  subcluster_n:
    d.subcluster === "Energy & environment"
      ? "Energy &\nenvironment"
      : d.subcluster === "Social sciences & business mgmt"
        ? "Social sciences &\nbusiness management"
        : d.subcluster,
}));

export const instrumentToInst = new Map([
  { instrument: "BRIDGE: Proof of Concept", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "BRIDGE: Discovery", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Start-up Coaching", inst: "Begleitung von Start-ups" },
  { instrument: "Enterprise Europe Network (EEN)", inst: "Starthilfe für Projekte und Vernetzung" },
  { instrument: "Flagship Initiative", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Innovation Booster", inst: "Starthilfe für Projekte und Vernetzung" },
  { instrument: "Innovationsmentoring", inst: "Starthilfe für Projekte und Vernetzung" },
  { instrument: "Innovationsprojekte mit Umsetzungspartner", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Innovationsprojekte ohne Umsetzungspartner", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Innovationsscheck", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Internationale Projekte", inst: "Förderung für internationale Innovationsprojekte" },
  { instrument: "Internationalisierung", inst: "Begleitung von Start-ups" },
  { instrument: "Partnerschaften und Events", inst: "Starthilfe für Projekte und Vernetzung" },
  { instrument: "Start-up Innovationsprojekte (2023ff)", inst: "Förderung für Schweizer Innovationsprojekte" },
  { instrument: "Entrepreneurship Training", inst: "Begleitung von Start-ups" },
  { instrument: "Start-up Core Coaching", inst: "Begleitung von Start-ups" }
].map(item => [item.instrument, item.inst])
);

export const instrument_link_hex = await FileAttachment({"name":"../data/instrument_link_hex.txt","mimeType":"text/plain","path":"../_file/data/instrument_link_hex.7afa5a80.txt","lastModified":1739889394226,"size":1202}, import.meta.url).tsv({ typed: true } )
export const instrument_link = new Map(
  instrument_link_hex.map(item => [item.instrument, item.link])
)

export const df_waffle = await FileAttachment({"name":"../data/daten_waffle.txt","mimeType":"text/plain","path":"../_file/data/daten_waffle.75989c62.txt","lastModified":1740149276013,"size":19160}, import.meta.url).tsv({ typed: true });

export const df_ip = [
  {
    instrument: "Innovationsprojekte mit Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2021,
    funding: 184,
    n: 399,
    label: "Projekte"
  },
  {
    instrument: "Innovationsprojekte mit Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2022,
    funding: 160,
    n: 336,
    label: "Projekte"
  },
  {
    instrument: "Innovationsprojekte mit Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2023,
    funding: 158,
    n: 307,
    label: "Projekte"
  },
  {
    instrument: "Innovationsschecks",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2021,
    funding: 184,
    n: 578,
    label: "KMU"
  },
  {
    instrument: "Innovationsschecks",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2022,
    funding: 160,
    n: 496,
    label: "KMU"
  },
  {
    instrument: "Innovationsschecks",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2023,
    funding: 158,
    n: 569,
    label: "KMU"
  },
  {
    instrument: "Start-up Core Coaching",
    inst: "Begleitung von Start-ups",
    year: 2021,
    funding: null,
    n: 83,
    label: "Start-ups"
  },
  {
    instrument: "Start-up Core Coaching",
    inst: "Begleitung von Start-ups",
    year: 2022,
    funding: null,
    n: 57,
    label: "Start-ups"
  },
  {
    instrument: "Start-up Core Coaching",
    inst: "Begleitung von Start-ups",
    year: 2023,
    funding: null,
    n: 94,
    label: "Start-ups"
  },
  {
    instrument: "Bridge: Proof of Concept",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2021,
    funding: null,
    n: 28,
    label: "Forschende"
  },
  {
    instrument: "Bridge: Proof of Concept",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2022,
    funding: null,
    n: 41,
    label: "Forschende"
  },
  {
    instrument: "Bridge: Proof of Concept",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2023,
    funding: null,
    n: 52,
    label: "Forschende"
  },
  {
    instrument: "Innovationsprojekte ohne Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2021,
    funding: null,
    n: 39,
    label: "Projekte"
  },
  {
    instrument: "Innovationsprojekte ohne Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2022,
    funding: null,
    n: 38,
    label: "Projekte"
  },
  {
    instrument: "Innovationsprojekte ohne Umsetzungspartner",
    inst: "Förderung für Schweizer Innovationsprojekte",
    year: 2023,
    funding: null,
    n: 60,
    label: "Projekte"
  }
];

export const kof_did = await FileAttachment({"name":"../data/daten_kof_did.txt","mimeType":"text/plain","path":"../_file/data/daten_kof_did.8a69cf01.txt","lastModified":1739458387196,"size":931}, import.meta.url)
  .tsv()
  .then((data) =>
    data.map((d) => {
      return {
        ...d,
        type_de:
          d.type === "employment"
            ? "Emploi"
            : d.type === "sales"
              ? "Ventes"
              : d.type
      };
    })
  );

const df_ziel_erfolg = await FileAttachment({"name":"../data/daten_zielerreichung.txt","mimeType":"text/plain","path":"../_file/data/daten_zielerreichung.89502fea.txt","lastModified":1739996271440,"size":17883}, import.meta.url).tsv({ typed: true });
export const df_ziel = df_ziel_erfolg.filter((d) => d.category === "Zielerreichung");
export const df_erfolg = df_ziel_erfolg.filter((d) => d.category === "Erfolg");

export const df_zufrieden = df_ziel_erfolg
  .filter((d) => d.category === "Zufriedenheit")
  .map((d) => ({
  ...d,
  instrument_fr:
    d.instrument_fr === "Projets d'innovation avec partenaire de mise en œuvre"
      ? "Projets d'innovation avec\npartenaire de mise en œuvre"
      : d.instrument_fr === "Projets d'innovation sans partenaire de mise en œuvre"
        ? "Projets d'innovation sans\npartenaire de mise en œuvre"
        : d.instrument_fr
  }));

export const df_ergebnisse = await FileAttachment({"name":"../data/daten_ergebnisse.txt","mimeType":"text/plain","path":"../_file/data/daten_ergebnisse.869f0158.txt","lastModified":1740045678262,"size":14637}, import.meta.url).tsv({ typed: true });
const innovationsart = await FileAttachment({"name":"../data/daten_innovationsart.txt","mimeType":"text/plain","path":"../_file/data/daten_innovationsart.500e2762.txt","lastModified":1740043972638,"size":28107}, import.meta.url).tsv({ typed: true });
export const df_innovationsart = innovationsart.map((d) => ({
  ...d,
  instrument_n:
    d.instrument_de === "Innovationsprojekte mit UP"
      ? "Projets d'innovation avec\npartenaire de mise en œuvre"
      : d.instrument_de === "Innovationsprojekte ohne UP"
        ? "Projets d'innovation sans\npartenaire de mise en œuvre"
        : d.instrument_fr,
  type_fr_n:
        d.type_fr === "innovation de modèle d'entreprise"
          ? "innovation\nde modèle d'entreprise"
          : d.type_fr === "innovation de produit"
        ? "innovation\nde produit"
        : d.type_fr === "innovation en matière de services"
            ? "innovation\nen matière de services"
            : d.type_fr
}));

export const ia_order = new Set(
  df_innovationsart
    .filter((d) => ["inkrementelle", "radikale", "disruptive"].includes(d.type))
    .map((item) => item.instrument_n)
);
