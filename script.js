const calculation = document.getElementById("calculation");
const inputs = document.getElementById("inputs");
const result = document.getElementById("result");

calculation.addEventListener("change", showInputs);

function showInputs() {

    let type = calculation.value;

    result.innerHTML = "";

    if (type === "ohm") {

        inputs.innerHTML = `
            <label>Voltage (V)</label>
            <input type="number" id="voltage" placeholder="Enter voltage">

            <label>Resistance (Ω)</label>
            <input type="number" id="resistance" placeholder="Enter resistance">
        `;

    }

    else if (type === "power") {

        inputs.innerHTML = `
            <label>Voltage (V)</label>
            <input type="number" id="voltage" placeholder="Enter voltage">

            <label>Current (A)</label>
            <input type="number" id="current" placeholder="Enter current">
        `;

    }

    else if (type === "series") {

        inputs.innerHTML = `
            <label>Voltage (V)</label>
            <input type="number" id="voltage" placeholder="Enter supply voltage">

            <label>R1 (Ω)</label>
            <input type="number" id="r1">

            <label>R2 (Ω)</label>
            <input type="number" id="r2">

            <label>R3 (Ω)</label>
            <input type="number" id="r3">
        `;

    }

    else if (type === "parallel") {

        inputs.innerHTML = `
            <label>Voltage (V)</label>
            <input type="number" id="voltage">

            <label>R1 (Ω)</label>
            <input type="number" id="r1">

            <label>R2 (Ω)</label>
            <input type="number" id="r2">

            <label>R3 (Ω)</label>
            <input type="number" id="r3">
        `;

    }

    else if (type === "kcl") {

        inputs.innerHTML = `
            <label>Incoming Current I1 (A)</label>
            <input type="number" id="i1">

            <label>Incoming Current I2 (A)</label>
            <input type="number" id="i2">

            <label>Outgoing Current I3 (A)</label>
            <input type="number" id="i3">
        `;

    }

    else if (type === "kvl") {

        inputs.innerHTML = `
            <label>Supply Voltage (V)</label>
            <input type="number" id="vs">

            <label>Voltage Drop V1 (V)</label>
            <input type="number" id="v1">

            <label>Voltage Drop V2 (V)</label>
            <input type="number" id="v2">
        `;

    }

    else if (type === "open") {

        inputs.innerHTML = `
            <p>Open circuit has a broken/disconnected path.</p>
        `;

    }

    else if (type === "short") {

        inputs.innerHTML = `
            <label>Supply Voltage (V)</label>
            <input type="number" id="voltage">

            <label>Circuit Resistance (Ω)</label>
            <input type="number" id="resistance">
        `;

    }

    else if (type === "rc") {

        inputs.innerHTML = `
            <label>Resistance (Ω)</label>
            <input type="number" id="resistance">

            <label>Capacitance (F)</label>
            <input type="number" id="capacitance">
        `;

    }

    else if (type === "rlc") {

        inputs.innerHTML = `
            <label>Resistance R (Ω)</label>
            <input type="number" id="resistance">

            <label>Inductance L (H)</label>
            <input type="number" id="inductance">

            <label>Capacitance C (F)</label>
            <input type="number" id="capacitance">

            <label>Frequency (Hz)</label>
            <input type="number" id="frequency">

            <label>Supply Voltage (V)</label>
            <input type="number" id="voltage">
        `;
    }
}


// Initial screen
showInputs();


function getValue(id) {
    return parseFloat(document.getElementById(id).value);
}


