async function getIP() {
    try {
        let response = await fetch("https://api64.ipify.org?format=json");
        let data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return "Unavailable";
    }
}

async function generateQR() {
    let subject = document.getElementById("subject").value;
    let ownerIP = await getIP();
    let qrText = `http://localhost:3000/display?owner_ip=${encodeURIComponent(ownerIP)}&subject=${encodeURIComponent(subject)}`;

    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), qrText);
}

async function verifyConnection() {
    const urlParams = new URLSearchParams(window.location.search);
    const ownerIP = urlParams.get("owner_ip");
    const subject = urlParams.get("subject");
    const currentIP = await getIP();

    if (currentIP === ownerIP) {
        document.getElementById("message").innerHTML = `Connected Successfully! <br> Device IP: ${currentIP} <br> Subject: ${subject}`;
    } else {
        document.getElementById("message").innerHTML = "Error: Devices are not connected to the same network.";
    }
}

// ✅ Run verification only on display.html
if (window.location.pathname.includes("display")) {
    verifyConnection();
}
