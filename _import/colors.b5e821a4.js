// Colors
import * as Plot from "../_npm/@observablehq/plot@0.6.16/239523e7.js";
import * as d3 from "../_npm/d3@7.9.0/7055d4c5.js";


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
    range: d3.quantize(d3.interpolateHcl("#53565A", "#D9D9D6"), 5),
    interpolate: "hsl",
    legend: true
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
    range: ["#0571b0", "#92c5de", "#f7f7f7", "#fc9272"],
    type: "ordinal"
    // reverse: true // Add this to reverse the color scheme to match the reversed domain
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
    range: ["#0571b0", "#92c5de", "#f7f7f7", "#fc9272"],
    type: "ordinal"
    // reverse: true // Add this to reverse the color scheme to match the reversed domain
  }
})

export const color_zufrieden = Plot.scale({
  color: {
    domain: [
      "zufrieden bis sehr zufrieden",
      "eher nicht bis eher zufrieden",
      "überhaupt nicht zufrieden bis nicht zufrieden"
    ],
    range: ["#0571b0", "#f7f7f7", "#fc9272"],
    type: "ordinal"
    // reverse: true // Add this to reverse the color scheme to match the reversed domain
  }
})

export const black_innosuisse = "#53565A"

export const grey_innosuisse = "#D9D9D6"