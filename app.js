// const: ქმნის მუდმივ ცვლადს (კონტეინერს), რომლის მნიშვნელობა არ იცვლება.
// document: არის მთლიანი შენი HTML გვერდი.
// getElementById('display'): ეძებს ელემენტს, რომლის id არის "display".
const display = document.getElementById('display');

/**
 * appendToDisplay ფუნქცია: ამატებს ციფრებს ეკრანზე.
 * input: არის ის მნიშვნელობა (ციფრი), რომელსაც ღილაკზე დაჭერისას ვაწვდით.
 */
function appendToDisplay(input) {
    // if: ამოწმებს პირობას. 
    // display.value: არის ის ტექსტი, რაც ახლა წერია ეკრანზე.
    // ===: ამოწმებს, უდრის თუ არა ზუსტად "0"-ს ან "Error"-ს.
    // ||: ნიშნავს "ან".
    if (display.value === "0" || display.value === "Error") {
        // თუ 0 წერია, პირდაპირ ჩაწეროს ახალი ციფრი (რომ 01, 02 არ დაიწეროს).
        display.value = input;
    } else {
        // else: სხვა შემთხვევაში (თუ ეკრანი ცარიელი არაა).
        // +=: ნიშნავს მიწერას (კონკატენაციას). არსებულს მიუწეროს ახალი.
        display.value += input;
    }
}

/**
 * clearDisplay ფუნქცია: ასუფთავებს მთლიან ეკრანს.
 */
function clearDisplay() {
    // "" ნიშნავს ცარიელ სტრინგს (ტექსტს).
    display.value = "";
}

/**
 * deleteLast ფუნქცია: შლის მხოლოდ ბოლო ერთ სიმბოლოს.
 */
function deleteLast() {
    // slice(0, -1): იღებს ტექსტს 0-დან ბოლო სიმბოლომდე (ბოლოს ტოვებს).
    display.value = display.value.slice(0, -1);
}

/**
 * calculate ფუნქცია: ასრულებს მათემატიკურ გამოთვლას.
 */
function calculate() {
    // try: "სცადე" ამ კოდის შესრულება. თუ რამე შეცდომაა, პროგრამა არ გაითიშება.
    try {
        // თუ ეკრანი ცარიელია, return (შეწყვიტე ფუნქციის მუშაობა).
        if (display.value === "") return;
        
        // replace: პოულობს ერთ სიმბოლოს და ცვლის მეორით (რომ კომპიუტერმა გაიგოს).
        let expression = display.value.replace('×', '*').replace('÷', '/');
        
        // eval: იღებს ტექსტს და ითვლის როგორც მათემატიკურ ფორმულას.
        let result = eval(expression);
        
        // % 1 !== 0: ამოწმებს, არის თუ არა რიცხვი წილადი (ნაშთიანი).
        if (result % 1 !== 0) {
            // parseFloat: აქცევს ტექსტს რიცხვად.
            // toFixed(4): ამრგვალებს მეოთხე ნიშნამდე მძიმის შემდეგ.
            result = parseFloat(result.toFixed(4));
        }
        
        // საბოლოო პასუხის გამოტანა ეკრანზე.
        display.value = result;
    } 
    // catch (e): თუ try-ში შეცდომა მოხდა (მაგ: 5++), პროგრამა გადმოდის აქ.
    catch (e) {
        display.value = "Error"; // დაწეროს შეცდომა.
        // setTimeout: დაელოდოს 1500 მილიწამი (1.5 წამი) და მერე გაასუფთაოს.
        setTimeout(clearDisplay, 1500);
    }
}

/**
 * addEventListener: "დარაჯი", რომელიც უსმენს კლავიატურას.
 * 'keydown': მოქმედება, როცა კლავიშს თითს ვაჭერთ.
 * (e): event - ინფორმაცია იმის შესახებ, თუ რას დავაჭირეთ.
 */
document.addEventListener('keydown', (e) => {
    // e.key: გვეუბნება კონკრეტულად რომელი კლავიშს დავაჭირეთ.
    const key = e.key;

    // test: ამოწმებს, არის თუ არა დაჭერილი ღილაკი ციფრი (0-9).
    // includes: ამოწმებს, არის თუ არა სიმბოლო ამ სიაში.
    if (/[0-9]/.test(key) || ['+', '-', '*', '/', '.', '%', '(', ')'].includes(key)) {
        appendToDisplay(key); // თუ კი - დაწეროს ეკრანზე.
    } 
    // თუ დავაჭირეთ Enter-ს.
    else if (key === 'Enter') {
        // preventDefault: აჩერებს ბრაუზერის სტანდარტულ ქმედებას (მაგ: გვერდის განახლებას).
        e.preventDefault();
        calculate(); // გაუშვას გამოთვლა.
    } 
    // თუ დავაჭირეთ Backspace-ს.
    else if (key === 'Backspace') {
        deleteLast(); // წაშალოს ბოლო სიმბოლო.
    } 
    // თუ დავაჭირეთ Escape-ს.
    else if (key === 'Escape') {
        clearDisplay(); // გაასუფთაოს ეკრანი.
    }
});