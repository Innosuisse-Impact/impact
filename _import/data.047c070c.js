// Data import
import {FileAttachment} from "../_observablehq/stdlib.86572394.js";
export const daten_controlling = await FileAttachment({"name":"../data/daten_controlling.txt","mimeType":"text/plain","path":"../_file/data/daten_controlling.e80418ee.txt","lastModified":1737579114417,"size":6281}, import.meta.url).tsv({ typed: true });

const df_subcluster = await FileAttachment({"name":"../data/daten_subcluster.txt","mimeType":"text/plain","path":"../_file/data/daten_subcluster.99278e42.txt","lastModified":1737039950476,"size":2249}, import.meta.url).tsv({ typed: true });

export const df_subcluster_n = df_subcluster.map((d) => ({
  ...d,
  instrument_n:
    d.instrument === "Innovationsprojekte mit UP"
      ? "Innovationsprojekte mit\nUmsetzungspartner"
      : d.instrument === "Innovationsprojekte ohne UP"
        ? "Innovationsprojekte ohne\nUmsetzungspartner"
        : d.instrument
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