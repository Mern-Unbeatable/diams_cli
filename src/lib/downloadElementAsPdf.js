const A4_MM = { width: 210, height: 297 };

const loadImage = (src) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });

const measureHeight = (node, width) => {
  node.style.width = `${width}px`;
  return node.getBoundingClientRect().height;
};

/** Smallest width (largest text) whose height/width ratio still fits the page. */
const findWidthForRatio = (node, targetRatio, minWidth, maxWidth) => {
  if (measureHeight(node, maxWidth) / maxWidth > targetRatio) return maxWidth;

  let low = minWidth;
  let high = maxWidth;
  for (let i = 0; i < 12; i += 1) {
    const mid = (low + high) / 2;
    if (measureHeight(node, mid) / mid > targetRatio) low = mid;
    else high = mid;
  }
  return Math.ceil(high);
};

/**
 * Renders a DOM element to a single A4 PDF page and triggers a download.
 * Works on an off-screen copy whose width is tuned so the content fills the page,
 * independent of the current screen size.
 */
export const downloadElementAsPdf = async (
  element,
  fileName = "document.pdf",
  { marginMm = 6, minWidth = 760, maxWidth = 1200 } = {},
) => {
  if (!element) throw new Error("Nothing to export");

  const [{ toJpeg }, { jsPDF }] = await Promise.all([
    import("html-to-image"),
    import("jspdf"),
  ]);

  const contentWidthMm = A4_MM.width - marginMm * 2;
  const contentHeightMm = A4_MM.height - marginMm * 2;
  const pageRatio = contentHeightMm / contentWidthMm;

  const host = document.createElement("div");
  host.style.cssText =
    "position:fixed;top:0;left:-100000px;pointer-events:none;background:#fff;";
  const clone = element.cloneNode(true);
  const computed = getComputedStyle(element);
  clone.style.color = computed.color;
  clone.style.fontFamily = computed.fontFamily;
  clone.style.margin = "0";
  clone.style.border = "none";
  clone.style.borderRadius = "0";
  clone.style.boxShadow = "none";
  host.appendChild(clone);
  document.body.appendChild(host);

  try {
    if (document.fonts?.ready) await document.fonts.ready;

    const width = findWidthForRatio(clone, pageRatio, minWidth, maxWidth);
    const height = Math.ceil(measureHeight(clone, width));

    const dataUrl = await toJpeg(clone, {
      width,
      height,
      quality: 0.95,
      pixelRatio: 2.5,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });
    const img = await loadImage(dataUrl);

    const imgHeightMm = (img.height * contentWidthMm) / img.width;
    const scale = Math.min(1, contentHeightMm / imgHeightMm);
    const drawWidth = contentWidthMm * scale;
    const drawHeight = imgHeightMm * scale;

    const pdf = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
    pdf.addImage(
      dataUrl,
      "JPEG",
      (A4_MM.width - drawWidth) / 2,
      marginMm,
      drawWidth,
      drawHeight,
    );
    pdf.save(fileName.endsWith(".pdf") ? fileName : `${fileName}.pdf`);
  } finally {
    host.remove();
  }
};
