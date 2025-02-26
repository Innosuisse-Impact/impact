import * as Plot from "../_npm/@observablehq/plot@0.6.16/239523e7.js";
import * as aq from "../_npm/arquero@8.0.0/a9fa94cf.js";
import * as d3 from "../_npm/d3@7.9.0/7055d4c5.js";
import { color_inst, color_subcluster, grey_innosuisse, black_innosuisse, grey_background, grey_comment, color_zufrieden, colors_dark, color_instrument} from "./colors.8bf21797.js";
import { html } from "../_npm/htl@0.3.1/063eb405.js";
import {
  daten_controlling, df_subcluster_n, instrumentToInst, df_ziel,
  df_innovationsart, df_zufrieden, df_waffle, df_ergebnisse, kof_did,
  instrument_link
} from "./data.512b4b75.js"

export const language = {value: "fr", label: "Deutsch"}

export function coloredUnderline(text, domain) {
  const colorScale = color_instrument.apply;
  const color = colorScale(domain);
  const link = instrument_link.get(domain);
  return html`<a href="${link}" style="text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 2px; text-decoration-color: ${color}; color: #3d3d3d">${text}</a>`;
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
        { year: 3, text: "Enquête 1:\nFin de la période d'encouragement" },
        { year: 6, text: "Enquête 2:\n3 ans après la fin" }
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
    Plot.text([{ year: 1.5, text: "Mise en œuvre de \nl'offre d'encouragement" }], {
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
    .groupby("FA", "inst", "instrument_fr", "type", "label_fr", "monitoring")
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
    marginLeft: 300,
    marginRight: 55,
    marginTop: displayXAxis ? 45 : -1,
    marginBottom: 0,
    caption: displayCaption
      ? html`<span style="font-size: 10px; color: #828282;">Source: Cockpit/PowerBI Innosuisse (2025)</span>`
      : undefined,
    height: height,
    x: {
      domain: [0, 200],
      tickSize: displayXAxis ? 1 : 0,
      tickSpacing: 50,
      labelOffset: 45,
      label: displayXAxis
        ? "Fonds accordés en millions de francs par an (⌀ 2021-2023)"
        : null
    },
    y: { label: null, tickSize: 0 },style: {
      fontFamily: "sans-serif",
      fontSize: "12px",
      fontWeight: 200,
      color: black_innosuisse
      // overflow: "visible"
    },
    color: color_inst,
    marks: [
      Plot.axisX({ anchor: "top", ticks: [0, 50, 100, 150, 200] }),
      Plot.gridX({ interval: 25 }),
      Plot.barX(df, {
        x: "mean_funding",
        y: (d) => (d.monitoring === "Ja" ? `*${d.instrument_fr}` : d.instrument_fr),
        sort: { y: "x", reverse: true },
        fill: "inst"
      }),
      Plot.barX(
        df.filter((d) => d.monitoring !== "Ja"),
        {
          x: "mean_funding",
          y: (d) => (d.monitoring === "Ja" ? `*${d.instrument_fr}` : d.instrument_fr),
          sort: { y: "x", reverse: true },
          opacity: 0.6,
          fill: "white"
        }
      ),
      Plot.textX(df, {
        x: "mean_funding",
        y: (d) => (d.monitoring === "Ja" ? `*${d.instrument_fr}` : d.instrument_fr),
        text: (d) =>
          d.instrument_fr === "Projets d'innovation pour start-up (2023+)"
            ? `${d.mean_funding.toLocaleString("fr-CH")} mio, de francs (2023)`
            : d.instrument_fr === "BRIDGE Proof of Concept" ||
              d.instrument_fr === "BRIDGE Discovery"
            ? `⌀ ${d.mean_funding.toLocaleString("fr-CH")} mio. de francs (Le montant est doublé par le FNS)`
            : `⌀ ${d.mean_funding.toLocaleString("fr-CH")} mio. de francs`,
        textAnchor: "start",
        dx: 5,
        sort: { y: "x", reverse: true }
      }),
      Plot.ruleX([0])
    ]
  });
}

