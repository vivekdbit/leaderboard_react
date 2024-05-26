export function debounce(func, delay) {
    let timer;
    let accumulatedArgs = [];
    
    return function(...args) {
        accumulatedArgs.push(...args); // Collect all arguments
        if (timer) clearTimeout(timer);
        
        timer = setTimeout(() => {
        func(accumulatedArgs);
        accumulatedArgs = [];
        }, delay);
    };
}