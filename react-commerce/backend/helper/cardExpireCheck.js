const cardExpireCheck = async (card_expire,card_cvv) => {
    if (!/^\d{2}\/\d{2}$/.test(card_expire)) { // ^ ->assert means start string,/d ->shorthand of digit [0-9] ,{2}->exactly 2 digits , / ->representng slash, \d{2}->another 2 string ,$ -> end of the string
        return false; 
    }
    
    if (!/^\d{3}$/.test(card_cvv)) {
        return false;
    }

    const [incomingMonth, incomingYear] = card_expire.split('/').map(num => parseInt(num));
    // console.log(incomingMonth,incomingYear)

    if (incomingMonth < 1 || incomingMonth > 12) {
        return false; 
    }

    const today = new Date();
    const currentMonth = today.getMonth() + 1; // getMonth() is zero-based, so add 1
    const currentYear = parseInt(today.getFullYear().toString().slice(-2)); // Get last 2 digits of the year

    // Check if the card is expired
    if (incomingYear < currentYear || (incomingYear === currentYear && incomingMonth < currentMonth)) {
        return false; // Card is expired
    }

    return true; // Valid expiration date
};

module.exports = cardExpireCheck;