export const n_subcluster = Plot.plot({
  marginLeft: 170,
  marginRight: 50,
  marginBottom: 0,
  marginTop: 65,
  caption: html`<span style="font-size: 10px; color: #828282;">Source: Cockpit / PowerBI Innosuisse (2025)</span>`,
  style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
  width: 755,
  height: 270,
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
    labelOffset: 45,
    domain: [0, 80],
    axis: "top",
    labelAnchor: "left",
    percent: true,
    label:
      "Part des projets innovants accordés en % selon le domaine thématique par offre d'encouragement (⌀ 2021-2023)",
    ticks: []
  },
  y: {
    label: "",
    tickSize: 0,
    domain: [
      "Projets d'innovation avec\npartenaire de mise en œuvre",
      "Chèque d'innovation",
      "Projets d'innovation sans\npartenaire de mise en œuvre",
      "BRIDGE Proof of Concept",
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
        text: "subcluster_n",
        frameAnchor: "top-left",
        dy: -45
      }
    )
  ]
})

export function draw_result(data, instrument, x_axis = true, sy = 0) {
  const df = data.filter((d) => d.instrument_de === instrument);
  const x_axis_d = x_axis
    ? { percent: true, label: "in %", ticks: [0, 25, 50, 75, 100] }
    : { label: null, axis: null };
  
  const instr = `instrument_${language.value}`;
  const respondant = `respondant_${language.value}`;
  const result_type = `result_type_${language.value}`;

  return Plot.plot({
    height: x_axis ? 40 + 25 + sy : 40 + sy,
    x: x_axis_d,
    style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    marginBottom: x_axis ? 25 : 0,
    marginTop: 0,
    marginLeft: 180,
    marginRight: 170,
    //height: x_axis ? 75 : 75,
    y: {
      label: null,
      axis: "right",
      tickSize: 0,
      type: "band",
      reverse: false
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
        x: (d) => d.pct/100,
        y: respondant,
        fy: instr,
        fill: result_type
      }),
      Plot.textX(
        df,
        Plot.stackX({
          x: (d) => d.pct/100,
          y: respondant,
          fy: instr,
          text: (d) => d3.format("0.0%")(d.pct/100),
          opacity: (d) => (d.pct/100 < 0.04 ? 0 : 1)
        })
      )
    ]
  });
}

export function draw_innoart(plot = "type_2", width = 640, height = 150) {
  const df = df_innovationsart.filter((d) => d.plot === plot && d.pct !== null);

  const type = `type_${language.value}_n`;

  const x_axis_d = {
    axis: "top",
    labelOffset: 55,
    labelAnchor: "left",
    domain: [0, 100],
    ticks: [],
    label: df[0].label_fr
  };

  const fx_axis_d = {
    label: null,
    axis: "top"
  };

  const df_order = new Set(df.map((item) => item.instrument_n));

  return Plot.plot({
    marginTop: 65,
    marginLeft: 170,
    marginBottom: 0,
    width: width,
    height: height,
    color: color_inst,
    fx: {
      label: null,
      axis: "top"
    },
    fy: { label: null },
    style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    x: x_axis_d,
    y: { domain: df_order, label: null, tickSize: 0 },
    marks: [
      Plot.barX(df, {
        x: "pct",
        y: "instrument_n",
        fill: "inst",
        fx: type,
        inset: 0.5,
        sort: { y: "-x" }
      }),
      Plot.barX(df, {
        x1: "pct",
        x2: 100,
        y: "instrument_n",
        fill: grey_background,
        fx: type,
        inset: 0.5
      }),
      Plot.textX(df, {
        x: "pct",
        y: "instrument_n",
        text: (d) => `${d.pct} %`,
        dx: 5,
        fx: type,
        sort: { y: "-x" },
        textAnchor: "start"
      })
    ]
  });
}

