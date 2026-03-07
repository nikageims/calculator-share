const display = document.getElementById('display');

// ეკრანზე სიმბოლოს დამატება
function appendToDisplay(input) {
    if (display.value === "0" || display.value === "Error") {
        display.value = input;
    } else {
        display.value += input;
    }
}

// ყველაფრის გასუფთავება (AC)
function clearDisplay() {
    display.value = "";
}

// ბოლო სიმბოლოს წაშლა (DEL)
function deleteLast() {
    display.value = display.value.slice(0, -1);
}

// მათემატიკური გამოთვლა
function calculate() {
    try {
        if (display.value === "") return;
        
        // eval აკეთებს გამოთვლას
        let result = eval(display.value);
        
        // თუ პასუხი წილადია, დაამრგვალოს 4 ნიშნამდე
        if (result % 1 !== 0) {
            result = parseFloat(result.toFixed(4));
        }
        display.value = result;
    } catch (e) {
        display.value = "Error";
        setTimeout(clearDisplay, 1500);
    }
}

// კლავიატურის მხარდაჭერა
document.addEventListener('keydown', (e) => {
    const key = e.key;

    // ციფრები და ოპერატორები
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.'].includes(key)) {
        appendToDisplay(key);
    } 
    // Enter = გამოთვლა
    else if (key === 'Enter') {
        e.preventDefault(); // რომ ფორმა არ დარეფრეშდეს
        calculate();
    } 
    // Backspace = წაშლა
    else if (key === 'Backspace') {
        deleteLast();
    } 
    // Escape = გასუფთავება
    else if (key === 'Escape') {
        clearDisplay();
    }
});