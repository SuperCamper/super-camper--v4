```javascript
// =========================
// ELEMENTS
// =========================

const certificate = document.getElementById("certificate");

const templateSelect = document.getElementById("templateSelect");

const recipientName = document.getElementById("recipientName");
const reason = document.getElementById("reason");
const groupColor = document.getElementById("groupColor");

const photoInput = document.getElementById("photoInput");

const namePreview = document.getElementById("namePreview");
const reasonPreview = document.getElementById("reasonPreview");
const groupPreview = document.getElementById("groupPreview");
const photoPreview = document.getElementById("photoPreview");

// =========================
// TEXT EDITOR
// =========================

const targetText = document.getElementById("targetText");

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
const photoRadius = document.getElementById("photoRadius");

// =========================
// EXPORT
// =========================

const downloadPNG = document.getElementById("downloadPNG");
const downloadPDF = document.getElementById("downloadPDF");
const printBtn = document.getElementById("printBtn");

// =========================
// DEFAULT TEMPLATE
// =========================

certificate.style.backgroundImage =
    `url("${templateSelect.value}")`;

// =========================
// CHANGE TEMPLATE
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
// SELECT TEXT
// =========================

function selectedElement() {

    switch (targetText.value) {

        case "name":
            return namePreview;

        case "reason":
            return reasonPreview;

        case "group":
            return groupPreview;

        default:
            return namePreview;
    }
}

// =========================
// FONT FAMILY
// =========================

fontFamily.addEventListener("change", () => {

    selectedElement().style.fontFamily =
        fontFamily.value;

});

// =========================
// FONT SIZE
// =========================

fontSize.addEventListener("input", () => {

    selectedElement().style.fontSize =
        fontSize.value + "px";

});

// =========================
// TEXT COLOR
// =========================

textColor.addEventListener("input", () => {

    selectedElement().style.color =
        textColor.value;

});

// =========================
// SHADOW COLOR
// =========================

shadowColor.addEventListener("input", () => {

    selectedElement().style.textShadow =
        `0 3px 8px ${shadowColor.value}`;

});

// =========================
// BOLD
// =========================

boldText.addEventListener("change", () => {

    selectedElement().style.fontWeight =
        boldText.checked ? "700" : "400";

});

// =========================
// ITALIC
// =========================

italicText.addEventListener("change", () => {

    selectedElement().style.fontStyle =
        italicText.checked ? "italic" : "normal";

});

// =========================
// TEXT POSITION
// =========================

textX.addEventListener("input", () => {

    selectedElement().style.left =
        textX.value + "px";

});

textY.addEventListener("input", () => {

    selectedElement().style.top =
        textY.value + "px";

});

// =========================
// PHOTO SIZE
// =========================

photoSize.addEventListener("input", () => {

    const width = parseInt(photoSize.value);

    photoPreview.style.width =
        width + "px";

    photoPreview.style.height =
        Math.round(width * 1.33) + "px";

});

// =========================
// PHOTO X
// =========================

photoX.addEventListener("input", () => {

    photoPreview.style.left =
        photoX.value + "px";

});

// =========================
// PHOTO Y
// =========================

photoY.addEventListener("input", () => {

    photoPreview.style.top =
        photoY.value + "px";

});

// =========================
// PHOTO RADIUS
// =========================

photoRadius.addEventListener("input", () => {

    photoPreview.style.borderRadius =
        photoRadius.value + "px";

});

// =========================
// DRAG SYSTEM
// =========================

function makeDraggable(el){

    let isDragging = false;

    let offsetX = 0;
    let offsetY = 0;

    el.addEventListener("mousedown", e => {

        isDragging = true;

        const rect = el.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

    });

    document.addEventListener("mousemove", e => {

        if(!isDragging) return;

        const parentRect =
            certificate.getBoundingClientRect();

        const x =
            e.clientX -
            parentRect.left -
            offsetX;

        const y =
            e.clientY -
            parentRect.top -
            offsetY;

        el.style.left = x + "px";
        el.style.top = y + "px";

        el.style.transform = "none";

    });

    document.addEventListener("mouseup", () => {

        isDragging = false;

    });
}

makeDraggable(photoPreview);
makeDraggable(namePreview);
makeDraggable(reasonPreview);
makeDraggable(groupPreview);

// =========================
// DOWNLOAD PNG
// =========================

downloadPNG.addEventListener("click", async () => {

    const canvas =
        await html2canvas(certificate,{
            scale:3
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
// DOWNLOAD PDF
// =========================

downloadPDF.addEventListener("click", async () => {

    const canvas =
        await html2canvas(certificate,{
            scale:3
        });

    const imgData =
        canvas.toDataURL("image/png");

    const { jsPDF } =
        window.jspdf;

    const pdf =
        new jsPDF("p","mm","a4");

    pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        210,
        297
    );

    pdf.save("certificate.pdf");

});

// =========================
// PRINT
// =========================

printBtn.addEventListener("click", () => {

    window.print();

});
```