export function draw_dn(
  plot = "digital",
  instrument = "Start-up Core Coaching",
  x_axis = true,
  sy = 0
) {
  const df = df_innovationsart.filter(
    (d) => d.plot === plot && instrument.includes(d.instrument_de)
  );

  const type = `type_${language.value}_n`;
  const respondant = `respondant_${language.value}`;

  const df_highlight =
    plot === "digital"
      ? df.filter((d) => d.type_de === "Digitalisierung")
      : df.filter((d) => d.type_de === "Nachhaltigkeit");

  const x_axis_d = x_axis
    ? {
        axis: "top",
        labelOffset: 45,
        labelAnchor: "left",
        domain: [0, 100],
        ticks: [],
        label: df[0].label_fr
      }
    : { label: null, axis: null };

  const fx_axis_d = x_axis
    ? {
        label: null,
        axis: "top"
      }
    : {
        label: null,
        axis: null
      };

  const df_order = new Set(df.map((item) => item.instrument_n));

  return Plot.plot({
    marginTop: x_axis ? 45 : 0,
    marginBottom: 0,
    marginLeft: 165,
    marginRight: 120,
    height: x_axis ? 85 + sy : 40 + sy,
    width: 800,
    color: color_inst,
    fx: {
      label: null,
      axis: "top",
      reverse: true,
      domain: plot !== "digital" ? ["durabilité sociale", "durabilité environnementale", "durabilité"]: undefined
    },
    fy: { label: null },
    style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    x: x_axis_d,
    y: { label: null, tickSize: 0, axis: "right", reverse: true },
    marks: [
      Plot.barX(df, {
        x: "pct",
        y: respondant,
        fill: "inst",
        fx: type,
        fy: "instrument_n",
        opacity: 0.5,
        inset: 0.5,
        sort: { y: "-x" }
      }),
      Plot.barX(df_highlight, {
        x: "pct",
        y: respondant,
        fill: "inst",
        fx: type,
        fy: "instrument_n",
        inset: 1,
        sort: { y: "-x" }
      }),
      Plot.barX(df, {
        x1: "pct",
        x2: 100,
        y: respondant,
        fill: grey_background,
        fx: type,
        fy: "instrument_n",
        inset: 0.5
      }),
      Plot.textX(df, {
        x: "pct",
        y: respondant,
        text: (d) => `${d.pct} %`,
        dx: 5,
        fx: type,
        fy: "instrument_n",
        sort: { y: "-x" },
        textAnchor: "start"
      }),
      Plot.textX(
        df_highlight.filter(
          (d) => d.type_de === "Nachhaltigkeit" || "Digitalisierung"
        ),
        {
          x: 100,
          y: respondant,
          text: ["→"],
          dx: 2,
          dy: x_axis ? 11 : 0,
          fx: type,
          fy: "instrument_n",
          sort: { y: "-x" },
          textAnchor: "start"
        }
      )
    ]
  });
}

// Ergebnisse Förderangebote

