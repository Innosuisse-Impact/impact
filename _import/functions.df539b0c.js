import * as Plot from "../_npm/@observablehq/plot@0.6.16/239523e7.js";
import * as aq from "../_npm/arquero@7.2.0/1de27a6a.js";
import * as d3 from "../_npm/d3@7.9.0/7055d4c5.js";
import { color_inst, color_subcluster, grey_innosuisse, black_innosuisse} from "./colors.b5e821a4.js";
import { html } from "../_npm/htl@0.3.1/063eb405.js";
import { daten_controlling, df_subcluster_n, instrumentToInst } from "./data.047c070c.js"

export function coloredUnderline(text, domain) {
  const colorScale = color_inst.apply;
  const color = colorScale(domain);
  return html`<span style="border-bottom: solid 2px ${color};">${text}</span>`;
}

export function cUh3(text = "Innovationsmentoring", level = "h3") {
  const domain = level === "h3" ? instrumentToInst.get(text) : text;
  const colorScale = color_inst.apply;
  const color = colorScale(domain);
  return level === "h3"
    ? html`<br><h3><span style="border-bottom: solid 2px ${color};">${text}</span></h3>`
    : html`<span style="border-bottom: solid 4px ${color};">${text}</span>`;
}

// Methodische Grundlage
export const plot_erhebung = Plot.plot({
  height: 110,
  width: 540,
  marginTop: 35,
  marginBottom: 25,
  marginLeft: 25,
  marginRight: 100,
  x: {
    domain: [0, 6],
    tickFormat: () => "",
    tickSize: 0,
    label: null
  },

  y: {
    domain: [0.2, 1.8],
    tickFormat: () => "", // Hide y-axis ticks
    tickSize: 0,
    label: null
  },

  marks: [
    Plot.rect([{ x1: 0, x2: 3, y1: 0.5, y2: 1.5 }], {
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2",
      fill: grey_innosuisse
    }),
    Plot.arrow([{ x1: 3.2, x2: 5.8, y1: 1, y2: 1 }], {
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2",
      stroke: grey_innosuisse
    }),
    // Mark the survey points with red circles
    Plot.dot([{ year: 3 }, { year: 6 }], {
      x: "year",
      y: 1,
      r: 7,
      symbol: "diamond",
      fill: black_innosuisse
    }),

    // Label the survey points
    Plot.text(
      [
        { year: 3, text: "Erhebung 1:\nAbschluss der Förderung" },
        { year: 6, text: "Erhebung 2:\n3 Jahre nach Abschluss" }
      ],
      {
        x: "year",
        y: 1,
        text: "text",
        fontSize: 12,
        textAnchor: "middle",
        dy: -40
      }
    ),

    // Annotate the phases
    Plot.text([{ year: 1.5, text: "Umsetzung\nFördermassnahme" }], {
      x: "year",
      y: 1,
      text: "text",
      fontSize: 12,
      textAnchor: "middle"
    })
  ]
});

export function draw_fin_plot(
  funding,
  type,
  height,
  displayXAxis,
  displayCaption = false
) {
  const data = aq
    .from(daten_controlling)
    .groupby("FA", "inst", "instrument", "type", "label", "monitoring")
    .rollup({
      mean_funding: (d) => aq.op.round(aq.op.mean(d.funding) * 10) / 10,
      sum_funding: (d) => aq.op.round(aq.op.sum(d.funding) * 10) / 10,
      mean_n: (d) => aq.op.round(aq.op.mean(d.n)),
      sum_n: (d) => aq.op.round(aq.op.sum(d.n))
    })
    .objects();

  const df =
    type === undefined
      ? data.filter((d) => d.FA === funding)
      : data.filter((d) => (d.type === type) & (d.FA === funding));

  const text = type === undefined ? funding : type;

  return Plot.plot({
    marginLeft: 250,
    caption: displayCaption
      ? html`<span style="font-size: 10px; color: #828282;">Quelle: Cockpit/PowerBI Innosuisse (2025)</span>`
      : undefined,
    height: height,
    style: { fontSize: 11 },
    marginTop: displayXAxis ? 40 : 0,
    marginBottom: 10,
    y: { label: null, tickSize: 0 },
    x: {
      domain: [0, 180],
      tickSpacing: 50,
      label: displayXAxis
        ? "Bewilligte Mittel in Mio. Fr. pro Jahr (⌀ 2021–2023)"
        : null
    },
    style: { fontSize: 11 },
    color: color_inst,
    marks: [
      Plot.axisX({ anchor: "top", ticks: [0, 50, 100, 150, 200] }),
      Plot.gridX({ interval: 25 }),
      Plot.barX(df, {
        x: "mean_funding",
        y: (d) => (d.monitoring === "Ja" ? `*${d.instrument}` : d.instrument),
        sort: { y: "x", reverse: true },
        fill: "inst"
      }),
      Plot.barX(
        df.filter((d) => d.monitoring !== "Ja"),
        {
          x: "mean_funding",
          y: (d) => (d.monitoring === "Ja" ? `*${d.instrument}` : d.instrument),
          sort: { y: "x", reverse: true },
          opacity: 0.6,
          fill: "white"
        }
      ),
      Plot.textX(df, {
        x: "mean_funding",
        y: (d) => (d.monitoring === "Ja" ? `*${d.instrument}` : d.instrument),
        text: (d) =>
          d.instrument === "Start-up Innovationsprojekte (2023ff)" ||
          d.instrument === "Swiss Accelerator Innovationsprojekte (2023–2024)"
            ? `${d.mean_funding.toLocaleString("fr-CH")} Mio. Fr. (2023)`
            : d.instrument === "BRIDGE: Proof of Concept" ||
              d.instrument === "BRIDGE: Discovery"
            ? `⌀ ${d.mean_funding.toLocaleString(
                "fr-CH"
              )} Mio. Fr. (Betrag wird durch den SNF verdoppelt)`
            : `⌀ ${d.mean_funding.toLocaleString("fr-CH")} Mio. Fr.`,
        textAnchor: "start",
        dx: 5,
        sort: { y: "x", reverse: true }
      }),
      Plot.ruleX([0])
    ]
  });
}

