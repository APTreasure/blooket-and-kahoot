javascript:(function() {
    let nick = "";

    const nativeSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.send = function() {
        const oldCallback = this.onreadystatechange;

        this.onreadystatechange = function() {
            if (this.readyState === 4) {
                try {
                    const response = JSON.parse(this.responseText);

                    if (response.namerator === true)
                        response.namerator = false;

                    Object.defineProperty(this, "responseText", {
                        writable: false,
                        configurable: true,
                        value: JSON.stringify(response)
                    });
                } catch (e) {
                    console.error(e);
                }
            }

            if (oldCallback)
                return oldCallback.apply(this, arguments);
        };

        return nativeSend.apply(this, arguments);
    };

    const nativeWebSocket = window.WebSocket;
    window.WebSocket = function() {
        const ws = new nativeWebSocket(...arguments);
        const nativeSend = ws.send;

        ws.send = function() {
            const interceptedMessage = JSON.parse(arguments[0]);

            if (interceptedMessage[0] && interceptedMessage[0].data) {
                if (JSON.parse(interceptedMessage[0].data.content).usingNamerator === false)
                    interceptedMessage[0].data.content = JSON.stringify({ ...JSON.parse(interceptedMessage[0].data.content), usingNamerator: true });

                if (nick && interceptedMessage[0].data.name) {
                    interceptedMessage[0].data.name = nick;
                    nick = "";
                }
            }

            return nativeSend.apply(this, [JSON.stringify(interceptedMessage)]);
        };

        return ws;
    };

    const nativePushState = history.pushState;
    history.pushState = function() {
        const ret = nativePushState.apply(history, arguments);

        if (location.href.includes("kahoot.it/join")) {
            const observer = new MutationObserver(function() {
                if (document.getElementById("nickname")) {
                    const nickname = document.getElementById("nickname");
                    nickname.removeAttribute("maxlength");

                    document.querySelector("button").addEventListener("click", function() {
                        nick = nickname.value;
                        if (nick.length > 15)
                            nickname[Object.keys(nickname).find(v => v.includes("__reactProps"))].onChange({ target: { value: "Limit Bypassed!" } });
                    });

                    observer.disconnect();
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }

        return ret;
    };
})();
