/**
 * Formats time in milliseconds to hr:min:sec
 * 
 * @param duration Time in milliseconds
 * @returns String representing the time
 */
export function formatTime(duration: number) {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    let ret = "";
    if (hrs > 0)
        ret += `${hrs}: ${mins < 10 ? "0" : ""}`;
    ret += `${mins}: ${secs < 10 ? "0" : ""}`;
    ret += String(secs);
    return ret;
}