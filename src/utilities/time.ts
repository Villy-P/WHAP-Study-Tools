export function formatTime(duration: number) {
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;
    let ret = "";
    if (hrs > 0)
        ret += String(hrs) + ":" + (mins < 10 ? "0" : "");
    ret += String(mins) + ":" + (secs < 10 ? "0" : "");
    ret += String(secs);
    return ret;
}