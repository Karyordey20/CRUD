 export function validateEmail(email) {

    const emailPattern = /^\s*[\w\-\+_]+(\.[\w\-\+_]+)*\@[\w\-\+_]+\.[\w\-\+_]+(\.[\w\-\+_]+)*\s*$/;
    
    return emailPattern.test(String(email).toLocaleLowerCase());
    
    }