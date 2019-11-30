var ex = require('child_process').execSync;
try {
    ex('ps aux | grep').toString();
} catch (e) {
    console.error('status:', e.status);
    console.error('stderr:', e.stderr.toString());
}