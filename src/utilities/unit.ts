export function getSubUnitsFromUnit(unit: number) {
    switch (unit) {
        case 1:
        case 2:
            return 7;
        case 3:
            return 3;
        case 4:
        case 6:
            return 8;
        case 5:
            return 10;
        case 7:
        case 8:
        case 9:
            return 9;
        default:
            return 5;
    }
}