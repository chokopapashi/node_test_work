
'use strict';

describe('test use helper HTTP server', () => {

//    function log_debug(...msg) {}
    function log_debug(...msg) {console.log(...msg);}

    const child_process = require('child_process');
    let cp = null;

    before((done) => {
        cp = child_process.fork('./test_helper/test_helper_http_server');

        const cp_on_message = function(msg) {
            log_debug('cp-on-message', msg);
            if(msg === 'start_server') {
                cp.removeListener('message', cp_on_message);
                done();
            }
        };
        cp.on('message', cp_on_message);
    });

    after((done) => {
//        this.timeout(5000);

        let timeout = null;

        const cp_on_exit = function(code, signal) {
            log_debug('cp-on-exit', code, signal);
            cp.removeListener('exit', cp_on_exit);
            clearTimeout(timeout);
//            cp.kill('SIGKILL');
            done(); 
/*
            if(msg === 'shutdown') {
                cp.removeListener('message', cp_on_message);
                clearTimeout(timeout);
                cp.kill('SIGKILL');
                done();
            }
*/
        };
        cp.on('exit', cp_on_exit);

        timeout = setTimeout(() => {
            log_debug('cp-timeout')
            cp.removeListener('exit', cp_on_exit);
            cp.kill('SIGKILL');
            done();
        }, 1000);

        cp.disconnect();
        cp.kill();
    });

	it('test request_response_http', () => {
        ;	
	});
});


/* vim: set expandtab: */
