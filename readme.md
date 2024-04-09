# Minimal SST ION Lambda Auth Test

Spinning this up as a test of whether transform is a useable way to get authentication working.

## Notes

### 2024-04-09

_CLI version:_ 0.0.279

SST config as setup will create a lambda authorizer and attach it to the V2 API Gateway. Then the route transform attaches the authorizer to the `protected` route.

All of this seems to work, but when running `sst dev` actually calling the protected route results in an unauthorized response and errors in the console.

Invoking the function in the AWS Console shows that the super simple always authorized response gets returned by the function code, but this still results in errors in the cli console.

The cli error looks like (minimal formatting for clarity)

```shell
time=2024-04-09T11:08:35.505-04:00 level=INFO msg=publishing type=*aws.FunctionLogEvent
TypeError: fetch failed
  at node:internal/deps/undici/undici:12345:11
  at async error (file:///Users/******/sst-ion/api-auth-test/.sst/platform/dist/nodejs-runtime/index.js:12:3)
  at async file:///Users/******/sst-ion/api-auth-test/.sst/platform/dist/nodejs-runtime/index.js:92:5 {
    cause: HeadersTimeoutError: Headers Timeout Error
      at Timeout.onParserTimeout [as callback] (node:internal/deps/undici/undici:8851:32)
      at Timeout.onTimeout [as _onTimeout] (node:internal/deps/undici/undici:6893:17)
      at listOnTimeout (node:internal/timers:573:17)
      at process.processTimers (node:internal/timers:514:7) {
        code: 'UND_ERR_HEADERS_TIMEOUT'
      }
  }
```
