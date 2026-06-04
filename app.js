// =========================
// ELEMENTS
// =========================

const templateSelect = document.getElementById("templateSelect");
const recipientName = document.getElementById("recipientName");
const reason = document.getElementById("reason");
const groupColor = document.getElementById("groupColor");
const photoInput = document.getElementById("photoInput");

const certificate = document.getElementById("certificate");

const photoPreview = document.getElementById("photoPreview");
const namePreview = document.getElementById("namePreview");
const reasonPreview = document.getElementById("reasonPreview");
const groupPreview = document.getElementById("groupPreview");

// =========================
// TEXT EDITOR
// =========================

const textTarget = document.getElementById("textTarget");

const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");

const textColor = document.getElementById("textColor");
const shadowColor = document.getElementById("shadowColor");

const boldText = document.getElementById("boldText");
const italicText = document.getElementById("italicText");

const textX = document.getElementById("textX");
const textY = document.getElementById("textY");

// =========================
// PHOTO EDITOR
// =========================

const photoSize = document.getElementById("photoSize");
const photoX = document.getElementById("photoX");
const photoY = document.getElementById("photoY");

// =========================
// DOWNLOAD
// =========================

const downloadPNG = document.getElementById("downloadPNG");
const printBtn = document.getElementById("printBtn");

// =========================
// TEMPLATE
// =========================

templateSelect.addEventListener("change", () => {

    certificate.style.backgroundImage =
        `url("${templateSelect.value}")`;

});

// =========================
// LIVE TEXT
// =========================

recipientName.addEventListener("input", () => {

    namePreview.textContent =
        recipientName.value || "ឈ្មោះអ្នកទទួល";

});

reason.addEventListener("input", () => {

    reasonPreview.textContent =
        reason.value || "មូលហេតុទទួលវិញ្ញាបនបត្រ";

});

groupColor.addEventListener("input", () => {

    groupPreview.textContent =
        groupColor.value || "ក្រុម";

});

// =========================
// PHOTO UPLOAD
// =========================

photoInput.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = ev => {

        photoPreview.src = ev.target.result;

    };

    reader.readAsDataURL(file);

});

// =========================
// GET SELECTED TEXT
// =========================

function getSelectedTextElement() {

    const target = textTarget.value;

    if (target === "name")
        return namePreview;

    if (target === "reason")
        return reasonPreview;

    return groupPreview;

}

// =========================
// FONT FAMILY
// =========================

fontFamily.addEventListener("change", () => {

    getSelectedTextElement().style.fontFamily =
        fontFamily.value;

});

// =========================
// FONT SIZE
// =========================

fontSize.addEventListener("input", () => {

    getSelectedTextElement().style.fontSize =
        fontSize.value + "px";

});

// =========================
// TEXT COLOR
// =========================

textColor.addEventListener("input", () => {

    getSelectedTextElement().style.color =
        textColor.value;

});

// =========================
// SHADOW
// =========================

shadowColor.addEventListener("input", () => {

    getSelectedTextElement().style.textShadow =
        `0 0 10px ${shadowColor.value}`;

});

// =========================
// BOLD
// =========================

boldText.addEventListener("change", () => {

    getSelectedTextElement().style.fontWeight =
        boldText.checked ? "700" : "400";

});

// =========================
// ITALIC
// =========================

italicText.addEventListener("change", () => {

    getSelectedTextElement().style.fontStyle =
        italicText.checked ? "italic" : "normal";

});

// =========================
// TEXT POSITION
// =========================

textX.addEventListener("input", () => {

    const el = getSelectedTextElement();

    el.style.left = textX.value + "px";

});

textY.addEventListener("input", () => {

    const el = getSelectedTextElement();

    el.style.top = textY.value + "px";

});

// =========================
// PHOTO SIZE
// =========================

photoSize.addEventListener("input", () => {

    photoPreview.style.width =
        photoSize.value + "px";

    photoPreview.style.height =
        photoSize.value * 1.3 + "px";

});

// =========================
// PHOTO POSITION
// =========================

photoX.addEventListener("input", () => {

    photoPreview.style.left =
        photoX.value + "px";

});

photoY.addEventListener("input", () => {

    photoPreview.style.top =
        photoY.value + "px";

});

// =========================
// DRAG PHOTO
// =========================

let draggingPhoto = false;

photoPreview.addEventListener("mousedown", () => {

    draggingPhoto = true;

});

document.addEventListener("mouseup", () => {

    draggingPhoto = false;

});

document.addEventListener("mousemove", e => {

    if (!draggingPhoto) return;

    const rect =
        certificate.getBoundingClientRect();

    const x =
        e.clientX - rect.left;

    const y =
        e.clientY - rect.top;

    photoPreview.style.left =
        x + "px";

    photoPreview.style.top =
        y + "px";

});

// =========================
// DRAG TEXT
// =========================

let activeText = null;

[namePreview, reasonPreview, groupPreview]
.forEach(el => {

    el.addEventListener("mousedown", () => {

        activeText = el;

    });

});

document.addEventListener("mouseup", () => {

    activeText = null;

});

document.addEventListener("mousemove", e => {

    if (!activeText) return;

    const rect =
        certificate.getBoundingClientRect();

    const x =
        e.clientX - rect.left;

    const y =
        e.clientY - rect.top;

    activeText.style.left =
        x + "px";

    activeText.style.top =
        y + "px";

});

// =========================
// DOWNLOAD PNG
// =========================

downloadPNG.addEventListener("click", async () => {

    const canvas =
        await html2canvas(certificate, {
            scale: 3
        });

    const link =
        document.createElement("a");

    link.download =
        "certificate.png";

    link.href =
        canvas.toDataURL("image/png");

    link.click();

});

// =========================
// PRINT
// =========================

printBtn.addEventListener("click", () => {

    window.print();

});

// =========================
// DEFAULT TEMPLATE
// =========================

certificate.style.backgroundImage =
    `url("${templateSelect.value}")`;