function calculate() {

    let type = calculation.value;

    try {

        // OHM'S LAW
        if (type === "ohm") {

            let V = getValue("voltage");
            let R = getValue("resistance");

            if (R === 0) {
                result.innerHTML = `<span class="error">
                Resistance cannot be zero.
                </span>`;
                return;
            }

            let I = V / R;

            result.innerHTML = `
                <b>Ohm's Law</b><br>
                Formula: I = V / R<br><br>
                Voltage = ${V} V<br>
                Resistance = ${R} Ω<br>
                <b>Current = ${I.toFixed(3)} A</b>
            `;
        }


        // POWER
        else if (type === "power") {

            let V = getValue("voltage");
            let I = getValue("current");

            let P = V * I;

            result.innerHTML = `
                <b>Power Calculation</b><br>
                Formula: P = V × I<br><br>
                Voltage = ${V} V<br>
                Current = ${I} A<br>
                <b>Power = ${P.toFixed(3)} W</b>
            `;
        }


        // SERIES
        else if (type === "series") {

            let V = getValue("voltage");
            let R1 = getValue("r1");
            let R2 = getValue("r2");
            let R3 = getValue("r3");

            let Rt = R1 + R2 + R3;
            let I = V / Rt;

            result.innerHTML = `
                <b>Series Circuit</b><br>
                Rtotal = R1 + R2 + R3<br><br>

                Total Resistance = <b>${Rt.toFixed(3)} Ω</b><br>
                Circuit Current = <b>${I.toFixed(3)} A</b>
            `;
        }


        // PARALLEL
        else if (type === "parallel") {

            let V = getValue("voltage");
            let R1 = getValue("r1");
            let R2 = getValue("r2");
            let R3 = getValue("r3");

            let Rt = 1 / ((1/R1) + (1/R2) + (1/R3));

            let I = V / Rt;

            result.innerHTML = `
                <b>Parallel Circuit</b><br>
                Formula: 1/Rt = 1/R1 + 1/R2 + 1/R3<br><br>

                Total Resistance = <b>${Rt.toFixed(3)} Ω</b><br>
                Total Current = <b>${I.toFixed(3)} A</b>
            `;
        }


        // KCL
        else if (type === "kcl") {

            let I1 = getValue("i1");
            let I2 = getValue("i2");
            let I3 = getValue("i3");

            let incoming = I1 + I2;

            let difference = incoming - I3;

            result.innerHTML = `
                <b>KCL Calculator</b><br>
                Incoming Current = ${incoming.toFixed(3)} A<br>
                Outgoing Current = ${I3.toFixed(3)} A<br><br>

                KCL Difference = ${difference.toFixed(3)} A<br>

                <b>
                ${Math.abs(difference) < 0.001
                ? "KCL is satisfied ✓"
                : "KCL is NOT satisfied ✗"}
                </b>
            `;
        }


        // KVL
        else if (type === "kvl") {

            let Vs = getValue("vs");
            let V1 = getValue("v1");
            let V2 = getValue("v2");

            let totalDrop = V1 + V2;
            let error = Vs - totalDrop;

            result.innerHTML = `
                <b>KVL Calculator</b><br>
                Supply Voltage = ${Vs} V<br>
                Total Voltage Drop = ${totalDrop} V<br><br>

                KVL Result = ${error.toFixed(3)} V<br>

                <b>
                ${Math.abs(error) < 0.001
                ? "KVL is satisfied ✓"
                : "KVL is NOT satisfied ✗"}
                </b>
            `;
        }


        // OPEN CIRCUIT
        else if (type === "open") {

            result.innerHTML = `
                <b>Open Circuit</b><br><br>

                Resistance ≈ ∞ Ω<br>
                Current = 0 A<br>
                Circuit Path = Open<br><br>

                <b>No current flows through an ideal open circuit.</b>
            `;
        }


        // SHORT CIRCUIT
        else if (type === "short") {

            let V = getValue("voltage");
            let R = getValue("resistance");

            if (R === 0) {

                result.innerHTML = `
                    <b>Short Circuit</b><br><br>
                    Resistance = 0 Ω<br>
                    Voltage across ideal short = 0 V<br><br>

                    <b>Ideal short-circuit current is theoretically
                    unlimited.</b><br>
                    In a real circuit, current is limited by source
                    and circuit resistance.
                `;

            } else {

                let I = V / R;

                result.innerHTML = `
                    <b>Short-Circuit Current Estimate</b><br>
                    I = V / R<br><br>

                    Current = <b>${I.toFixed(3)} A</b>
                `;
            }
        }


        // RC CIRCUIT
        else if (type === "rc") {

            let R = getValue("resistance");
            let C = getValue("capacitance");

            let tau = R * C;

            result.innerHTML = `
                <b>RC Circuit</b><br><br>

                Time Constant:<br>
                τ = R × C<br><br>

                R = ${R} Ω<br>
                C = ${C} F<br><br>

                <b>Time Constant = ${tau.toFixed(6)} seconds</b>
            `;
        }


        // RLC CIRCUIT
        else if (type === "rlc") {

            let R = getValue("resistance");
            let L = getValue("inductance");
            let C = getValue("capacitance");
            let f = getValue("frequency");
            let V = getValue("voltage");

            let XL = 2 * Math.PI * f * L;

            let XC = 1 / (2 * Math.PI * f * C);

            let Z = Math.sqrt(
                Math.pow(R, 2) +
                Math.pow(XL - XC, 2)
            );

            let I = V / Z;

            result.innerHTML = `
                <b>RLC Circuit</b><br><br>

                Inductive Reactance:<br>
                XL = ${XL.toFixed(3)} Ω<br><br>

                Capacitive Reactance:<br>
                XC = ${XC.toFixed(3)} Ω<br><br>

                Impedance:<br>
                Z = ${Z.toFixed(3)} Ω<br><br>

                Circuit Current:<br>
                <b>I = ${I.toFixed(3)} A</b>
            `;
        }

    } catch (error) {

        result.innerHTML = `
            <span class="error">
            Please enter valid values in all fields.
            </span>
        `;
    }
}


function clearCalculator() {

    showInputs();

    result.innerHTML = "";

    const fields = inputs.querySelectorAll("input");

    fields.forEach(field => {
        field.value = "";
    });
}