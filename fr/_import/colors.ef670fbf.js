// Colors
import * as Plot from "../_npm/@observablehq/plot@0.6.16/239523e7.js";
import * as d3 from "../_npm/d3@7.9.0/7055d4c5.js";
import { instrument_link_hex } from "./data.fcd42f81.js"

export const language = {value: "fr", label: "Français"}

// --- Consolidated Color Scale Creation Function ---

/**
 * Creates a specific Plot color scale configuration based on the provided key.
 *
 * @param {'inst' | 'instrument' | 'subcluster' | 'su' | 'zufrieden' | 'ziel' | 'erfolg'} scaleKey - The identifier for the desired scale:
 *   - 'inst': Funding offers (Förderangebote)
 *   - 'instrument': Specific instruments (from data.js)
 *   - 'subcluster': Thematic subclusters
 *   - 'su': Startup cohort comparison (Nach Abschluss vs 3 Jahre)
 *   - 'zufrieden': Satisfaction levels (diverging)
 *   - 'ziel': Goal achievement levels (diverging)
 *   - 'erfolg': Success levels (diverging)
 * @returns {object | null} A Plot scale configuration object (suitable for Plot's `color` option),
 *                          or null if the scaleKey is invalid or data is missing (for 'instrument').
 */
export function createColorScale(scaleKey) {
  switch (scaleKey) {
    // Original: color_inst
    case 'inst':
      return Plot.scale({
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
      });

      case 'inst_lng':
        return Plot.scale({
          color: {
            type: "categorical",
            domain: language.value === "en" ? [
              "Funding for national projects",
              "Funding for international projects",
              "Project set-up assistance and networking",
              "Support for start-ups"
            ] : language.value === "fr" ? [
              "Encouragement de projets nationaux",
              "Encouragement de projets internationaux",
              "Aide au démarrage de projets et mise en réseau",
              "Accompagnement de start-up"
            ] : [
              "Förderung für Schweizer Innovationsprojekte",
              "Förderung für internationale Innovationsprojekte",
              "Starthilfe für Projekte und Vernetzung",
              "Begleitung von Start-ups"
            ] ,
            range: ["#06F7DA", "#A2AFE9", "#FCE300", "#FF8674"]
          }
        });
    
    // Original: color_instrument
    case 'instrument':
      // Ensure data is loaded before calling this, or handle potential errors if needed.
      if (!instrument_link_hex || instrument_link_hex.length === 0) {
         console.warn("Instrument data (instrument_link_hex) is empty or not loaded. Scale for 'instrument' may be invalid.");
         // Return a default empty scale or null based on desired error handling
         return Plot.scale({ color: { type: "categorical", domain: [], range: [] } });
         // Or: return null;
      }
      return Plot.scale({
        color: {
          type: "categorical",
          domain: instrument_link_hex.map(item => item.instrument),
          range: instrument_link_hex.map(item => item.hex)
        }
      });

    // Original: color_subcluster
    case 'subcluster':
      return Plot.scale({
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
      });

    // Original: color_su
    case 'su':
      return Plot.scale({
        color: {
          type: "categorical",
          domain: ["Après la fin du projet", "Trois ans après la fin du projet"],
          range: ["#FF8674", "#7B3433"]
        }
      });

    // Original: color_zufrieden
    case 'zufrieden':
      return Plot.scale({
        color: {
          domain:
            language.value === "en" ?
            ["satisfied to very satisfied","rather not satisfied to rather satisfied","not at all satisfied to not satisfied"] :
              language.value === "fr" ?
                ["satisfait à très satisfait", "plutôt pas satisfait à plutôt satisfait", "pas du tout satisfait à pas satisfait"] :
                ["zufrieden bis sehr zufrieden", "eher nicht bis eher zufrieden", "überhaupt nicht zufrieden bis nicht zufrieden"]
              ,
          range: ["#65CDDF", "#e8e8e8", "#FEB040"],
          type: "ordinal"
        }
      });

    // Original: color_ziel
    case 'ziel':
      return Plot.scale({
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
      });

    // Original: color_erfolg
    case 'erfolg':
      return Plot.scale({
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
      });

    default:
      console.error(`Unknown scale key requested: "${scaleKey}". Valid keys are: 'inst', 'instrument', 'subcluster', 'su', 'zufrieden', 'ziel', 'erfolg'.`);
      return null; // Return null for invalid keys
  }
}


// --- Other Color Utility Functions (Unchanged from previous refactoring) ---

/**
 * Provides standard Innosuisse brand colors and greys.
 * Consolidates: black_innosuisse, grey_innosuisse, grey_comment, grey_background
 * @returns {object} An object containing brand color hex strings.
 */
export function getBrandColors() {
  // Return a copy to prevent modification
  return {
    blackInnosuisse: "#53565A",
    greyInnosuisse: "#D9D9D6",
    greyComment: "#828282",
    greyBackground: "#E8E8E8"
  };
}

/**
 * Provides color sets (standard and shade) for waffle plots.
 * Consolidates: colors_dark, colors_light
 * @param {'dark' | 'light'} theme - The desired color theme ('dark' or 'light'). Defaults to 'dark'.
 * @returns {Array<object>} An array of objects, each with 'inst', 'standard', and 'shade' properties. Returns an empty array if theme is invalid.
 */
export function getWaffleColorSet(theme = 'dark') {
  const sets = {
    dark: [
      { inst: "Begleitung von Start-ups", standard: "#FF8674", shade: "#7B3433" },
      { inst: "Förderung für internationale Innovationsprojekte", standard: "#A2AFE9", shade: "#5C647C" },
      { inst: "Förderung für Schweizer Innovationsprojekte", standard: "#06F7DA", shade: "#007C67" },
      { inst: "Starthilfe für Projekte und Vernetzung", standard: "#FCE300", shade: "#867200" },
      { inst: "negative", standard: "#FED79F", shade: "#FEB040" },
      { inst: "negative_opposite", standard: "#65CDDF", shade: "#FEB040" }
    ],
    light: [
      { inst: "Förderung für Schweizer Innovationsprojekte", standard: "#AAF9E8", shade: "#06F7DA" },
      { inst: "Förderung für internationale Innovationsprojekte", standard: "#CDD2F0", shade: "#A2AFE9" },
      { inst: "Starthilfe für Projekte und Vernetzung", standard: "#FFED96", shade: "#FCE300" },
      { inst: "Begleitung von Start-ups", standard: "#FFC0B4", shade: "#FF8674" },
      { inst: "negative", standard: "#FECC82", shade: "#FC8B00" },
      { inst: "negative_opposite", standard: "#0571b0", shade: "#FC8B00" }
    ]
  };

  const selectedSet = sets[theme];

  if (!selectedSet) {
    console.warn(`Invalid waffle theme provided: "${theme}". Valid themes are 'dark' or 'light'. Returning empty array.`);
    return [];
  }

  // Return a copy of the array and its objects to ensure immutability
  return selectedSet.map(item => ({ ...item }));
}