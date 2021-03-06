/*
 * This function requires OpenSSL Lambda layer in order to function:
 * https://github.com/alexandredavi/openssl-lambda-layer
 *
 * Layer ARN: arn:aws:lambda:YOUR_REGION:034541671702:layer:openssl-lambda:1
 *
 */

const { spawn } = require('child_process');

exports.handler = async(event) => {
    let parameters = ['smime', '-help'];
    let reply = [];

    return await new Promise((resolve, reject) => {

        const process = spawn('openssl', parameters);

        process.stdout.on('data', (data) => {
            reply.push(data.toString());
        });

        process.stderr.on('data', (data) => {
            reply.push(data.toString());
        });

        process.on('close', (code) => {
            reply.push(`OpenSSL process ends with code ${code}`);

            let text = reply.join('\n');

            resolve(text);
        });

    });
}
