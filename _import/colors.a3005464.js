// Colors
import * as Plot from "../_npm/@observablehq/plot@0.6.16/239523e7.js";
import * as d3 from "../_npm/d3@7.9.0/7055d4c5.js";
import { instrument_link_hex } from "./data.92db0e7e.js"

// Farbskala Förderangebote der Innosuisse
export const color_inst = Plot.scale({
  color: {
    type: "categorical",
    domain: [
      "Förderung für Schweizer Innovationsprojekte",
      "Förderung für internationale Innovationsprojekte",
      "Starthilfe für Projekte und Vernetzung",
      "Begleitung von Start-ups"
    ],
    range: ["#06F7DA", "#A2AFE9", "#FCE300", "#FF8674"]
  }
})

export const color_instrument = Plot.scale({
  color: {
    type: "categorical",
    domain: instrument_link_hex.map(item => item.instrument),
    range: instrument_link_hex.map(item => item.hex)
  }
})

// Farbskala der thematischen Subcluster
export const color_subcluster = Plot.scale({
  color: {
    type: "categorical",
    domain: [
      "Engineering",
      "ICT",
      "Life sciences",
      "Social sciences & business mgmt",
      "Energy & environment"
    ],
    range: d3.quantize(d3.interpolateHcl("#FEB040", "#FFE7C5"), 5),
    interpolate: "hsl",
    legend: true
  }
})

// Start-up Core Coaching für zeitliche Unterschiede
export const color_su = Plot.scale({
  color: {
    type: "categorical",
    domain: ["Nach Abschluss", "3 Jahre nach Abschluss"],
    range: ["#FF8674", "#7B3433"]
  }
})

// Divergierende Farbskalen für Positiv/Negativ-Werte
export const color_zufrieden = Plot.scale({
  color: {
    domain: [
      "zufrieden bis sehr zufrieden",
      "eher nicht bis eher zufrieden",
      "überhaupt nicht zufrieden bis nicht zufrieden"
    ],
    range: ["#65CDDF", "#e8e8e8", "#FEB040"],
    type: "ordinal"
  }
})

export const color_ziel = Plot.scale({
  color: {
    domain: [
      "vollständig erreicht oder übertroffen",
      "eher erreicht",
      "eher nicht erreicht",
      "nicht oder nur in geringem Ausmass erreicht"
    ],
    range: ["#65CDDF", "#B1E5EF", "#FED79F", "#FEB040"],
    type: "ordinal"
  }
})

export const color_erfolg = Plot.scale({
  color: {
    domain: [
      "hoher oder sehr hoher Erfolg",
      "eher hoher Erfolg",
      "eher geringer Erfolg",
      "kein Erfolg oder geringer Erfolg"
    ],
    range: ["#65CDDF", "#B1E5EF", "#FED79F", "#FEB040"],
    type: "ordinal"
  }
})

// Grautöne
export const black_innosuisse = "#53565A"
export const grey_innosuisse = "#D9D9D6"
export const grey_comment = "#828282"
export const grey_background = "#E8E8E8"


// Farbschema Waffle-Plot
  // Dunkel
export const colors_dark = [
  { inst: "Begleitung von Start-ups", standard: "#FF8674", shade: "#7B3433" },
  {
    inst: "Förderung für internationale Innovationsprojekte",
    standard: "#A2AFE9",
    shade: "#5C647C"
  },
  {
    inst: "Förderung für Schweizer Innovationsprojekte",
    standard: "#06F7DA",
    shade: "#007C67"
  },
  {
    inst: "Starthilfe für Projekte und Vernetzung",
    standard: "#FCE300",
    shade: "#867200"
  },
  { inst: "negative", standard: "#FED79F", shade: "#FEB040" },
  { inst: "negative_opposite", standard: "#65CDDF", shade: "#FEB040" }
]
  // Hell
export const colors_light = [
  {
    inst: "Förderung für Schweizer Innovationsprojekte",
    standard: "#AAF9E8",
    shade: "#06F7DA"
  },
  {
    inst: "Förderung für internationale Innovationsprojekte",
    standard: "#CDD2F0",
    shade: "#A2AFE9"
  },
  {
    inst: "Starthilfe für Projekte und Vernetzung",
    standard: "#FFED96",
    shade: "#FCE300"
  },
  {
    inst: "Begleitung von Start-ups",
    standard: "#FFC0B4",
    shade: "#FF8674"
  },
  { inst: "negative", standard: "#FECC82", shade: "#FC8B00" },
  { inst: "negative_opposite", standard: "#0571b0", shade: "#FC8B00" }
]