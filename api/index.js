const { spawn } = require('child_process');

module.exports = (req, res) => {
    let parameters = ['smime', '-help'];
    let reply = [];

    try {
        const openSSLProcess = spawn('openssl', parameters);

        openSSLProcess.stdout.on('data', (data) => {
            reply.push(data.toString());
        });

        openSSLProcess.stderr.on('data', (data) => {
            reply.push(data.toString());
        });

        openSSLProcess.on('close', (code) => {
            reply.push(`OpenSSL process ends with code ${code}`);

            let text = reply.join('\n');

            res.send(`<pre>${text}</pre>`)
        });
    } catch (error) {
        console.log(error)
        res.send(error)
    }
}