export const n_subcluster = Plot.plot({
  marginLeft: 150,
  marginRight: 50,
  marginBottom: 0,
  marginTop: 45,
  caption: html`<span style="font-size: 10px; color: #828282;">Quelle: Cockpit/PowerBI Innosuisse (2025)</span>`,
  style: { fontSize: 11 },
  width: 755,
  height: 250,
  color: color_subcluster,
  fx: {
    domain: [
      "Engineering",
      "Life sciences",
      "Energy & environment",
      "ICT",
      "Social sciences & business mgmt"
    ],
    axis: "top",
    tickFormat: (d) => "",
    label: ""
  },
  x: {
    labelOffset: 35,
    domain: [0, 80],
    axis: "top",
    labelAnchor: "left",
    percent: true,
    label:
      "Anteil bewilligte Innovationsvorhaben in % nach Themenbereich pro Förderangebot (⌀ 2021–2023)",
    ticks: []
  },
  y: {
    label: "",
    tickSize: 0,
    domain: [
      "Innovationsprojekte mit\nUmsetzungspartner",
      "Innovationsscheck",
      "Innovationsprojekte ohne\nUmsetzungspartner",
      "BRIDGE: Proof of Concept",
      "Start-up Core Coaching"
    ]
  },
  marks: [
    Plot.barX(df_subcluster_n, {
      x: "obs_value",
      y: "instrument_n",
      fx: "subcluster",
      fill: "subcluster",
      insetTop: 5,
      insetBottom: 5,
      sort: { y: "x", reverse: true }
    }),
    Plot.textX(df_subcluster_n, {
      x: "obs_value",
      y: "instrument_n",
      fx: "subcluster",
      text: (d) => d3.format("0.0%")(d.obs_value),
      textAnchor: "start",
      dx: 5
    }),
    Plot.text(
      df_subcluster_n.filter(
        (d) => d.instrument === "Innovationsprojekte mit UP"
      ),
      {
        fx: "subcluster",
        y: "instrument_n",
        text: "subcluster",
        frameAnchor: "top-left",
        dy: -35
      }
    )
  ]
})

export function draw_result(data, type, x_axis = true, sy = 0) {
  const df = data.filter((d) => d.type === type);
  const x_axis_d = x_axis
    ? { percent: true, label: "in %", ticks: [0, 25, 50, 75, 100] }
    : { label: null, axis: null };

  return Plot.plot({
    height: x_axis ? 40 + 25 + sy : 40 + sy,
    x: x_axis_d,
    style: { fontSize: 11 },
    marginBottom: x_axis ? 25 : 0,
    marginTop: 0,
    marginLeft: 250,
    marginRight: 100,
    //height: x_axis ? 75 : 75,
    y: {
      label: null,
      axis: "right",
      tickSize: 0,
      type: "band",
      reverse: true
    },
    fy: {
      axis: "left",
      label: null,
      ticks: null
    },

    color:
      data === df_ziel
        ? color_ziel
        : data === df_zufrieden
        ? color_zufrieden
        : color_erfolg,
    marks: [
      //Plot.axisX({ ticks: [0, 25, 50, 75, 100] }),
      Plot.barX(df, {
        x: "pct",
        y: "respondant",
        fy: "type",
        fill: "result_type"
      }),
      Plot.textX(
        df,
        Plot.stackX({
          x: "pct",
          y: "respondant",
          fy: "type",
          text: (d) => d3.format("0.0%")(d.pct),
          opacity: (d) => (d.pct < 0.04 ? 0 : 1)
        })
      )
    ]
  });
}