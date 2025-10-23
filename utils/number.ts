export function formatNumber(num: number): string {
    if (num < 1000) return num.toString();

    const units = ["", "K", "M", "B", "T"];
    let unitIndex = 0;

    while (num >= 1000 && unitIndex < units.length - 1) {
        num /= 1000;
        unitIndex++;
    }

    const formatted = num % 1 === 0 ? num.toFixed(0) : num.toFixed(1);

    return `${formatted}${units[unitIndex]}`;
}
