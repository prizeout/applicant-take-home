type CustomWindow = Window & {
    LONG_TIMEOUT?: boolean;
    ERROR_REJECT?: boolean;
    ERROR_404?: boolean;
};

const customWindow = window as CustomWindow;

export function mockFetch(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    console.log('fetch', input, init);
    const timeout = customWindow.LONG_TIMEOUT ? 5000 : 200;
    const status = customWindow.ERROR_404 ? 404 : 200;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (customWindow.ERROR_REJECT) {
                reject('checkout failed');
            } else {
                resolve(new Response(undefined, { status }));
            }
        }, timeout);
    });
}
