const microtime = (round = true) => {
    let s, now = (Date.now ? Date.now() : new Date().getTime()) / 1000;
    if (round) return now;
    s = now | 0;
    return (Math.round((now - s) * 1000) / 1000) + ' ' + s;
};