export function drawMiniPlot(instrument, funding = true) {
  const df =
    instrument !== "Innovation Booster" // Daten für Innovation Booster werden ausgetauscht, da die aktiven Innovation Booster und die investierten Beiträge besser verständlich sind.
      ? daten_controlling.filter((d) => d.instrument === instrument)
      : [
          {
            FA: "Starthilfe für Projekte und Vernetzung",
            inst: "Starthilfe für Projekte und Vernetzung",
            type: "Starthilfe für Projekte und Vernetzung",
            instrument: "Innovation Booster",
            year: 2021,
            funding: 4.9,
            n: 12,
            label_fr: "Innovation Booster",
            monitoring: "Ja"
          },
          {
            FA: "Starthilfe für Projekte und Vernetzung",
            inst: "Starthilfe für Projekte und Vernetzung",
            type: "Starthilfe für Projekte und Vernetzung",
            instrument: "Innovation Booster",
            year: 2022,
            funding: 8,
            n: 18,
            label_fr: "Innovation Booster",
            monitoring: "Ja"
          },
          {
            FA: "Starthilfe für Projekte und Vernetzung",
            inst: "Starthilfe für Projekte und Vernetzung",
            type: "Starthilfe für Projekte und Vernetzung",
            instrument: "Innovation Booster",
            year: 2023,
            funding: 7,
            n: 17,
            label_fr: "Innovation Booster",
            monitoring: "Ja"
          }
        ];

  const label = df[0].label_fr;

  return Plot.plot({
    color: color_inst,
    height: 100,
    width: 110,
    marginTop: 35,
    marginRight: 40,
    marginLeft: 0,
    y: funding ? { label: "mio. de francs" } : { label: label, domain: instrument !== "Start-up Coaching" ? undefined : [0,400] },
    x: {
      domain: [2021, 2022, 2023],
      ticks: [2021, 2023],
      tickSize: 0,
      label: null,
      tickFormat: (d) => String(d)
    },
    style: {fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    marks: [
      Plot.barY(df, {
        x: "year",
        y: funding ? "funding" : "n",
        fill: "inst",
        sort: { x: "y", reverse: true }
      }),
      Plot.textY(df, {
        x: "year",
        y: funding ? "funding" : "n",
        text: (d) =>
          funding && d.funding > 100
            ? d.funding.toFixed(0)
            : funding
            ? (d.funding.toFixed(1) * 1).toLocaleString("fr-CH")
            : d.n,
        dy: -9,
        sort: { x: "y", reverse: true },
        frameAnchor: "middle"
      }),
      Plot.ruleY([0])
    ]
  });
}

export function drawMiniPlot1(instrument = "Start-up Core Coaching", funding = false) {
  const df = [
    {
      FA: "Begleitung von Start-ups",
      inst: "Begleitung von Start-ups",
      type: "Begleitung von Start-ups",
      instrument: "Start-up Coaching",
      year: 2021,
      funding: 4.3,
      n: 319,
      label: "Total Coaching",
      monitoring: "Ja"
    },
    {
      FA: "Begleitung von Start-ups",
      inst: "Begleitung von Start-ups",
      type: "Begleitung von Start-ups",
      instrument: "Start-up Coaching",
      year: 2022,
      funding: 3.3,
      n: 283,
      label: "Total Coaching",
      monitoring: "Ja"
    },
    {
      FA: "Begleitung von Start-ups",
      inst: "Begleitung von Start-ups",
      type: "Begleitung von Start-ups",
      instrument: "Start-up Coaching",
      year: 2023,
      funding: 6,
      n: 380,
      label: "Total Coaching",
      monitoring: "Ja"
    }
  ];

  const label = df[0].label;

  return Plot.plot({
    color: color_inst,
    height: 100,
    width: 100,
    marginTop: 35,
    marginRight: 30,
    marginLeft: 0,
    y: funding ? { label: "Mio. Fr." } : { label: label, domain: [0, 400] },
    x: {
      domain: [2021, 2022, 2023],
      ticks: [2021, 2023],
      tickSize: 0,
      label: null,
      tickFormat: (d) => String(d)
    },
    style: {fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    marks: [
      Plot.barY(df, {
        x: "year",
        y: funding ? "funding" : "n",
        fill: "inst",
        sort: { x: "y", reverse: true }
      }),
      Plot.textY(df, {
        x: "year",
        y: funding ? "funding" : "n",
        text: (d) =>
          funding && d.funding > 100
            ? d.funding.toFixed(0)
            : funding
            ? (d.funding.toFixed(1) * 1).toLocaleString("fr-CH")
            : d.n,
        dy: -9,
        sort: { x: "y", reverse: true },
        frameAnchor: "middle"
      }),
      Plot.ruleY([0])
    ]
  });
}
export function draw_waffle(
  title = "ip_impuls",
  dy_text = 0,
  dy_text2 = 0,
  colors = colors_dark
) {
  const df = df_waffle.filter((d) => d.title === title);
  const df1 = df.filter((d) => d.rank === "pct1");
  const df2 = df.filter((d) => d.rank === "pct2");

  // Dynamically select the correct text columns based on the global language variable
  const text = `text_${language.value}`; // Column name for first text based on current language

  const color_scale =
    df[0].negative && df[0].opposites
      ? "negative_opposite"
      : df[0].negative && !df[0].opposites
      ? "negative"
      : df[0].inst;

  const x1 = df2.length !== 0 ? getLastDigit(df2[0].pct) * 10 - 1 : null;

  const y1 =
    df2.length !== 0
      ? Math.floor(df2[0].pct / 10) * 10 + (x1 === 94 ? 2 : 10)
      : null;
  const y2 =
    df2.length !== 0
      ? Math.floor(df2[0].pct / 10) * 10 + (x1 === 94 ? 15 : 23) + dy_text2
      : null;

  const marks = [
    Plot.waffleY(
      { length: 1 },
      {
        y2: [100],
        fill: colors === colors_dark ? "#E8E8E8" : "white",
        rx: "100%",
        gap: 3.5,
        stroke: grey_innosuisse,
        strokeWidth: colors === colors_dark ? 0 : 1
      }
    ),
    // Formatting of text1
    Plot.text(df1, {
      // x: [33],
      // y: [95],
      text: text,
      lineWidth: 13,
      dy: dy_text + 13,
      dx: 70,
      fill: black_innosuisse,
      textAnchor: "start",
      frameAnchor: "top-left",
      lineAnchor: "top",
      fontSize: 14,
      lineHeight: 1.15,
      stroke: "white",
      strokeWidth: 1,
      strokeOpacity: 1,
      textAnchor: "start"
    }),
    // Create colored "pct1" and and "text1"
    Plot.text(df1, {
      text: (d) => (d.pct / 100).toLocaleString("fr-CH", { style: "percent" }),
      textAnchor: "start",
      frameAnchor: "top-left",
      lineAnchor: "top",
      dy: dy_text + 13,
      dx: 10,
      stroke: "white",
      strokeWidth: 2,
      strokeOpacity: 0.8,
      fill: "rank",
      fontSize: 26,
      fontWeight: "bold"
    }),
    // Plot.gridX({ interval: 10 }),
    // Plot.gridY({ interval: 10 }),

    ...(!df[0].opposites
      ? // Colored dots (fill of instrument)
        [
          Plot.waffleY(df, {
            y2: "pct",
            fill: "rank",
            rx: "100%",
            gap: 3
          })
        ]
      : // Colored dots (fill of instrument) -> pct1 is shown on top / pct2 on bottom
        [
          Plot.waffleY(df1, {
            y1: (d) => 100 - d.pct,
            y2: 100,
            rx: "100%",
            fill: "rank",
            gap: 2
          }),
          Plot.waffleY(df2, {
            y: "pct",
            rx: "100%",
            fill: "rank",
            gap: 2
          })
        ]),

    ...(df2.length !== 0
      ? [
          Plot.arrow([{ x1: x1, y1: y1, x2: 100, y2: y2 }], {
            x1: "x1",
            y1: "y1",
            x2: "x2",
            y2: "y2",
            bend: 15,
            headLength: 10
          }),
          // text2 is added
          Plot.text(df2, {
            // Dynamically select text2 column
            x: [100],
            y: y2,
            textAnchor: "start",
            lineAnchor: "top",
            dy: -5,
            lineWidth: 9.9,
            fill: black_innosuisse,
            text: text,
            dx: 8,
            fontSize: 14,
            lineHeight: 1.15
          })
        ]
      : [])
  ];

  return Plot.plot({
    axis: null,
    label: null,
    height: 255 - dy_text,
    marginTop: -dy_text,
    marginBottom: 15,
    marginLeft: 0,
    marginRight: y2 === null ? 0 : 140,
    width: y2 === null ? 240 : 380,
    color: instLegend(colors, color_scale),
    x: { domain: [0, 100] },
    y: { domain: [0, 100] },
    style: {fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    marks: marks
  });
}

function getLastDigit(number) {
  const numStr = number.toString(); // Convert number to string
  const lastDigit = parseInt(numStr.slice(-1), 10); // Get the last character and convert it back to a number
  return lastDigit === 0 ? 9.5 : lastDigit; // Return 9.5 if the last digit is 0, otherwise return the last digit
}

function instLegend(data, inst) {
  
  const df = data.filter((d) => d.inst === inst);
  const color1 = data.find((d) => d.inst === inst).shade;
  const color2 = data.find((d) => d.inst === inst).standard;

  return Plot.scale({
    color: {
      domain: ["pct2", "pct1", "background"],
      range: [color1, color2, "#F7F7F7"],
      type: "ordinal"
    }
  });
}

export function draw_results(
  instrument = "Start-up Core Coaching",
  relevance = true,
  marginLeft = 200
) {
  // Dynamically select the correct text columns based on the global language variable
  const type = `type_${language.value}`; // Column name for first text based on current language
  const label_lng = `label_${language.value}`; // Column name for second text based on current language
  const caption_lng = `caption_${language.value}`;
  const inst_shade = df_ergebnisse.find(
    (d) => d.instrument === instrument
  ).inst;

  const df = df_ergebnisse.filter((d) => d.instrument === instrument);

  const df_order = relevance
    ? df.sort((a, b) => b.relevance - a.relevance).map((item) => item[type])
    : df.sort((a, b) => b.pct - a.pct).map((item) => item[type]);

  const label = df.map((row) => row[label_lng])[0];

  const caption =
    df.map((row) => row[caption_lng])[0] === null
      ? ""
      : df.map((row) => row[caption_lng])[0];

  const marks = [
    Plot.barX(df, {
      x: "pct",
      y: type,
      fill: "inst",
      inset: 0.5
    }),
    Plot.barX(
      df.filter((d) => d.highlight === true),
      {
        x: "pct",
        y: type,
        fill: black_innosuisse,
        inset: 0.5,
        sort: { y: "-x" }
      }
    ),
    Plot.barX(df, {
      x1: "pct",
      x2: 100,
      y: type,
      fill: grey_background,
      inset: 0.5
    }),
    Plot.gridX({ stroke: "white", strokeOpacity: 1, interval: 25 }),
    Plot.textX(df, {
      x: "pct",
      y: type,
      text: (d) => `${d.pct} %`,
      dx: 5,
      sort: { y: "-x" },
      textAnchor: "start"
    }),

    ...(relevance
      ? [
          Plot.textX(df, {
            x: 100,
            y: type,
            text: (d) => (d.relevance < 100 ? `${d.relevance} %` : ""),
            fill: grey_comment,
            dx: 35,
            textAnchor: "end"
          }),
          Plot.textX(df, {
            x: 100,
            y: type,
            text: ["← Pertinence"],
            fill: grey_comment,
            dx: 50,
            dy: -5,
            rotate: -90,
            textAnchor: "end"
          })
        ]
      : [])
  ];

  return Plot.plot({
    marginTop: 45,
    marginLeft: marginLeft,
    marginRight: relevance ? 55 : 15,
    marginBottom: 10,
    color: color_inst,
    caption: html`<span style="font-size: 10px; color: #828282;">${caption}</span>`,
    style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    x: {
      axis: "top",
      labelAnchor: "left",
      domain: [0, 100],
      ticks: [0, 25, 50, 75, 100],
      label: label
    },
    y: {
      label: null,
      tickSize: 0,
      domain: df_order
    },
    marks: marks
  });
}

const df_leverage = [
    { x: 110, y: 100, color: "Förderung" },
    { x: 290, y: 100, color: "Wertschöpfung" },
    { x: 330, y: 100, color: "Wertschöpfung" },
    { x: 370, y: 100, color: "Wertschöpfung" },
    { x: 410, y: 100, color: "Wertschöpfung" }
  ];

export const leverage = Plot.plot({
    marginLeft: 0,
    marginRight: 0,
    style: {fontSize: "20px", fontFamily: "sans-serif", fontWeight: 700, color: black_innosuisse},
    axis: null,
    x: { domain: [50, 500] },
    y: { domain: [95, 108] },
    width: 640,
    height: 150,
    color: { legend: true },
    marks: [
      // Main circle
      Plot.dot(
        df_leverage.filter((d) => d.color === "Förderung"),
        { x: "x", y: "y", r: 25, fill: "#06F7DA" }
      ),
      Plot.dot(
        df_leverage.filter((d) => d.color === "Wertschöpfung"),
        { x: "x", y: "y", r: 25, fill: "#06F7DA", opacity: 0.5 }
      ),
      // Arrows from main circle to other circles
      Plot.arrow([{ x1: 150, y1: 100, x2: 250, y2: 100 }], {
        x1: "x1",
        y1: "y1",
        x2: "x2",
        y2: "y2",
        headLength: 10,
        strokeWidth: 1.5
      }),
      Plot.text(
        [
          { x: 110, y: 105, text: "1 franc\nd’encouragement" },
          { x: 350, y: 105, text: "4 francs\nde valeur ajoutée" }
        ],
        {
          x: "x",
          y: "y",
          text: "text",
          textAnchor: "middle",
          fill: "black"
        }
      )
    ]
  });

export const kof_did_plot = Plot.plot({
  marginLeft: 70,
  marginBottom: 45,
  marginRight: 160,
  marginTop: 45,
  x: {
    domain: ["t-12", "t-10", "t-8", "t-6", "t-4", "t-2", "t", "t+2", "t+4"],
    label: "Année relative à l'achèvement du projet d'innovation"
  },
  y: {
    domain: [-75, 75],
    ticks: [-75, -50, -25, 25, 50, 75],
    tickFormat: (d) => (d > 0 ? `+${d} %` : `${d} %`),
    percent: true,
    labelOffset: 15,
    label:
      "Différence entre les entreprises bénéficiant de l'encouragement d'Innosuisse et le groupe de contrôle en %"
  },
  fy: {
    label: null,
    domain: ["Ventes", "Emploi"],
    axis: "left",
    padding: 0.2
  },
  height: 600,
  width: 640,
  style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
  marks: [
    Plot.rectX([{ x1: "t-2", y1: -0.75, x2: "t", y2: 0.85 }], {
      x1: "x1",
      x2: "x2",
      y1: "y1",
      y2: "y2",
      fill: "lightblue",
      fillOpacity: 0.2
    }),
    Plot.ruleY([0], { stroke: grey_innosuisse, opacity: 0.5 }),
    Plot.ruleX(kof_did, {
      x: "year_text",
      y1: "lower_99",
      y2: "upper_99",
      fy: "type_de",
      stroke: (d) => (d.year >= 0 ? "#92c5de" : grey_innosuisse)
    }),
    Plot.ruleX(kof_did, {
      x: "year_text",
      y1: "lower_95",
      y2: "upper_95",
      fy: "type_de",
      stroke: (d) => (d.year >= 0 ? "#0571b0" : black_innosuisse)
    }),
    Plot.dot(kof_did, {
      x: "year_text",
      y: "ptest",
      fy: "type_de",
      symbol: "diamond2",
      r: 4,
      fill: (d) => (d.year >= 0 ? "#0571b0" : black_innosuisse)
    }),
    Plot.text(
      [
        {
          type_de: "Ventes",
          x: "t-6",
          y: 0.5,
          text: "Projet\nInnosuisse ⟶"
        },
        {
          type_de: "Ventes",
          x: "t",
          y: 0.26,
          text: "⌀ 21 %"
        },
        {
          type_de: "Emploi",
          x: "t",
          y: 0.23,
          text: "⌀ 18 %"
        }
      ],
      {
        x: "x",
        y: "y",
        fy: "type_de",
        dx: 5,
        text: "text",
        textAnchor: "start",
        fill: "#0571b0"
      }
    ),
    Plot.text(
      [
        {
          x: "t+4",
          y: 0.14,
          text: "↑ Les entreprises Innosuisse croissent plus fortement"
        },
        {
          x: "t+4",
          y: -0.15,
          text: "↓ Les entreprises du groupe de contrôle croissent plus fortement"
        }
      ],
      {
        x: "x",
        y: "y",
        dx: 15,
        lineWidth: 16,
        text: "text",
        textAnchor: "start",
        fill: black_innosuisse
      }
    ),
    Plot.line(
      [
        { type_de: "Ventes", year_text: "t", y: 0.21 },
        { type_de: "Ventes", year_text: "t+4", y: 0.21 },
        { type_de: "Emploi", year_text: "t", y: 0.18 },
        { type_de: "Emploi", year_text: "t+4", y: 0.18 }
      ],
      {
        x: "year_text",
        y: "y",
        fy: "type_de",
        stroke: "#0571b0",
        strokeWidth: 0.5,
        strokeDasharray: "4 0 0"
      }
    )
  ]
})

const df_toipis = [
    {
      type: "Chèque d'innovation",
      pct: 36,
      instrument: "Starthilfe für Projekte und Vernetzung"
    },
    {
      type: "Projets d'innovation",
      pct: 26,
      instrument: "Starthilfe für Projekte und Vernetzung"
    }
];

export const ib_toipis =  Plot.plot({
    marginTop: 45,
  marginLeft: 120,
  width: 330,
    color: color_inst,
    x: {
      axis: "top",
      labelAnchor: "left",
      domain: [0, 40],
      ticks: [],
      labelOffset: 35,
      label: "⌀ Nombre de demandes approuvées par an\nprovenant d'un Innovation Booster"
  },
  y: { label: null },
  style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
  marks: [
      Plot.barX(df_toipis, {
        x: "pct",
        y: "type",
        fill: "instrument",
        inset: 0.5,
        sort: { y: "-x" }
      }),
      Plot.barX(
        df_toipis.filter(
          (d) => d.type === "Innosuisse-Innovationsprojekt vorbereitet"
        ),
        {
          x: "pct",
          y: "type",
          fill: "black",
          fillOpacity: 0.5,
          inset: 0.5,
          sort: { y: "-x" }
        }
      ),
      Plot.gridX({ stroke: "white", strokeOpacity: 1, interval: 1 }),
      Plot.textX(df_toipis, {
        x: "pct",
        y: "type",
        text: "pct",
        dx: 5,
        sort: { y: "-x" },
        textAnchor: "start"
      })
    ]
})
  


export const su_vza = Plot.plot({
    marginTop: 45,
    marginBottom: 35,
    height: 120,
    marginLeft: 5,
    color: color_inst,
    style: {fontSize: "12px", fontFamily: "sans-serif", fontWeight: 200, color: black_innosuisse},
    x: {
      axis: "top",
      labelAnchor: "right",
      domain: [0, 30],
      ticks: [10.5, 26.4],
      tickFormat: d3.format(".1f"),
      label:
        "⌀ Nombre de personnes employées à plein temps à la fin du Core Coaching et trois ans plus tard"
    },
    y: { axis: null },
    marks: [
      Plot.barX(
        [
          {
            type: "Personnes employées à plein temps",
            pct: 26.4,
            instrument: "Begleitung von Start-ups"
          }
        ],
        {
          x: "pct",
          y: "type",
          fill: "instrument",
          inset: 0.5,
          sort: { y: "x" }
        }
      ),
      Plot.barX(
        [
          {
            type: "Personnes employées à plein temps",
            pct: 26.4,
            instrument: "Begleitung von Start-ups"
          }
        ],
        {
          x1: [10.5],
          x2: "pct",
          y: "type",
          fill: "black",
          fillOpacity: 0.5,
          inset: 0.5,
          sort: { y: "x" }
        }
      ),
      Plot.gridX({ stroke: "white", strokeOpacity: 1, interval: 1 }),
      Plot.textX(
        [
          {
            type: "Personnes employées à plein temps",
            pct: 10.5,
            text: "+11.7 personnes employées à plein temps",
            instrument: "Begleitung von Start-ups"
          }
        ],
        {
          x: "pct",
          y: "type",
          text: "text",
          fontSize: 20,
          fill: black_innosuisse,
          fontWeight: 700,
          dx: 5,
          dy: 40,
          sort: { y: "x" },
          textAnchor: "start"
        }
      )
    ]
  });